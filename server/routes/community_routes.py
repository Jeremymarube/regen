from flask import Blueprint, jsonify
from models import User

community_bp = Blueprint('community', __name__, url_prefix='/api/community')

@community_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """
    GET /api/community/leaderboard
    Returns ranked users for community leaderboard
    """
    try:
        # Get all users with their leaderboard stats
        users = User.query.all()
        leaderboard_data = []
        
        for user in users:
            stats = user.get_leaderboard_stats()
            # Only include users with actual contributions
            if stats['points'] > 0 or stats['total_co2_saved'] > 0:
                leaderboard_data.append(stats)
        
        # Sort by points (descending)
        leaderboard_data.sort(key=lambda x: x['points'], reverse=True)
        
        # Add ranks
        ranked_data = []
        for index, entry in enumerate(leaderboard_data):
            entry['rank'] = index + 1
            ranked_data.append(entry)
        
        return jsonify({
            'message': 'Leaderboard data fetched successfully',
            'leaderboard': ranked_data
        }), 200
        
    except Exception as e:
        print(f"Leaderboard Error: {e}")
        return jsonify({'message': 'Failed to fetch leaderboard data'}), 500