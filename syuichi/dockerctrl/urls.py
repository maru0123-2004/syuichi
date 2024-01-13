from rest_framework import routers
from .views import UserViewSet, GroupViewSet, MachineViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'machines', MachineViewSet)