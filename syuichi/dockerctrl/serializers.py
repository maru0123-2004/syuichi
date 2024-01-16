from django.contrib.auth.models import Group, User
from .models import Machine, Network
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

import docker, docker.types, ipaddress
docker_client = docker.from_env()

class MachineSerializer(serializers.ModelSerializer):
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

class NetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Network
        fields = '__all__'
        read_only_fields = ['network_id', 'owner', 'gateway']
    def create(self, data):
        gateway=format(list(ipaddress.ip_network(data["network"]).hosts())[-1])
        ipam_config=docker.types.IPAMConfig(pool_configs=[
            docker.types.IPAMPool(
                subnet=format(data["network"]),
                iprange=format(data["network"]),
                gateway=gateway
            )
        ])
        network=docker_client.networks.create(name=data["name"], enable_ipv6=data["network"].version==6, driver="bridge", ipam=ipam_config)
        network=Network(**data, network_id=str(network.id), owner=self.context["request"].user, gateway=gateway)
        network.save()
        return network