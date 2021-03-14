from flask_restful import Resource, marshal_with
from controllers.UsersController import user_resource_fields
from services.DBScan import DBScan
from services import users_service

clustering_algorithm = DBScan()

class DBScanController(Resource):

    def get(self):
        users = users_service.get_all_for_clusterization()
        clusters = clustering_algorithm.clusterize(users)
        labels = clustering_algorithm.getLabels()
        labelIds = clustering_algorithm.getLabelIds()
        mapped_clusters = clustering_algorithm.map_users_to_clusters_dict()

        users_service.update_users_cluster_label(mapped_clusters)

        return {
            "labels": labels,
            "labelIds": labelIds,
            "clusters": mapped_clusters
        }

    # TODO: rewrite this once all parts are defined
    #       this is more like pseudocode
    def post(self, req):
        # read user data from req
        user = req.body

        # read users from db

        # create Cluster array

        # find the most suitable cluster
        age_epsilon = 10
        lat_epsilon = 10
        lng_epsilon = 10
        cluster_id = clustering_algorithm.find_the_most_suitable_cluster_for_new_user(clusters, new_user, age_epsilon, lat_epsilon, lng_epsilon)
        # assign cluster id to user
        new_user.cluster_id = cluster_id
        # create user record by calling users microservice

        # increase new users counter
        new_users_counter = new_users_counter + 1
        new_users_counter_threshold = 100

        # if more than 100 re-clusterize all of them
        if new_users_counter >= new_users_counter_threshold:
            clustering_algorithm.load_data()
            clusters = clustering_algorithm.clusterize(clustering_algorithm.users)
