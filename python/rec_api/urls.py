from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from rec_api import views


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
# router.register(r'books', BookViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url('recommend/', views.recommend),
    # path('', include(router.urls)),
]
