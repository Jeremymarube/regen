from flask import Flask, jsonify
from flask_cors import CORS
from config import config
from database import init_db

# Import blueprints
from routes.auth_routes import auth_bp
from routes.dashboard_routes import dashboard_bp
from routes.community_routes import community_bp
from routes.waste_routes import waste_bp
from extensions import db, bcrypt, migrate, jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(config['default'])

    # JWT configuration
    app.config["JWT_SECRET_KEY"] = "supersecretkey"
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]

    # Initialize ALL extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    
    # CORS configuration
    CORS(app, origins=["http://localhost:3000"])

    # Import models HERE - after db.init_app(app)
    from models import User, WasteLog, Reward, Community, Message

    # Initialize database
    init_db(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
    
    # Register blueprints

    # Import and register blueprints
    from routes.auth_routes import auth_bp
    from routes.ai_routes import ai_bp
    from routes.dashboard_routes import dashboard_bp
    from routes.community_routes import community_bp
    from routes.waste_routes import waste_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(community_bp)
    app.register_blueprint(waste_bp)
    

    # Health check
    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'ReGen API is running'})

    # Root route
    @app.route("/")
    def home():
        return {"message": "ReGen Backend is Running with AI!"}
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)