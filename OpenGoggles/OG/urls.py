from django.apps import AppConfig

from django.urls import path

from . import views

class OgConfig(AppConfig):
    name = 'OG'

urlpatterns = [
    path('', view = views.index, name = 'index'),    
]