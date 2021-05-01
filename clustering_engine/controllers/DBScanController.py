from flask_restful import Resource, marshal_with, reqparse
from controllers.UsersController import user_resource_fields
from services.DBScan import DBScan
from services import users_service, counter_service
from json import JSONEncoder

clustering_algorithm = DBScan()

parser = reqparse.RequestParser()
parser.add_argument('age', type=int)
parser.add_argument('lat', type=float)
parser.add_argument('lng', type=float)
parser.add_argument('id', type=int)

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
    def post(self):
        # read user data from req
        new_user = parser.parse_args()
        print(new_user)
        # create Cluster array
        clusters = users_service.get_all_clusters_with_users_coords()
        print(clusters)
        for cluster_label in clusters:
            cluster = clusters[cluster_label]
            center = clustering_algorithm.calculate_center_coordinates(cluster['users'])
            cluster['center'] = center

        mapped = []
        for cluster_label in clusters:
            cluster = clusters[cluster_label]
            mapped.append({
                "id": cluster_label,
                "avg_age": cluster['center']['age'],
                "avg_lat": cluster['center']['lat'],
                "avg_lng": cluster['center']['lng'],
            })

        # find the most suitable cluster
        age_epsilon = 10
        lat_epsilon = 10
        lng_epsilon = 10
        cluster_id = clustering_algorithm.find_the_most_suitable_cluster_for_new_user(mapped, new_user, age_epsilon, lat_epsilon, lng_epsilon)

        # assign cluster id to user
        users_service.update(new_user['id'], cluster_id)
        new_user.cluster_id = cluster_id
        
        # create user record by calling users microservice
        new_users_counter = counter_service.get_by_name('dbscan_new_users_count')
        
        # increase new users counter
        new_users_counter = new_users_counter + 1
        new_users_counter_threshold = counter_service.get_by_name('dbscan_new_users_count_threshold')
        counter_service.update_by_name('dbscan_new_users_count', new_users_counter)

        # if more than 100 re-clusterize all of them
        if new_users_counter >= new_users_counter_threshold:
            users = users_service.get_all_for_clusterization()
            clusters = clustering_algorithm.clusterize(users)
            labels = clustering_algorithm.getLabels()
            labelIds = clustering_algorithm.getLabelIds()
            mapped_clusters = clustering_algorithm.map_users_to_clusters_dict()

            users_service.update_users_cluster_label(mapped_clusters)

            user = users_service.get_by_id(new_user['id'])

            return user.cluster_label
        else:
            users_service.update(new_user['id'], cluster_id)
            return cluster_id

