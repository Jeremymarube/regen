from flask import Blueprint, request, jsonify
from models import RecyclingCenter
from database import db
from schemas.center_schema import RecyclingCenterSchema

center_bp = Blueprint('centers', __name__, url_prefix='/api/recycling-centers')

center_schema = RecyclingCenterSchema()
centers_schema = RecyclingCenterSchema(many=True)