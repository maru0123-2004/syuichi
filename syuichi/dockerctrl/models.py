from django.db import models

class Machine(models.Model):
    id = models.UUIDField(primary_key=True)
    container_id = models.CharField(max_length=100)
    name= models.CharField(max_length=100)
    description=models.CharField(max_length=300)
