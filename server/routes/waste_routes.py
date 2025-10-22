from flask import Blueprint, request, jsonify
from models import WasteLog, db
from jwt_handler import decode_token

waste_bp = Blueprint('waste', __name__, url_prefix='/api/waste-logs')

@waste_bp.route('/', methods=['GET'])
def get_waste_logs():
    try:
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = decode_token(token)
        
        if not user_id:
            return jsonify({'message': 'Invalid token'}), 401
        
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
    try:
        waste_logs = WasteLog.query.all()
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
            } for log in waste_logs]
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

@waste_bp.route('/<log_id>', methods=['DELETE'])
def delete_waste_log(log_id):
    try:
        waste_log = WasteLog.query.get(log_id)
        
        if not waste_log:
            return jsonify({'message': 'Waste log not found'}), 404
        
        db.session.delete(waste_log)
        db.session.commit()
        
        return jsonify({'message': 'Waste log deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"Delete waste log error: {e}")
        return jsonify({'message': 'Failed to delete waste log'}), 500