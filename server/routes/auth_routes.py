from flask import Blueprint, request, jsonify, current_app
from models import User, db
from jwt_handler import generate_token, decode_token
import uuid
# define a blueprint for authentication routes it groups routes under the '/api/auth' URL prefix
auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')
# routes for user registration accessible via POST request to /api/auth/register
@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json() # get JSON data email,password,name,location from the request body
        
        if not data or not data.get('email') or not data.get('password'): # validation of the essential fields eg email and password
            return jsonify({'message': 'Email and password required'}), 400
        
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'User already exists'}), 400
        
        user = User(     # created a new user object with a unique UUID, setting email and optional fields
            id=str(uuid.uuid4()),
            name=data.get('name', ''),
            email=data['email'],
            location=data.get('location')
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        
        token = generate_token(user.id) # generate a JSON Web Token (JWT) for the newly registered user for immediate authentication
        
        return jsonify({
            'message': 'User created successfully', #return a success response with a welcome message the access token and user details
            'access_token': token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Registration failed'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email and password required'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({'message': 'Invalid credentials'}), 401
        
        token = generate_token(user.id)
        
        return jsonify({
            'message': 'Login successful',
            'access_token': token,
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Login failed'}), 500

@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('new_password'):
            return jsonify({'message': 'Email and new password required'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        # Update the password
        user.set_password(data['new_password'])
        db.session.commit()
        
        return jsonify({
            'message': 'Password reset successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Password reset failed'}), 500

@auth_bp.route('/profile', methods=['PUT'])
def update_profile():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = decode_token(token)
        
        if not user_id:
            return jsonify({'message': 'Invalid token'}), 401
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        data = request.get_json()
        
        # Update allowed fields
        if 'name' in data:
            user.name = data['name']
        if 'location' in data:
            user.location = data['location']
        if 'total_co2_saved' in data:
            user.total_co2_saved = data['total_co2_saved']
        if 'total_waste_recycled' in data:
            user.total_waste_recycled = data['total_waste_recycled']
        if 'points' in data:
            user.points = data['points']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': user.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Update profile error: {e}")
        return jsonify({'message': 'Failed to update profile'}), 500

@auth_bp.route('/me', methods=['GET'])
def get_current_user():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        
        if not token:
            return jsonify({'message': 'Token required'}), 401
        
        user_id = decode_token(token)
        if not user_id:
            return jsonify({'message': 'Invalid token'}), 401
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        return jsonify({
            'user': user.to_dict(),
            'profile': user.to_dict()
        }), 200
        
    except Exception as e:
        return jsonify({'message': 'Authentication failed'}), 500