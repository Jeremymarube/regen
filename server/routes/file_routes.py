import os
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from jwt_handler import decode_token
from utils.file_upload import save_uploaded_file

file_bp = Blueprint('file', __name__, url_prefix='/api')

@file_bp.route('/upload', methods=['POST'])
def upload_file():
    try:
        # Verify authentication
        token = request.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = decode_token(token)
        
        if not user_id:
            return jsonify({'message': 'Invalid or missing token'}), 401
        
        # Check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({'message': 'No file part in the request'}), 400
            
        file = request.files['file']
        
        # Check if no file is selected
        if file.filename == '':
            return jsonify({'message': 'No file selected'}), 400
        
        # Configure upload folder (create if it doesn't exist)
        upload_folder = os.path.join(current_app.root_path, '..', 'uploads')
        os.makedirs(upload_folder, exist_ok=True)
        
        # Save the file
        filename, error = save_uploaded_file(file, upload_folder)
        
        if error:
            return jsonify({'message': error}), 400
        
        # Generate URL for the uploaded file
        base_url = request.host_url.rstrip('/')
        file_url = f"{base_url}uploads/{filename}"
        
        return jsonify({
            'message': 'File uploaded successfully',
            'url': file_url,
            'filename': filename
        }), 200
        
    except Exception as e:
        current_app.logger.error(f'File upload error: {str(e)}')
        return jsonify({'message': 'Failed to upload file'}), 500
