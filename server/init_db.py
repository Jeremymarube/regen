#!/usr/bin/env python
"""Initialize the database with tables"""
from app import create_app
from database import db

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        # Create all tables
        db.create_all()
        print("Database tables created successfully!")
