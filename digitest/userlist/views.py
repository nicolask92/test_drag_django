from .models import UserList, ListRow
from django.template import loader
from django.http.response import HttpResponse, HttpResponseServerError,\
    JsonResponse
from django.core import serializers
import json

def index(request):
    try:
            ulist = UserList.objects.all().order_by('?').first()            
    except:
        return
    template = loader.get_template('userlist/userlist.html')
    context ={'userlist': ulist,}
    return HttpResponse(template.render(context, request))


def auto(request):
    try:
            ulist = UserList.objects.all().order_by('?').first()            
    except:
        return
    template = loader.get_template('userlist/automatico.html')
    context ={'userlist': ulist,}
    return HttpResponse(template.render(context, request))


def save(request):
    listaraw = request.GET.get("vFilas", None)
    try:
        lista = json.loads(listaraw)
        i=1

        for j in lista:
            ListRow.objects.filter(id=lista[i-1]).update(position=i)
            i=i+1
            
        data = "True"

        return JsonResponse(data, safe=False)
    except:
        return HttpResponseServerError()


def get_list(request):
    name = request.GET.get("name",None)
    try:
        userlist = UserList.objects.get(name=name)
    except:
        return HttpResponseServerError()
    data = {
        'list':serializers.serialize('json',[userlist]),
        'rows':serializers.serialize('json',userlist.rows.all().order_by("position"))
        }
    return JsonResponse(data, safe=False)
