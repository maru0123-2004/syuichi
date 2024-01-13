from django.contrib.auth.models import Group, User
from rest_framework import permissions, viewsets
from rest_framework.response import Response

import docker
docker_client = docker.from_env()

from .serializers import GroupSerializer, UserSerializer, MachineSerializer
from .models import Machine

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
        return Response("error: not impd", status=404)
    def partial_update(self, request, *args, **kwargs):
        return Response("error: not impd", status=404)
    def destroy(self, request, *args, **kwargs):
        machine=Machine.objects.get(id=kwargs['pk'])
        if machine.owner==request.user:
            docker_client.containers.get(machine.container_id).remove(v=True, force=True)
            return super().destroy(request, *args, **kwargs)
        else:
            return Response("error: permission denied", status=400)