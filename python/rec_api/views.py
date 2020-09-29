from django.http import JsonResponse
from rest_framework import serializers, viewsets
from rest_framework.decorators import api_view
from rec_api.models import Books
from rec_api.recommend import Recommender


# Serializers define the API representation.
class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Books
        fields = [
            'id',
            'title',
            'authors',
            'year',
            'language_code',
            'average_rating',
            'ratings_count',
            'ratings_1',
            'ratings_2',
            'ratings_3',
            'ratings_4',
            'ratings_5',
            'publisher',
            'image_url',
            'small_image_url',
        ]

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