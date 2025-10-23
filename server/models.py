from database import db

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
    accepted_types = db.Column(db.JSON, nullable=True, default=list)
    is_active = db.Column(db.Boolean, default=True)





    def __repr__(self):
        return f"<RecyclingCenter {self.name}>"