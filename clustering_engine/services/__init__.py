from services.UsersService import UsersService
from services.CountersService import CountersService
from services.ClusterizationService import ClusterizationService
from services.DBScan import DBScan
from services.Events import initEvents
from models.User import UsersModel
from models.Counter import CounterModel


users_service = UsersService(UsersModel)
counter_service = CountersService(CounterModel)
clustering_algorithm = DBScan()
clusterizationService = ClusterizationService(users_service, clustering_algorithm, counter_service)


handlers = {
    "clusterize-temp": clusterizationService.clusterize_temp
}


initEventsHandler = initEvents(handlers)