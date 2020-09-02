from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rec_api.models import Books
import json

# Create your views here.
def rec_api(request): #view function
    return JsonResponse({'message': 'desi le pi'})

def list_books():
    books = Books.objects.all()

    data = {
        "books": books
    }
    return HttpResponse(list(data), mimetype='application/json')