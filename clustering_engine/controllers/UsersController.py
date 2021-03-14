from flask_restful import Resource, marshal_with, fields, request
from services import users_service

user_resource_fields = {
    'id': fields.Integer,
    'lat': fields.Float,
    'lng': fields.Float,
    'street': fields.String,
    'city': fields.String,
    'state': fields.String,
    'country': fields.String,
    'age': fields.Integer,
    'cluster_label': fields.Integer
}

class UsersController(Resource):
    @marshal_with(user_resource_fields)
    def get(self):
        query = request.args
        limit = query.get('limit') or 10
        offset = query.get('offset') or 0
        result = users_service.get_all(limit, offset)
        return result
