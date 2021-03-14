from flask import Flask
from flask_restful import Api

app = Flask(__name__)
api = Api(app)

from models import init_app as init_models

db = init_models(app)

# import logging
# logging.basicConfig()
# logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

from controllers import init_app as init_api
api = init_api(api)
