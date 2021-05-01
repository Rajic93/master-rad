from services.UsersService import UsersService
from services.CountersService import CountersService
from models.User import UsersModel
from models.Counter import CounterModel

users_service = UsersService(UsersModel)
counter_service = CountersService(CounterModel)
