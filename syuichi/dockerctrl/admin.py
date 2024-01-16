from django.contrib import admin
from .models import Machine, Network, Port

admin.site.register(Machine)
admin.site.register(Network)
admin.site.register(Port)