from django.contrib.auth.models import Group, User
from .models import Machine
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

import docker
docker_client = docker.from_env()

class MachineSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'
        read_only_fields = ['container_id', 'owner']
    def create(self, data):
        machine_type=data["machine_type"]
        if machine_type==Machine.MachineType.WEB_SERVER:
            container=docker_client.containers.run("litespeedtech/litespeed:latest", name=data["name"], detach=True)
        elif machine_type==Machine.MachineType.DNS_SERVER:
            container=docker_client.containers.run("powerdns/pdns-auth-48:latest", name=data["name"], detach=True)
        else:
            raise ValueError
        machine=Machine(**data, container_id=str(container.id), owner=self.context["request"].user)
        machine.save()
        return machine