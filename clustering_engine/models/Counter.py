from app import db


class CounterModel(db.Model):
    __tablename__ = 'counters'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    value = db.Column(db.Integer, nullable=True)

    # def __repr__(self):
    #     return f"Counters(id = {self.id}, name = {self.name}, value = {self.value})"
