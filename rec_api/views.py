from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rec_api.models import Books
import json
from django.conf import settings  
from .apps import  RecApiConfig
from rest_framework.decorators import api_view
import os
import time
import glob
import requests
from scipy import ndimage
from scipy.ndimage import zoom

# Create your views here.
def rec_api(request): #view function
    return JsonResponse({'message': 'desi le pi'})

def list_books():
    books = Books.objects.all()

    data = {
        "books": books
    }
    return HttpResponse(list(data), mimetype='application/json')


@api_view(["POST"]) 

def check_result(request):
    #Get video file url
    url = request.POST.get('url') 
    head, tail = os.path.split(url)

    r = requests.get(url, allow_redirects=True)
    open("resume/" + tail, 'wb').write(r.content)

    video_path = "resume/"
    files = []
    for i in os.listdir(video_path):
        if i.endswith('.mp4'):
            files.append(i)
    for j in files:
        sec = 0
        count = 1
        frameRate = 5

        while success:
            count = count + 1
            sec = sec + frameRate
            sec = round(sec, 2)  # it will capture image every 2 second

    img_path = glob.glob("frames/*.jpg")
    data = []

    emo_data = freq_persona(data)
    print(emo_data)

    # setting emotional values to its respective labels
    emo_data.loc[emo_data['Emotion'] == 0, 'Emotion_Label'] = 'Angry'
    emo_data.loc[emo_data['Emotion'] == 1, 'Emotion_Label'] = 'Disgust'
    emo_data.loc[emo_data['Emotion'] == 2, 'Emotion_Label'] = 'Nervous'
    emo_data.loc[emo_data['Emotion'] == 3, 'Emotion_Label'] = 'Happy'
    emo_data.loc[emo_data['Emotion'] == 4, 'Emotion_Label'] = 'Sad'
    emo_data.loc[emo_data['Emotion'] == 5, 'Emotion_Label'] = 'Surprise'
    emo_data.loc[emo_data['Emotion'] == 6, 'Emotion_Label'] = 'Neutral'

    emo_data = emo_data[emo_data['Count'].notna()]
    emo_data = emo_data[emo_data['Emotion'].notna()]
    emo_disp = emo_data[['Emotion_Label', 'Count']]

    emo_jso = emo_disp.to_json(orient='values') 

    return JsonResponse(emo_jso, safe=False) 