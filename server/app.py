from flask import Flask, jsonify
from flask_cors import CORS
from config import config
from database import init_db
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from auth_routes import auth_bp
from ai_routes import ai_bp
from flask_jwt_extended import JWTManager

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

# Import blueprints
from routes.auth_routes import auth_bp
from routes.dashboard_routes import dashboard_bp
from routes.community_routes import community_bp
from routes.waste_routes import waste_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(config['default'])

    # JWT configuration
    app.config["JWT_SECRET_KEY"] = "supersecretkey"
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]  # can be ["cookies"] or ["query_string"] too
    jwt = JWTManager(app)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    CORS(app, origins=["http://localhost:3000"])

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(ai_bp)

    # Health check
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

    # Root route
    @app.route("/")
    def home():
        return {"message": "ReGen Backend is Running with AI!"}

    return app  

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)