from flask import Blueprint, request, jsonify
from models import RecyclingCenter
from database import db
from schemas.center_schema import RecyclingCenterSchema
