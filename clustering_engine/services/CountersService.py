from sqlalchemy import and_
from sqlalchemy.orm import sessionmaker
from app import db

class CountersService:
    def __init__(self, CounterModel):
        self.model = CounterModel

    def get_all(self, limit = 10, offset = 0):
        return db.session.query(self.model).offset(offset).limit(limit).all()

    def get_by_name(self, name):
        counters = db.session.query(self.model).filter(self.model.name == name)
        if counters[0]:
            return counters[0].value
        else:
            return 0

    def update_by_name(self, name, value):
        db.session.query(self.model).filter(self.model.name == name).update({ "value": value }, synchronize_session=False)
        db.session.commit()