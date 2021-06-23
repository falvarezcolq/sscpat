"""User ViewSet."""


from django_filters.rest_framework import DjangoFilterBackend
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter

# Django
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

# Django REST Framework
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.generics import GenericAPIView,RetrieveAPIView

#Models
from sscpat.sscpat.models.users import ExternalTutor

# Serializers
from sscpat.sscpat.api.serializers.externaltutors import (
    ExternalTutorModelSerializer,
    ExternalTutorListSerializer,
    ExternalTutorMinimalListModelSerializer,
)



# Utils
from rest_framework_simplejwt.views import TokenViewBase
from sscpat.sscpat.utils import viewsets,mixins
from sscpat.sscpat.utils.exceptions import ValidationError
# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin
# Action

from sscpat.sscpat.pagination import CustomPagination



class ExternalTutorViewSet(mixins.RetrieveModelMixin,
                   mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    """User viewset """
    queryset =  ExternalTutor.objects.filter(active=True)
    serializer_class = ExternalTutorModelSerializer
    pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('last_name',)
    ordering_fields = ('last_name', 'created_at')
    search_fields = ('first_name','last_name','last_name2','CI')
    filterset_fields = ['type']

    def get_permissions(self):
        """Assign permissions based on action."""

        if self.action in ['list']:
            permissions = [IsAuthenticated,IsAccountAdmin,]
        else:
            permissions = [AllowAny]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['list','retrieve']:
            return ExternalTutorListSerializer
        return self.serializer_class




class ExternalTutorListViewSet(mixins.RetrieveModelMixin,
                       mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    """User viewset """
    queryset =  ExternalTutor.objects.filter(active=True)
    serializer_class = ExternalTutorMinimalListModelSerializer
    # pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('last_name',)
    ordering_fields = ('last_name', 'created_at')
    search_fields = ('first_name','last_name','last_name2','CI')
    # filterset_fields = ['type']

    def get_permissions(self):
        """Assign permissions based on action."""

        if self.action in ['list']:
            permissions = [IsAuthenticated,IsAccountAdmin,]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]


