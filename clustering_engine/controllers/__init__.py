from controllers.DBScanController import DBScanController
from controllers.UsersController import UsersController


def init_app(api):
    api.add_resource(DBScanController, "/cluster")
    api.add_resource(UsersController, "/users")
