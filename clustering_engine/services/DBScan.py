import csv
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler

class DBScan:
    def __init__(self):
        self.users = []
        self.clusters = []
        self.labels = []
        self.lngPoints = []
        self.latPoints = []
        self.agePoints = []

    def generate_fake_data(self):
        count = 10
        while count > 0:
            lat = 11.2132
            lng = 12.2132
            age = 21
            self.users.append([lat, lng, age])
            count = count - 1
        count = 10
        while count > 0:
            lat = 12.2132
            lng = 13.2132
            age = 22
            self.users.append([lat, lng, age])
            count = count - 1

    def load_data_file(self, fileName):
        with open(fileName, encoding = 'utf8') as book_tag:
            csv_reader = csv.reader(book_tag, delimiter = ',')
            count = 0
            for row in csv_reader:
                if count > 0:
                    self.users.append([row[2], row[3], row[4]])
                    self.lngPoints.append(row[2])
                    self.latPoints.append(row[3])
                    self.agePoints.append(row[4])
                count += 1

        
    def parse_users(self, data):
        users = []
        for user in data:
            lat = user.lat
            lng = user.lng
            age = user.age
            id = user.id
            # print([lat, lng, age, id])
            users.append([lat, lng, age, id])
        return users

    def clusterize(self, data, epsilon = 0.2, min_samples = 10):
        users = self.parse_users(data)
        self.users = users
        subset_of_users = StandardScaler().fit_transform(users)
        clusters = DBSCAN(eps = epsilon, min_samples = min_samples).fit(subset_of_users)
        self.clusters = clusters
        return clusters

    def map_users_to_clusters_dict(self):
        counter = 0
        clusters = {}
        for user in self.users:
            # print(user)
            label = self.labels[counter]
            # print("label", label)
            if label in clusters:
                clusters[int(label)].append(user)
            else:
                clusters[int(label)] = [user]
            counter = counter + 1
        return clusters

    # input clusters: Cluster {
    #   id: int,
    #   users: [{
    #     lat: float,
    #     lng: float,
    #     age: int,
    #   }],
    # }
    # return NormalizedCluster {
   #   id: int,
   #   users: [{
   #     lat: float,
   #     lng: float,
   #     age: int,
   #   }],
   #   center_lat: float,
   #   center_lng: float,
   #   avg_age: int,
   # }
    def calculate_clusters_avg_values(clusters):
        normalized_clusters = []

        for cluster in clusters:
            coords = []
            sum_age = 0
            counter = 1

            for user in cluster.users:
                coors.append(user)
                sum_age = sum_age + user.age
                counter = counter + 1

            avg_age = sum_age / counter
            center_coors = calculate_center_coordinates(coords)
            cluster.avg_age = avg_age
            cluster.center_lat = center_coors.lat
            cluster.center_lng = center_coors.lng

            normalized_clusters.append({
                avg_age: avg_age,
                center_lat: center_coors.lat,
                enter_lng: center_coors.lng,
                id: cluster.id,
                users: cluster.users
            })

        return normalized_clusters

    def find_the_most_suitable_cluster_for_new_user(self, clusters, user, age_epsilon, lat_epsilon, lng_epsilon):
        cluster_id = 0
        current_age_difference = age_epsilon
        current_lat_difference = lat_epsilon
        current_lng_difference = lng_epsilon
        print(user)

        for cluster in clusters:
            age_difference = cluster['avg_age'] - user.age
            lat_difference = cluster['avg_lat'] - user.lat
            lng_difference = cluster['avg_lng'] - user.lng

            if age_difference < current_age_difference and lat_difference < current_lat_difference and lng_difference < current_lng_difference:
                cluster_id = cluster['id']

        return cluster_id

    def calculate_center_coordinates(self, coordinates):
        counter = 0
        sum_lat = 0
        sum_lng = 0
        sum_age = 0
        for coords in coordinates:
            sum_lat = sum_lat + (coords['lat'] or 0)
            sum_lng = sum_lng + (coords['lng'] or 0)
            sum_age = sum_age + (coords['age'] or 0)
            counter = counter + 1
        return {
            "lat": sum_lat / counter,
            "lng": sum_lng / counter,
            "age": sum_age / counter,
        }

    def getLabels(self):
        labels_normalized = []
        labels = self.clusters.labels_
        for cluster in labels:
            labels_normalized.append(int(cluster))
        self.labels = labels
        return labels_normalized

    def getLabelIds(self):
        ids = []
        counter = 0
        for cluster in self.labels:
            ids.append(counter)
            counter+=1
        return ids