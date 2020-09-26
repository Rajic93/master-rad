from django.urls import path, include
from django.conf.urls import url
from django.http import JsonResponse
from rec_api import views
from rec_api.models import Books
from rest_framework import routers, serializers, viewsets
from rec_api.recommend import Recommender
from rest_framework.decorators import action, api_view
from rest_framework.permissions import AllowAny

# Serializers define the API representation.
class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Books
        fields = ['id', 'title', 'author', 'year', 'publisher', 'imageurls', 'imageurlm', 'imageurll']

# ViewSets define the view behavior.
class BookViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BookSerializer

@api_view(['GET', 'POST', 'DELETE'])
def recommend(request):
    if request.method == 'GET':
        recommender = Recommender();
        book_json = recommender.test()
        return JsonResponse(book_json, safe=False)

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'books', BookViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url('/recommend', recommend, name='recommend'),
    path('', include(router.urls)),
]
