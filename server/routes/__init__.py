# routes/__init__.py

# This file makes the 'routes' folder a Python package
# and helps in organizing and importing blueprints easily.

from .auth_routes import auth_bp
from .dashboard_routes import dashboard_bp

__all__ = ['auth_bp', 'dashboard_bp']
