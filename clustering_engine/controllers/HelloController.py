from flask_restful import Resource, marshal_with, fields, request
from services import users_service

class HelloController(Resource):
    def get(self):
        return 'Hello from clusterization engine'
