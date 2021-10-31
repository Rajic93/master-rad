
class ClusterizationService:
    def __init__(self, users_service, clustering_algorithm, counter_service):
        self.users_service = users_service
        self.clustering_algorithm = clustering_algorithm
        self.counter_service = counter_service

    def clusterize_temp(self, new_user, send_invalidate_cache_msg, connection):
        # create Cluster array
        clusters = self.users_service.get_all_clusters_with_users_coords()
        for cluster_label in clusters:
            cluster = clusters[cluster_label]
            center = self.clustering_algorithm.calculate_center_coordinates(cluster['users'])
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
        cluster_id = self.clustering_algorithm.find_the_most_suitable_cluster_for_new_user(mapped, new_user, age_epsilon, lat_epsilon, lng_epsilon)

        # assign cluster id to user
        self.users_service.update(new_user['id'], cluster_id)
        new_user['cluster_id'] = cluster_id
        print('new user', new_user)
        
        # create user record by calling users microservice
        new_users_counter = self.counter_service.get_by_name('dbscan_new_users_count')
        
        # increase new users counter
        new_users_counter = new_users_counter + 1
        new_users_counter_threshold = self.counter_service.get_by_name('dbscan_new_users_count_threshold')
        self.counter_service.update_by_name('dbscan_new_users_count', new_users_counter)
        
        # if more than 100 re-clusterize all of them
        if new_users_counter >= new_users_counter_threshold:
            print('new clusters incoming')
            users = self.users_service.get_all_for_clusterization()
            clusters = self.clustering_algorithm.clusterize(users)
            labels = self.clustering_algorithm.getLabels()
            labelIds = self.clustering_algorithm.getLabelIds()
            mapped_clusters = self.clustering_algorithm.map_users_to_clusters_dict()

            self.users_service.update_users_cluster_label(mapped_clusters)

            user = self.users_service.get_by_id(new_user['id'])

            # send message to invalidate old cache
            send_invalidate_cache_msg()

            return user.cluster_label
        else:
            print('using old clusters')
            self.users_service.update(new_user['id'], cluster_id)
            return cluster_id