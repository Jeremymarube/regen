from flask import Blueprint, jsonify, request
from models import User

community_bp = Blueprint('community', __name__, url_prefix='/api/community')

@community_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    """
    Get Community Leaderboard (Paginated)
    ---
    tags:
      - Community
    parameters:
      - name: page
        in: query
        type: integer
        default: 1
        description: Page number
      - name: per_page
        in: query
        type: integer
        default: 10
        description: Items per page (max 100)
    responses:
      200:
        description: Leaderboard fetched successfully
        schema:
          type: object
          properties:
            message:
              type: string
            leaderboard:
              type: array
              items:
                type: object
                properties:
                  rank:
                    type: integer
                  id:
                    type: string
                  name:
                    type: string
                  location:
                    type: string
                  points:
                    type: integer
                  total_co2_saved:
                    type: number
                  total_waste_recycled:
                    type: number
            pagination:
              type: object
              properties:
                page:
                  type: integer
                per_page:
                  type: integer
                total_items:
                  type: integer
                total_pages:
                  type: integer
                has_next:
                  type: boolean
                has_prev:
                  type: boolean
      500:
        description: Server error
    """
    try:
        # Get pagination parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Validate parameters
        if page < 1:
            page = 1
        if per_page < 1 or per_page > 100:
            per_page = 10
        
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
        
        # Calculate pagination
        total_items = len(leaderboard_data)
        total_pages = (total_items + per_page - 1) // per_page
        start_idx = (page - 1) * per_page
        end_idx = start_idx + per_page
        
        # Get paginated slice
        paginated_data = leaderboard_data[start_idx:end_idx]
        
        # Add ranks (based on overall position, not paginated position)
        ranked_data = []
        for index, entry in enumerate(paginated_data, start=start_idx):
            entry['rank'] = index + 1
            ranked_data.append(entry)
        
        return jsonify({
            'message': 'Leaderboard data fetched successfully',
            'leaderboard': ranked_data,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total_items': total_items,
                'total_pages': total_pages,
                'has_next': page < total_pages,
                'has_prev': page > 1,
                'next_page': page + 1 if page < total_pages else None,
                'prev_page': page - 1 if page > 1 else None
            }
        }), 200
        
    except Exception as e:
        print(f"Leaderboard Error: {e}")
        return jsonify({'message': 'Failed to fetch leaderboard data'}), 500