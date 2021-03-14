from sqlalchemy import and_
from sqlalchemy.orm import sessionmaker
from app import db

class UsersService:
    def __init__(self, UsersModel):
        self.model = UsersModel

    def get_all(self, limit = 10, offset = 0):
        return self.model.query.offset(offset).limit(limit).all()

    def get_all_for_clusterization(self):
        return self.model.query.filter(and_(self.model.lat != None, self.model.lng != None))

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
