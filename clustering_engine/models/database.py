from flask_restful import Resource, marshal_with, fields
from main import app, api


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lat = db.Column(db.Float, nullable=True)
    lng = db.Column(db.Float, nullable=True)
    street = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(255), nullable=True)
    state = db.Column(db.String(255), nullable=True)
    country = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f"Users(id = {id}, lat = {lat}, lng = {lng}, street = {street}, city = {city}, country = {country})"
