from database import db
import uuid  # Add this import

class RecyclingCenter(db.Model):
    __tablename__ = 'recycling_centers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)
    facility_type = db.Column(db.String(50), nullable=False, default='recycling')
    contact = db.Column(db.String(120), nullable=True)
    operating_hours = db.Column(db.String(120), nullable=True)
    accepted_types = db.Column(db.JSON, nullable=True, default=list)  # This is correct!
    is_active = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'facility_type': self.facility_type,
            'contact': self.contact,
            'operating_hours': self.operating_hours,
            'accepted_types': self.accepted_types or [],
            'is_active': self.is_active
        }

    def __repr__(self):
        return f"<RecyclingCenter {self.name}>"