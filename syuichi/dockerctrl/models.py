from django.contrib.auth.models import Group, User
from django.db import models
import uuid, netfields

class Machine(models.Model):
    class MachineType(models.TextChoices):
        WEB_SERVER = "WEB"
        DNS_SERVER = "DNS"
        SMTP_SERVER = "SMTP"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    container_id = models.CharField(max_length=100)
    machine_type = models.CharField(max_length=50, choices=MachineType)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, default='')
    owner = models.ForeignKey(User, related_name='machines', on_delete=models.CASCADE)
    x = models.BigIntegerField(default=0)
    y = models.BigIntegerField(default=0)

class Network(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    network_id = models.CharField(max_length=100)
    network = netfields.CidrAddressField()
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300, default='')
    gateway = netfields.InetAddressField()
    owner = models.ForeignKey(User, related_name='networks', on_delete=models.CASCADE)
    machines = models.ManyToManyField(Machine, related_name="networks", through="Port")
    x = models.BigIntegerField(default=0)
    y = models.BigIntegerField(default=0)

class Port(models.Model):
    ip_addr = models.GenericIPAddressField()
    machine = models.ForeignKey(Machine, related_name="ports", on_delete=models.CASCADE)
    network = models.ForeignKey(Network, related_name="ports", on_delete=models.CASCADE)
    class Meta:
       unique_together = ('network', 'machine')