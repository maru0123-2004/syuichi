from django.urls import path
from rest_framework import routers
from .views import CustomAuthToken, UserViewSet, GroupViewSet, MachineViewSet, NetworkViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'machines', MachineViewSet)
router.register(r'networks', NetworkViewSet)
router.urls.append(path('token/', CustomAuthToken.as_view()))