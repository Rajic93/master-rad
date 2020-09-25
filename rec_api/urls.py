from django.urls import path, include
from rec_api import views
from rec_api.models import Books
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Books
        fields = ['title', 'author', 'year', 'publisher', 'imageurls', 'imageurlm', 'imageurll']        

# ViewSets define the view behavior.
class BookViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BookSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'books', BookViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]
