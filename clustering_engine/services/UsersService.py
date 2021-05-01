from sqlalchemy import and_
from sqlalchemy.orm import sessionmaker
from app import db

class UsersService:
    def __init__(self, UsersModel):
        self.model = UsersModel

    def get_by_id(self, id):
        return self.model.query.filter(self.model.id == id).one()

    def get_all(self, limit = 10, offset = 0):
        return self.model.query.offset(offset).limit(limit).all()

    def get_all_for_clusterization(self):
        return self.model.query.filter(and_(self.model.lat != None, self.model.lng != None))

    def get_all_clusters(self):
        return self.model.query.distinct(self.model.cluster_label).all()
    
    def get_all_clusters_with_users_coords(self):
        users = self.model.query.all()
        clusters = {}
        for user in users:
            if user.cluster_label not in clusters:
                clusters[user.cluster_label] = { "users": [] }
            clusters[user.cluster_label]["users"].append({
                "age": user.age,
                "lat": user.lat,
                "lng": user.lng,
            })            
        return clusters

    def update_users_cluster_label(self, clusters):
        print('clusters')
        for label in clusters:
            print(label)
            ids = []
            for user in clusters[label]:
                id = user[3]
                ids.append(id)
            db.session.query(self.model).filter(self.model.id.in_(ids)).update({ "cluster_label": label }, synchronize_session=False)
            db.session.commit()

    def update(self, id, cluster_label):
        db.session.query(self.model).filter(self.model.id == id).update({ "cluster_label": cluster_label }, synchronize_session=False)
        db.session.commit()
