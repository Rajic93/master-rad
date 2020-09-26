from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rec_api.models import Books
# import json
# from django.conf import settings  
# from .apps import  RecApiConfig
# from rest_framework.decorators import api_view
# import os
# import time
# import glob
# import requests
# from scipy import ndimage
# from scipy.ndimage import zoom

# Create your views here.
def rec_api(request): #view function
    return JsonResponse({'message': 'desi le pi'})

def list_books():
    books = Books.objects.all()

    data = {
        "books": books
    }
    return HttpResponse(list(data), mimetype='application/json')


# @api_view(["POST"]) 

# def check_result(request):
#     #Get video file url
#     url = request.POST.get('url') 
#     head, tail = os.path.split(url)

#     r = requests.get(url, allow_redirects=True)

#     emo_jso = emo_disp.to_json(orient='values') 

#     return JsonResponse(emo_jso, safe=False) 