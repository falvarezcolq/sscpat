from django.http import HttpResponse
import datetime

def init_page(request):          
    now = datetime.datetime.now()
    html = "<html><body>API SERVER. It is now %s.</body></html>" % now
    return HttpResponse(html)   