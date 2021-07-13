"""User ViewSet."""


from django_filters.rest_framework import DjangoFilterBackend
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter

# Django
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

# Django REST Framework
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action


#Models
from sscpat.sscpat.models.notifications import Notification

# Serializers
from sscpat.sscpat.api.serializers.notifications import (
    NotificationModelSerializer
)



# Utils

from sscpat.sscpat.utils import viewsets,mixins

# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin
# Action

from sscpat.sscpat.pagination import NotificationPagination



class NotificationsViewSet(
    #                         mixins.RetrieveModelMixin,
    #                         mixins.UpdateModelMixin,
    #                         mixins.DestroyModelMixin,
                            mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """User viewset """
    queryset =  Notification.objects.filter(active=True)
    serializer_class = NotificationModelSerializer
    pagination_class = NotificationPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('-created_at',)
    ordering_fields = ('created_at')
    search_fields = ('user','inscription')
    filterset_fields = ['type','inscription']

    def get_permissions(self):
        """Assign permissions based on action."""

        if self.action in ['create','update','destroy']:
            permissions = [IsAuthenticated,IsAccountAdmin,]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]


    def get_queryset(self):
        user = self.request.user
        return self.queryset.filter(user=user)


    @action(detail=False,methods=['get'])
    def was_not_read(self,request, *args, **kwargs):
        user = self.request.user
        response_data = {
            "data": Notification.objects.filter(user=user, is_read=False,active=True).count()
        }
        return Response(response_data, status=status.HTTP_200_OK)

    @action(detail=False,methods=['post'])
    def was_read(self,request, *args, **kwargs):
        user = self.request.user
        Notification.objects.filter(user=user,is_read=False).update(is_read=True)
        return Response(status=status.HTTP_200_OK)













