from django.http import JsonResponse
from rest_framework import serializers, viewsets
from rest_framework.decorators import api_view
from rec_api.models import Books
from rec_api.recommend import Recommender


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
        books = request.query_params.getlist('books')
        recommendations = recommender.test(books)
        return JsonResponse(recommendations, safe=False)
