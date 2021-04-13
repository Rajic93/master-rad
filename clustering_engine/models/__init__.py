from flask_sqlalchemy import SQLAlchemy
import os


def init_app(app):
    db = SQLAlchemy(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://root:root@localhost:5003/masterdb?sslmode=disable"
    db.init_app(app)
    return db