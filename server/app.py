from flask import Flask, jsonify
from flask_cors import CORS
from config import config
from database import init_db
from auth_routes import auth_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(config['default'])
    
    # Initialize extensions
    init_db(app)
    CORS(app, origins=["http://localhost:3000"])
    
    # Register blueprints
    app.register_blueprint(auth_bp)
    
    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'ReGen API is running'})
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)