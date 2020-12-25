from django.shortcuts import redirect, render

from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request = request, template_name = 'index.html', context = {'secret': '82c41530'})


# def send_request(request):
#     result = request.get('http://www.omdbapi.com/?apikey=82c41530&')

#     redirect(result)