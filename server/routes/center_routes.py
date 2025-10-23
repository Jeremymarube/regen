from flask import Blueprint, request, jsonify
from models import RecyclingCenter
from database import db
from schemas.center_schema import RecyclingCenterSchema

center_bp = Blueprint('centers', __name__, url_prefix='/api/recycling-centers')

center_schema = RecyclingCenterSchema()
centers_schema = RecyclingCenterSchema(many=True)

@center_bp.route('', methods=['GET'])
def get_centers():
    query = RecyclingCenter.query

    facility_type = request.args.get('facility_type')
    region = request.args.get('region')  # optional for future use
    waste_type = request.args.get('waste_type')
    active_only = request.args.get('active_only')

    if facility_type:
        query = query.filter(RecyclingCenter.facility_type.in_(facility_type.split(',')))
    if waste_type:
        query = query.filter(RecyclingCenter.accepted_types.contains([waste_type]))
    if active_only and active_only.lower() == 'true':
        query = query.filter_by(is_active=True)

    centers = query.all()
    return jsonify(centers_schema.dump(centers)), 200