from django.contrib.auth.models import Group, User
from django.db import models
import uuid

class Machine(models.Model):
    class MachineType(models.TextChoices):
        WEB_SERVER = "WEB"
        DNS_SERVER = "DNS"
        DHCP_SERVER = "DHCP"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    container_id = models.CharField(max_length=100)
    machine_type = models.CharField(max_length=50, choices=MachineType)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, default='')
    owner = models.ForeignKey(User, related_name='machines', on_delete=models.CASCADE)
