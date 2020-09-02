from django.urls import path
from rec_api import views

urlpatterns = [
    path('', views.rec_api, name='rec_api'),
    path('/books', views.list_books(), name='list_books')
]
