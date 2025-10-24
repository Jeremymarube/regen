from flask import Blueprint, jsonify, request
from models import User
from jwt_handler import decode_token

# Create the Blueprint for the dashboard
dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('/', methods=['GET'])
def get_dashboard_data():
    """
    GET /api/dashboard
    Returns user-specific statistics for the dashboard.
    """
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = decode_token(token)
        
        if not user_id:
            return jsonify({'message': 'Invalid token'}), 401
        
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        stats = user.get_dashboard_stats()
        return jsonify({
            'message': 'Dashboard data fetched successfully',
            'data': stats
        }), 200
        
    except Exception as e:
        print(f"Dashboard Error: {e}")
        return jsonify({'message': 'Failed to fetch dashboard data'}), 500