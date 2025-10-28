from marshmallow import Schema, fields

class RecyclingCenterSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    location = fields.Str(required=True)
    latitude = fields.Float(allow_none=True)
    longitude = fields.Float(allow_none=True)
    facility_type = fields.Str(required=True)
    contact = fields.Str(allow_none=True)
    operating_hours = fields.Str(allow_none=True)
    accepted_types = fields.List(fields.Str(), required=False)
    is_active = fields.Bool()