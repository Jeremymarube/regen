import logging
from flask import Flask, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from config import config
from database import init_db

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Import blueprints
from routes.auth_routes import auth_bp
from routes.dashboard_routes import dashboard_bp
from routes.community_routes import community_bp
from routes.waste_routes import waste_bp
from routes.center_routes import center_bp
from routes.ai_routes import ai_bp
from routes.file_routes import file_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(config['default'])
    
    # Initialize extensions
    init_db(app)
    bcrypt = Bcrypt(app)
    
    # CORS configuration
    CORS(app, resources={
        r"/api/*": {
            "origins": "http://localhost:3000",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        },
        r"/uploads/*": {
            "origins": "http://localhost:3000",
            "methods": ["GET"],
            "supports_credentials": True
        }
    })
    
    # Import models after db initialization
    from models import User, WasteLog, Reward, Community, Message, RecyclingCenter
    
    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(community_bp)
    app.register_blueprint(waste_bp)
    app.register_blueprint(center_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(file_bp)
    
    @app.route('/')
    def index():
        return jsonify({
            'message': 'Welcome to ReGen API',
            'status': 'running',
            'version': '1.0.0',
            'endpoints': {
                'health': '/api/health',
                'auth': '/api/auth/*',
                'dashboard': '/api/dashboard',
                'community': '/api/community/*',
                'waste_logs': '/api/waste-logs/*',
                'recycling_centers': '/api/recycling-centers/*',
                'ai_guide': '/api/ai-guide'
            }
        })
    
    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'ReGen API is running'})
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
