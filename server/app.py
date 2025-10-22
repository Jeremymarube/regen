from flask import Flask, jsonify
from flask_cors import CORS
from config import config
from database import init_db

# Import blueprints
from routes.auth_routes import auth_bp
from routes.dashboard_routes import dashboard_bp
from routes.community_routes import community_bp
from routes.waste_routes import waste_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(config['default'])
    
    # Initialize extensions
    init_db(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    
    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(community_bp)
    app.register_blueprint(waste_bp)
    
    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'ReGen API is running'})
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)