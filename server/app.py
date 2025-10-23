from flask import Flask
from database import init_db, db
from routes import center_bp

app = Flask(__name__)
app.config.from_object('config.Config')

db.init_app(app)

# register blueprints
app.register_blueprint(center_bp)