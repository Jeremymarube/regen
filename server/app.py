from flask import Flask
from flask_migrate import Migrate
from database import db
from routes.center_routes import center_bp
from models import RecyclingCenter

app = Flask(__name__)
app.config.from_object('config.Config')

db.init_app(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Register blueprints
app.register_blueprint(center_bp)

@app.route('/')
def home():
    return {'message': 'ReGen Backend is running'}

if __name__ == '__main__':
    app.run(debug=True)