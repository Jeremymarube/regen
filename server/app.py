# from flask import Flask, jsonify
# from flask_cors import CORS
# from config import config
# from database import init_db
# from auth_routes import auth_bp

# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(config['default'])
    
#     # Initialize extensions
#     init_db(app)
#     CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    
#     # Register blueprints
#     app.register_blueprint(auth_bp)
    
#     @app.route('/api/health')
#     def health_check():
#         return jsonify({'status': 'healthy', 'message': 'ReGen API is running'})
    
#     return app

# if __name__ == '__main__':
#     app = create_app()
#     app.run(debug=True, port=5000)

from flask import Flask, jsonify
from flask_cors import CORS
from config import config
from database import init_db

# ✅ Import existing blueprints
from routes.auth_routes import auth_bp


# ✅ Import your new dashboard and waste route
from routes.dashboard_routes import dashboard_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(config['default'])
    
    # Initialize extensions
    init_db(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    
    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp, url_prefix='/api/dashboard') # ✅ New
    
    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'ReGen API is running'})
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
