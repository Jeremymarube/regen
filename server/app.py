# # from flask import Flask, jsonify
# # from flask_cors import CORS
# # from config import config
# # from database import init_db

# # # Import blueprints
# # from routes.auth_routes import auth_bp
# # from routes.dashboard_routes import dashboard_bp
# # from routes.community_routes import community_bp
# # from routes.waste_routes import waste_bp
# # from routes.ai_routes import ai_bp  # ✅ fixed import path (should come from routes folder)

# # from flask_sqlalchemy import SQLAlchemy
# # from flask_migrate import Migrate
# # from flask_bcrypt import Bcrypt
# # from flask_jwt_extended import JWTManager

# # # Initialize extensions
# # db = SQLAlchemy()
# # migrate = Migrate()
# # bcrypt = Bcrypt()


# # def create_app():
# #     app = Flask(__name__)
# #     app.config.from_object(config['default'])

# #     # JWT configuration
# #     app.config["JWT_SECRET_KEY"] = "supersecretkey"
# #     app.config["JWT_TOKEN_LOCATION"] = ["headers"]  # can also be ["cookies"] or ["query_string"]
# #     jwt = JWTManager(app)

# #     # Initialize extensions
# #     init_db(app)
# #     db.init_app(app)
# #     migrate.init_app(app, db)
# #     bcrypt.init_app(app)

# #     # Enable CORS
# #     CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# #     # Register blueprints (✅ cleaned duplicates)
# #     app.register_blueprint(auth_bp)
# #     app.register_blueprint(dashboard_bp)
# #     app.register_blueprint(community_bp)
# #     app.register_blueprint(waste_bp)
# #     app.register_blueprint(ai_bp)

# #     # Health check route
# #     @app.route('/api/health')
# #     def health_check():
# #         return jsonify({'status': 'healthy', 'message': 'ReGen API is running'})

# #     # Root route
# #     @app.route("/")
# #     def home():
# #         return {"message": "ReGen Backend is Running with AI!"}

# #     return app


# # if __name__ == '__main__':
# #     app = create_app()
# #     app.run(debug=True, port=5000)

# from flask import Flask, jsonify
# from flask_cors import CORS
# from config import config
# from database import init_db

# # Import blueprints
# from routes.auth_routes import auth_bp
# from routes.dashboard_routes import dashboard_bp
# from routes.community_routes import community_bp
# from routes.waste_routes import waste_bp
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_bcrypt import Bcrypt
# from routes.ai_routes import ai_bp
# from flask_jwt_extended import JWTManager

# # Initialize extensions
# db = SQLAlchemy()
# migrate = Migrate()
# bcrypt = Bcrypt()

# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(config['default'])

#     # JWT configuration
#     app.config["JWT_SECRET_KEY"] = "supersecretkey"
#     app.config["JWT_TOKEN_LOCATION"] = ["headers"]
#     jwt = JWTManager(app)

#     # Initialize extensions
#     init_db(app)  # ✅ This already sets up db
#     CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    
#     # Register blueprints
#     app.register_blueprint(auth_bp)
#     app.register_blueprint(dashboard_bp)
#     app.register_blueprint(community_bp)
#     app.register_blueprint(waste_bp)
#     app.register_blueprint(ai_bp)

#     migrate.init_app(app, db)
#     bcrypt.init_app(app)

#     # Health check
#     @app.route('/api/health')
#     def health_check():
#         return jsonify({'status': 'healthy', 'message': 'ReGen API is running'})

#     # Root route
#     @app.route("/")
#     def home():
#         return {"message": "ReGen Backend is Running with AI!"}

#     return app  

# if __name__ == '__main__':
#     app = create_app()
#     app.run(debug=True, port=5000)

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
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
    
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