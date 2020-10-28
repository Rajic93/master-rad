from django.db import models

class Books(models.Model):
    title = models.CharField(max_length=150)
    authors = models.CharField(max_length=150)
    year = models.IntegerField(max_length=4)
    language_code = models.CharField(max_length=10)
    average_rating = models.DecimalField(max_digits=3, decimal_places=2)
    ratings_count = models.IntegerField(max_length=13)
    ratings_1 = models.IntegerField(max_length=13)
    ratings_2 = models.IntegerField(max_length=13)
    ratings_3 = models.IntegerField(max_length=13)
    ratings_4 = models.IntegerField(max_length=13)
    ratings_5 = models.IntegerField(max_length=13)
    publisher = models.CharField(max_length=150)
    image_url = models.CharField(max_length=1024)
    small_image_url = models.CharField(max_length=1024)

class Users(models.Model):
    id = models.IntegerField(max_length=11, primary_key=True)
    lat = models.DecimalField(max_digits=8, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
    age = models.IntegerField(max_length=3)
    cluster_label = models.IntegerField(max_length=5)
    class Meta:
        db_table='User'
