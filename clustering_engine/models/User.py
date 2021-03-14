from app import db


class UsersModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Float, nullable=True)
    lng = db.Column(db.Float, nullable=True)
    street = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(255), nullable=True)
    state = db.Column(db.String(255), nullable=True)
    country = db.Column(db.String(255), nullable=True)
    age = db.Column(db.Integer, nullable=True)
    cluster_label = db.Column(db.Integer, nullable=True)

    def __repr__(self):
        return f"Users(id = {self.id}, lat = {self.lat}, lng = {self.lng}, street = {self.street}, city = {self.city}, state = {self.state}, country = {self.country})"
