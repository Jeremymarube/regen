# routes/dashboard_routes.py

from flask import Blueprint, jsonify
from services.dashboard_service import get_dashboard_stats

# Create the Blueprint for the dashboard
dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@dashboard_bp.route('/', methods=['GET'])
def get_dashboard_data():
    """
    GET /api/dashboard
    Returns overall statistics for the dashboard.
    """
    try:
        stats = get_dashboard_stats()
        return jsonify({
            'message': 'Dashboard data fetched successfully',
            'data': stats
        }), 200
    except Exception as e:
        print(f"Dashboard Error: {e}")
        return jsonify({'message': 'Failed to fetch dashboard data'}), 500
