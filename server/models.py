from database import db
from flask_bcrypt import Bcrypt
from datetime import datetime
import uuid

bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    waste_logs = db.relationship('WasteLog', backref='user', lazy=True)
    rewards = db.relationship('Reward', backref='user', lazy=True)
    
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'location': self.location,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class WasteLog(db.Model):
    __tablename__ = 'waste_logs'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    waste_type = db.Column(db.String(50), nullable=False)  # plastic, paper, organic, etc.
    weight = db.Column(db.Float, nullable=False)  # in kg
    image_url = db.Column(db.String(255))
    date = db.Column(db.DateTime, default=datetime.utcnow)
    co2_saved = db.Column(db.Float)  # in kg
    disposal_method = db.Column(db.String(100))
    collection_location = db.Column(db.String(100))
    collection_status = db.Column(db.String(20), default='pending')  # pending, scheduled, collected
    collection_date = db.Column(db.DateTime)

class RecyclingCenter(db.Model):
    __tablename__ = 'recycling_centers'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    accepted_types = db.Column(db.String(255))  # comma-separated waste types
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)

class Reward(db.Model):
    __tablename__ = 'rewards'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    badge_name = db.Column(db.String(50), nullable=False)
    points = db.Column(db.Integer, default=0)
    awarded_at = db.Column(db.DateTime, default=datetime.utcnow)

class Community(db.Model):
    __tablename__ = 'communities'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    impact_score = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Association table for many-to-many users-communities
user_community = db.Table('user_community',
    db.Column('user_id', db.String(36), db.ForeignKey('users.id'), primary_key=True),
    db.Column('community_id', db.String(36), db.ForeignKey('communities.id'), primary_key=True),
    db.Column('joined_at', db.DateTime, default=datetime.utcnow)
)