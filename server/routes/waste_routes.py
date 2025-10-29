from flask import Blueprint, request, jsonify
from models import WasteLog, db
from jwt_handler import decode_token
from utils.pagination import paginate_query
import uuid
from datetime import datetime

waste_bp = Blueprint('waste', __name__, url_prefix='/api/waste-logs') # define a blueprint for wastelog routes it groups routes under the api/waste-logs URL prefix

@waste_bp.route('/', methods=['POST']) # routes to create a new waste log entry 
def create_waste_log():
    """
    Create Waste Log
    ---
    tags:
      - Waste Management
    security:
      - Bearer: []
    parameters:
      - name: Authorization
        in: header
        type: string
        required: true
        description: Bearer token
      - name: body
        in: body
        required: true
        schema:
          type: object
          required:
            - waste_type
            - weight
          properties:
            waste_type:
              type: string
              example: plastic
            weight:
              type: number
              example: 5.5
            co2_saved:
              type: number
              example: 2.75
            disposal_method:
              type: string
              example: recycling
            collection_location:
              type: string
              example: Nairobi
            collection_status:
              type: string
              example: pending
            image_url:
              type: string
              example: https://example.com/image.jpg
    responses:
      201:
        description: Waste log created successfully
      400:
        description: Missing required fields
      401:
        description: Unauthorized
      500:
        description: Server error
    """
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = decode_token(token)
        
        if not user_id:
            return jsonify({'message': 'Invalid token'}), 401
        
        data = request.get_json()
        
        if not data or not data.get('waste_type') or not data.get('weight'):
            return jsonify({'message': 'Waste type and weight are required'}), 400
        
        # Convert collection_date string to datetime object if provided
        collection_date = None
        if data.get('collection_date'):
            try:
                collection_date = datetime.fromisoformat(data['collection_date'].replace('Z', '+00:00'))
            except ValueError:
                return jsonify({'message': 'Invalid collection date format'}), 400
        
        waste_log = WasteLog(      # create a new waste log object, assigning a unique ID and the authenticated user,s ID 
            id=str(uuid.uuid4()),
            user_id=user_id,
            waste_type=data['waste_type'],
            weight=float(data['weight']),
            co2_saved=data.get('co2_saved'),
            disposal_method=data.get('disposal_method'),
            collection_location=data.get('collection_location'),
            collection_status=data.get('collection_status', 'pending'),
            collection_date=collection_date,
            image_url=data.get('image_url')
        )
        
        db.session.add(waste_log)
        db.session.commit()
        
        return jsonify({     # return a success reponse with the details of the newly created waste log
            'message': 'Waste log created successfully',
            'data': {
                'id': waste_log.id,
                'waste_type': waste_log.waste_type,
                'weight': waste_log.weight,
                'co2_saved': waste_log.co2_saved,
                'date': waste_log.date.isoformat() if waste_log.date else None,
                'collection_location': waste_log.collection_location,
                'collection_status': waste_log.collection_status,
                'collection_date': waste_log.collection_date.isoformat() if waste_log.collection_date else None,
                'disposal_method': waste_log.disposal_method,
                'image_url': waste_log.image_url
            }
        }), 201
        
    except Exception as e:  # if any error occurs, rollback the database transaction
        db.session.rollback()
        print(f"Create waste log error: {e}")
        return jsonify({'message': 'Failed to create waste log'}), 500 # print the error for debugging 

@waste_bp.route('/', methods=['GET'])  # routes to get all waste logs for the authenticated user.requires authentiaction accessible vai GET request to /api/waste-logs/
def get_waste_logs():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = decode_token(token)
        
        if not user_id:
            return jsonify({'message': 'Invalid token'}), 401  # check for valid token/user ID
        
        waste_logs = WasteLog.query.filter_by(user_id=user_id).all()
        return jsonify({
            'message': 'Waste logs fetched successfully',
            'data': [{
                'id': log.id,
                'waste_type': log.waste_type,
                'weight': log.weight,
                'co2_saved': log.co2_saved,
                'date': log.date.isoformat() if log.date else None,
                'collection_location': log.collection_location,
                'collection_status': log.collection_status,
                'collection_date': log.collection_date.isoformat() if log.collection_date else None,
                'disposal_method': log.disposal_method,
                'image_url': log.image_url
            } for log in waste_logs]
        }), 200
        
    except Exception as e:
        print(f"Get waste logs error: {e}")
        return jsonify({'message': 'Failed to fetch waste logs'}), 500

@waste_bp.route('/all', methods=['GET'])
def get_all_waste_logs():
    """
    Get All Waste Logs (Paginated)
    ---
    tags:
      - Waste Management
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
    responses:
      200:
        description: Waste logs fetched successfully
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
        # Apply pagination to query
        query = WasteLog.query.order_by(WasteLog.date.desc())
        paginated_result = paginate_query(query, default_per_page=10)
        
        return jsonify({
            'message': 'All waste logs fetched successfully',
            'data': [{
                'id': log.id,
                'waste_type': log.waste_type,
                'weight': log.weight,
                'co2_saved': log.co2_saved,
                'date': log.date.isoformat() if log.date else None,
                'collection_location': log.collection_location,
                'collection_status': log.collection_status,
                'collection_date': log.collection_date.isoformat() if log.collection_date else None,
                'disposal_method': log.disposal_method,
                'image_url': log.image_url
            } for log in paginated_result['items']],
            'pagination': paginated_result['pagination']
        }), 200
        
    except Exception as e:
        print(f"Get all waste logs error: {e}")
        return jsonify({'message': 'Failed to fetch waste logs'}), 500

@waste_bp.route('/<log_id>/status', methods=['PUT'])
def update_waste_log_status(log_id):
    try:
        data = request.get_json()
        waste_log = WasteLog.query.get(log_id)
        
        if not waste_log:
            return jsonify({'message': 'Waste log not found'}), 404
        
        waste_log.collection_status = data.get('collection_status', waste_log.collection_status)
        db.session.commit()
        
        return jsonify({
            'message': 'Waste log status updated successfully',
            'data': {
                'id': waste_log.id,
                'collection_status': waste_log.collection_status
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Update status error: {e}")
        return jsonify({'message': 'Failed to update waste log status'}), 500

@waste_bp.route('/<log_id>', methods=['DELETE']) # route to delete a specific waste log entry accessible via delete REQUEST to api/waste/<log_id>
def delete_waste_log(log_id):
    try:
        waste_log = WasteLog.query.get(log_id)
        
        if not waste_log:
            return jsonify({'message': 'Waste log not found'}), 404
        
        db.session.delete(waste_log)
        db.session.commit()
        
        return jsonify({'message': 'Waste log deleted successfully'}), 200 # return a success response 
        
    except Exception as e:  # if an error occurs, rollback the transaction 
        db.session.rollback()
        print(f"Delete waste log error: {e}")
        return jsonify({'message': 'Failed to delete waste log'}), 500 # return a generic server error response 
