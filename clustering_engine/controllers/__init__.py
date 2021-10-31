from controllers.DBScanController import DBScanController
from controllers.UsersController import UsersController
from controllers.HelloController import HelloController


def init_app(api):
    api.add_resource(DBScanController, "/cluster")
    api.add_resource(UsersController, "/users")
    api.add_resource(HelloController, "/ping")
