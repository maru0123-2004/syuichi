from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'name': user.username
        })

from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from rest_framework.decorators import action

import docker, ipaddress
docker_client = docker.from_env()

from .serializers import *
from .models import Machine, Network, Port

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

class MachineViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows machines to be viewed or edited.
    """
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    permission_classes = [permissions.IsAuthenticated]
    def update(self, request, *args, **kwargs):
        for key in request.data:
            if key not in ["x", "y"]:
                return Response(f"error: can't change {key}", status=404)
        return super().update(request, *args, **kwargs)
    def partial_update(self, request, *args, **kwargs):
        for key in request.data:
            if key not in ["x", "y"]:
                return Response(f"error: can't change {key}", status=404)
        return super().partial_update(request, *args, **kwargs)
    def destroy(self, request, *args, **kwargs):
        machine=Machine.objects.get(id=kwargs['pk'])
        if machine.owner==request.user:
            docker_client.containers.get(machine.container_id).remove(v=True, force=True)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response("error: permission denied", status=403)
    @action(detail=True, methods=['post'], url_name="attach_network", serializer_class=AttachNetworkSerializer)
    def attach_network(self, request, pk=None):
        if "network_id" not in request.data:
            return Response("error: network_id is not given", status=400)
        if "ipaddr" not in request.data:
            return Response("error: ipaddr is not given", status=400)
        machine=Machine.objects.get(id=pk)
        if machine.owner!=request.user:
            return Response("error: permission denied", status=403)
        network=Network.objects.get(id=request.data["network_id"])
        Port(ip_addr=request.data["ipaddr"], network=network, machine=machine).save()
        ip_version=ipaddress.ip_address(request.data["ipaddr"]).version
        docker_client.networks.get(network.network_id).connect(machine.container_id,
                                                               ipv4_address=request.data["ipaddr"] if ip_version == 4 else None,
                                                               ipv6_address=request.data["ipaddr"] if ip_version == 6 else None)
        return Response("success", status=200)
    @action(detail=True, methods=['post'], url_name="dettach_network", serializer_class=DettachNetworkSerializer)
    def dettach_network(self, request, pk=None):
        if "network_id" not in request.data:
            return Response("error: network_id is not given", status=400)
        machine=Machine.objects.get(id=pk)
        if machine.owner!=request.user:
            return Response("error: permission denied", status=403)
        network=Network.objects.get(id=request.data["network_id"])
        network.machines.remove(machine)
        network.save()
        docker_client.networks.get(network.network_id).disconnect(machine.container_id, force=True)
        return Response("success", status=200)
    @action(detail=True, methods=["post"], url_name="dnsconfig")
    def dnsconfig(self, request, pk=None):
        machine=Machine.objects.get(id=pk)
        if machine.owner!=request.user:
            return Response("error: permission denied", status=403)
        

class NetworkViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows networks to be viewed or edited.
    """
    queryset = Network.objects.all()
    serializer_class = NetworkSerializer
    permission_classes = [permissions.IsAuthenticated]
    def update(self, request, *args, **kwargs):
        for key in request.data:
            if key not in ["x", "y"]:
                return Response(f"error: can't change {key}", status=404)
        return super().update(request, *args, **kwargs)
    def partial_update(self, request, *args, **kwargs):
        for key in request.data:
            if key not in ["x", "y"]:
                return Response(f"error: can't change {key}", status=404)
        return super().partial_update(request, *args, **kwargs)
    def destroy(self, request, *args, **kwargs):
        network=Network.objects.get(id=kwargs['pk'])
        if network.owner==request.user:
            docker_client.networks.get(network.network_id).remove()
            return super().destroy(request, *args, **kwargs)
        else:
            return Response("error: permission denied", status=403)
