#from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

# def init_db(app):
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///regen.db'
#     app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#     db.init_app(app)
    
#     with app.app_context():
#         db.create_all()
from extensions import db  # Import from extensions

def init_db(app):
    # No need for db.init_app(app) here since it's done in app.py
    with app.app_context():
        db.create_all()