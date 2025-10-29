import pytest
from models import User

class TestAuthRoutes:
    """Test authentication endpoints"""
    
    def test_register_success(self, client, db):
        """Test successful user registration"""
        response = client.post('/api/auth/register', json={
            'name': 'New User',
            'email': 'newuser@example.com',
            'password': 'securepass123',
            'location': 'Nairobi'
        })
        
        assert response.status_code == 201
        data = response.get_json()
        assert data['message'] == 'User created successfully'
        assert 'access_token' in data
        assert data['user']['email'] == 'newuser@example.com'
        assert data['user']['name'] == 'New User'
    
    def test_register_missing_email(self, client):
        """Test registration with missing email"""
        response = client.post('/api/auth/register', json={
            'name': 'Test User',
            'password': 'password123'
        })
        
        assert response.status_code == 400
        data = response.get_json()
        assert 'Email and password required' in data['message']
    
    def test_register_duplicate_email(self, client, sample_user):
        """Test registration with existing email"""
        response = client.post('/api/auth/register', json={
            'name': 'Another User',
            'email': 'test@example.com',
            'password': 'password123'
        })
        
        assert response.status_code == 400
        data = response.get_json()
        assert 'User already exists' in data['message']
    
    def test_login_success(self, client, sample_user):
        """Test successful login"""
        response = client.post('/api/auth/login', json={
            'email': 'test@example.com',
            'password': 'password123'
        })
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['message'] == 'Login successful'
        assert 'access_token' in data
        assert data['user']['email'] == 'test@example.com'
    
    def test_login_invalid_email(self, client):
        """Test login with non-existent email"""
        response = client.post('/api/auth/login', json={
            'email': 'nonexistent@example.com',
            'password': 'password123'
        })
        
        assert response.status_code == 401
        data = response.get_json()
        assert 'Invalid credentials' in data['message']
    
    def test_login_wrong_password(self, client, sample_user):
        """Test login with incorrect password"""
        response = client.post('/api/auth/login', json={
            'email': 'test@example.com',
            'password': 'wrongpassword'
        })
        
        assert response.status_code == 401
        data = response.get_json()
        assert 'Invalid credentials' in data['message']
    
    def test_login_missing_fields(self, client):
        """Test login with missing fields"""
        response = client.post('/api/auth/login', json={
            'email': 'test@example.com'
        })
        
        assert response.status_code == 400
        data = response.get_json()
        assert 'Email and password required' in data['message']
    
    def test_get_current_user(self, client, sample_user, auth_headers):
        """Test getting current user profile"""
        response = client.get('/api/auth/me', headers=auth_headers)
        
        assert response.status_code == 200
        data = response.get_json()
        assert data['user']['email'] == 'test@example.com'
        assert data['user']['name'] == 'Test User'
    
    def test_get_current_user_no_token(self, client):
        """Test getting current user without token"""
        response = client.get('/api/auth/me')
        
        assert response.status_code == 401
