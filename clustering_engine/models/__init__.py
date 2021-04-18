from flask_sqlalchemy import SQLAlchemy
import os


def init_app(app):
    db = SQLAlchemy(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://fnkgdhsztkvzsj:61ae98db23550c112620cfca8e02fc721471c412e44aa729a9eb6e1b15d203c1@ec2-54-74-156-137.eu-west-1.compute.amazonaws.com:5432/deq0ftt8uapr2p"
    db.init_app(app)
    return db