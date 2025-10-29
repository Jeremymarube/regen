from flask import Blueprint, request, jsonify
from models import RecyclingCenter, db
from utils.pagination import paginate_query
import uuid

center_bp = Blueprint('center', __name__, url_prefix='/api/recycling-centers')

@center_bp.route('/', methods=['GET'])
def get_centers():
    """
    Get Recycling Centers (Paginated)
    ---
    tags:
      - Recycling Centers
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
        description: Items per page
      - name: facility_type
        in: query
        type: string
        description: Filter by facility type
      - name: active_only
        in: query
        type: boolean
        default: true
        description: Show only active centers
    responses:
      200:
        description: Centers fetched successfully
        schema:
          type: object
          properties:
            message:
              type: string
            data:
              type: array
              items:
                type: object
            pagination:
              type: object
      500:
        description: Server error
    """
    try:
        facility_type = request.args.get('facility_type')
        waste_type = request.args.get('waste_type')
        active_only = request.args.get('active_only', 'true').lower() == 'true'
        
        query = RecyclingCenter.query
        
        if facility_type:
            query = query.filter_by(facility_type=facility_type)
        
        if active_only:
            query = query.filter_by(is_active=True)
        
        # Apply pagination
        query = query.order_by(RecyclingCenter.name)
        paginated_result = paginate_query(query, default_per_page=10)
        
        return jsonify({
            'message': 'Centers fetched successfully',
            'data': [{
                'id': center.id,
                'name': center.name,
                'location': center.location,
                'latitude': center.latitude,
                'longitude': center.longitude,
                'facility_type': center.facility_type or 'recycling',
                'contact': center.contact,
                'operating_hours': center.operating_hours or 'Mon-Fri: 8AM-5PM',
                'accepted_types': center.accepted_types.split(',') if center.accepted_types else [],
                'is_active': center.is_active if hasattr(center, 'is_active') else True
            } for center in paginated_result['items']],
            'pagination': paginated_result['pagination']
        }), 200
        
    except Exception as e:
        print(f"Get centers error: {e}")
        return jsonify({'message': 'Failed to fetch centers'}), 500

@center_bp.route('/', methods=['POST'])
def create_center():
    try:
        data = request.get_json()
        
        if not data or not data.get('name') or not data.get('location'):
            return jsonify({'message': 'Name and location are required'}), 400
        
        center = RecyclingCenter(
            id=str(uuid.uuid4()),
            name=data['name'],
            location=data['location'],
            latitude=data.get('latitude'),
            longitude=data.get('longitude'),
            facility_type=data.get('facility_type', 'recycling'),
            contact=data.get('contact'),
            operating_hours=data.get('operating_hours', 'Mon-Fri: 8AM-5PM'),
            accepted_types=','.join(data.get('accepted_types', [])),
            is_active=data.get('is_active', True)
        )
        
        db.session.add(center)
        db.session.commit()
        
        return jsonify({
            'message': 'Center created successfully',
            'data': {
                'id': center.id,
                'name': center.name,
                'location': center.location,
                'latitude': center.latitude,
                'longitude': center.longitude,
                'facility_type': center.facility_type,
                'contact': center.contact,
                'operating_hours': center.operating_hours,
                'accepted_types': center.accepted_types.split(',') if center.accepted_types else [],
                'is_active': center.is_active
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Create center error: {e}")
        return jsonify({'message': 'Failed to create center'}), 500

@center_bp.route('/<center_id>', methods=['PUT'])
def update_center(center_id):
    try:
        data = request.get_json()
        center = RecyclingCenter.query.get(center_id)
        
        if not center:
            return jsonify({'message': 'Center not found'}), 404
        
        if 'name' in data:
            center.name = data['name']
        if 'location' in data:
            center.location = data['location']
        if 'latitude' in data:
            center.latitude = data['latitude']
        if 'longitude' in data:
            center.longitude = data['longitude']
        if 'facility_type' in data:
            center.facility_type = data['facility_type']
        if 'contact' in data:
            center.contact = data['contact']
        if 'operating_hours' in data:
            center.operating_hours = data['operating_hours']
        if 'accepted_types' in data:
            center.accepted_types = ','.join(data['accepted_types'])
        if 'is_active' in data:
            center.is_active = data['is_active']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Center updated successfully',
            'data': {
                'id': center.id,
                'name': center.name,
                'location': center.location,
                'latitude': center.latitude,
                'longitude': center.longitude,
                'facility_type': center.facility_type,
                'contact': center.contact,
                'operating_hours': center.operating_hours,
                'accepted_types': center.accepted_types.split(',') if center.accepted_types else [],
                'is_active': center.is_active
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Update center error: {e}")
        return jsonify({'message': 'Failed to update center'}), 500

@center_bp.route('/<center_id>', methods=['DELETE'])
def delete_center(center_id):
    try:
        center = RecyclingCenter.query.get(center_id)
        
        if not center:
            return jsonify({'message': 'Center not found'}), 404
        
        db.session.delete(center)
        db.session.commit()
        
        return jsonify({'message': 'Center deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Delete center error: {e}")
        return jsonify({'message': 'Failed to delete center'}), 500