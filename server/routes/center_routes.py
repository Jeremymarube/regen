from flask import Blueprint, request, jsonify
from models import RecyclingCenter, db

center_bp = Blueprint('center', __name__, url_prefix='/api/recycling-centers')

@center_bp.route('/', methods=['GET', 'OPTIONS'])
def get_centers():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        facility_type = request.args.get('facility_type')
        waste_type = request.args.get('waste_type')
        active_only = request.args.get('active_only', 'false').lower() == 'true'
        
        query = RecyclingCenter.query
        
        if facility_type:
            query = query.filter_by(facility_type=facility_type)
        
        if active_only:
            query = query.filter_by(is_active=True)
        
        centers = query.all()
        
        return jsonify([center.to_dict() for center in centers]), 200
        
    except Exception as e:
        print(f"Get centers error: {e}")
        return jsonify({'message': 'Failed to fetch centers'}), 500

@center_bp.route('/', methods=['POST', 'OPTIONS'])
def create_center():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.get_json()
        
        if not data or not data.get('name') or not data.get('location'):
            return jsonify({'message': 'Name and location are required'}), 400
        
        # Create center - ID will be auto-generated as Integer
        center = RecyclingCenter(
            name=data['name'],
            location=data['location'],
            latitude=float(data.get('latitude', 0)) if data.get('latitude') else None,
            longitude=float(data.get('longitude', 0)) if data.get('longitude') else None,
            facility_type=data.get('facility_type', 'recycling'),
            contact=data.get('contact'),
            operating_hours=data.get('operating_hours', 'Mon-Fri: 8AM-5PM'),
            accepted_types=data.get('accepted_types', []),  # Store as JSON array
            is_active=data.get('is_active', True)
        )
        
        db.session.add(center)
        db.session.commit()
        
        return jsonify(center.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"Create center error: {e}")
        return jsonify({'message': 'Failed to create center'}), 500

@center_bp.route('/<int:center_id>', methods=['GET', 'PUT', 'DELETE', 'OPTIONS'])
def center_detail(center_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    center = RecyclingCenter.query.get_or_404(center_id)
    
    if request.method == 'GET':
        return jsonify(center.to_dict())
    
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            
            center.name = data.get('name', center.name)
            center.location = data.get('location', center.location)
            center.latitude = float(data.get('latitude', center.latitude or 0)) if data.get('latitude') else center.latitude
            center.longitude = float(data.get('longitude', center.longitude or 0)) if data.get('longitude') else center.longitude
            center.facility_type = data.get('facility_type', center.facility_type)
            center.contact = data.get('contact', center.contact)
            center.operating_hours = data.get('operating_hours', center.operating_hours)
            center.accepted_types = data.get('accepted_types', center.accepted_types)
            center.is_active = bool(data.get('is_active', center.is_active))
            
            db.session.commit()
            return jsonify(center.to_dict())
            
        except Exception as e:
            db.session.rollback()
            print(f"Update center error: {e}")
            return jsonify({'message': 'Failed to update center'}), 500
    
    elif request.method == 'DELETE':
        try:
            db.session.delete(center)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            print(f"Delete center error: {e}")
            return jsonify({'message': 'Failed to delete center'}), 500