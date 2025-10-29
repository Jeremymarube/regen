import pytest
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from database import db as _db
from models import User, WasteLog, RecyclingCenter

@pytest.fixture(scope='session')
def app():
    """Create application for testing"""
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SECRET_KEY'] = 'test-secret-key'
    
    with app.app_context():
        _db.create_all()
        yield app
        _db.drop_all()

@pytest.fixture(scope='function')
def client(app):
    """Create test client"""
    return app.test_client()

@pytest.fixture(scope='function')
def db(app):
    """Create clean database for each test"""
    with app.app_context():
        yield _db
        _db.session.rollback()
        _db.session.remove()
        # Clean up all tables after each test
        for table in reversed(_db.metadata.sorted_tables):
            _db.session.execute(table.delete())
        _db.session.commit()

@pytest.fixture
def sample_user(db):
    """Create a sample user for testing"""
    user = User(
        id='test-user-123',
        name='Test User',
        email='test@example.com',
        location='Test Location'
    )
    user.set_password('password123')
    db.session.add(user)
    db.session.commit()
    return user

@pytest.fixture
def auth_token(client, sample_user):
    """Get authentication token for sample user"""
    response = client.post('/api/auth/login', json={
        'email': 'test@example.com',
        'password': 'password123'
    })
    data = response.get_json()
    return data.get('access_token')

@pytest.fixture
def auth_headers(auth_token):
    """Get authorization headers"""
    return {'Authorization': f'Bearer {auth_token}'}
