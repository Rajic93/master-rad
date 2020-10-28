from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from rec_api.views import BookViewSet, recommend, find_and_cluster


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'books', BookViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url('/recommend', recommend, name='recommend'),
    url('/clusterize', find_and_cluster, name='clusterize'),
    path('', include(router.urls)),
]
