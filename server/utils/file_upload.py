import os
import uuid
from datetime import datetime
from werkzeug.utils import secure_filename

def allowed_file(filename, allowed_extensions=None):
    """Check if the file has an allowed extension"""
    if allowed_extensions is None:
        allowed_extensions = {'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

def save_uploaded_file(file, upload_folder):
    """
    Save an uploaded file to the specified folder
    
    Args:
        file: The file object from request.files
        upload_folder: The folder where files should be saved
        
    Returns:
        tuple: (saved_filename, relative_path) or (None, error_message)
    """
    try:
        # Create uploads directory if it doesn't exist
        os.makedirs(upload_folder, exist_ok=True)
        
        if not file or file.filename == '':
            return None, 'No selected file'
            
        if not allowed_file(file.filename):
            return None, 'File type not allowed. Please upload an image (PNG, JPG, JPEG, GIF)'
            
        # Generate a unique filename
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        unique_id = str(uuid.uuid4().hex[:8])
        file_ext = os.path.splitext(file.filename)[1]
        filename = f"{timestamp}_{unique_id}{file_ext}"
        
        # Secure the filename and save
        secure_name = secure_filename(filename)
        filepath = os.path.join(upload_folder, secure_name)
        
        # Save the file
        file.save(filepath)
        
        # Return the relative path that can be used in URLs
        return secure_name, None
        
    except Exception as e:
        print(f"Error saving file: {e}")
        return None, str(e)
