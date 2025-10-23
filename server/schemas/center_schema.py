from marshmallow import Schema, fields

class RecyclingCenterSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    location = fields.Str(required=True)
    latitude = fields.Float(allow_none=True)
    longitude = fields.Float(allow_none=True)
    facility_type = fields.Str(required=True)