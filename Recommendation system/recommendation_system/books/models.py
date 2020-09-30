from django.db import models

# Create your models here.

    class Article(models.Model):
        title = models.CharField(max_length=150)
        author = models.CharField(max_length=150)
        year = models.IntegerField(max_length=4)
        publisher = models.CharField(max_length=150)
        imageurls = models.CharField(max_length=255)
        imageurlm = models.CharField(max_length=255)
        imageurll = models.CharField(max_length=255)

    def __str__(self):
        return self.title