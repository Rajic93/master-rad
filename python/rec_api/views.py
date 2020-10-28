from django.http import JsonResponse
from rest_framework import serializers, viewsets
from rest_framework.decorators import api_view
from rec_api.models import Books, Users
from rec_api.recommend import Recommender
from rec_api.clusterize import clusterize


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
        recommender = Recommender()
        books = request.query_params.getlist('books')
        recommendations = recommender.test(books)
        return JsonResponse(recommendations, safe=False)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = [
            'id',
            'lat',
            'lng',
            'age',
        ]

@api_view(['GET', 'POST', 'DELETE'])
def find_and_cluster(request):
    if request.method == 'GET':
        #retrieve users
        users = Users.objects.all()
        ids = []
        for user in users:
            #ids.append(user.id)
            ids.append([user.lat, user.lng, user.age])
        #clusterize users
        ids_labels = clusterize(ids)
        #update labels
        index = 0
        for user in users:
            user.cluster_label = ids_labels[index][1]
            user.save(update_fields=['cluster_label'])
            index = index + 1
        #ok
        return JsonResponse('success', safe=False)
