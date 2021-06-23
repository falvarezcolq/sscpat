"""User ViewSet."""


from django_filters.rest_framework import DjangoFilterBackend
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter

# Django
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

# Django REST Framework
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import status


#Models
from sscpat.sscpat.models.tracingstudentfile import TracingStudentFile
from sscpat.sscpat.models.inscriptions import Inscription

# Serializers
from sscpat.sscpat.api.serializers.tracingstudentfile import (
    TracingStudentFileModelSerializer
)



# Utils

from sscpat.sscpat.utils import viewsets,mixins

# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin,IsAccountStudent
# Action
from sscpat.sscpat.pagination import CustomPagination


class TracingStudentFileViewSet( mixins.CreateModelMixin,
                                 mixins.DestroyModelMixin,
                                 viewsets.GenericViewSet):
    """User viewset """
    queryset =  TracingStudentFile.objects.filter(active=True)
    serializer_class = TracingStudentFileModelSerializer
    # pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('-created_at',)
    ordering_fields = ('title', 'created_at')
    search_fields = ('description',)
    # filterset_fields = ['type']



    def get_permissions(self):
        """Assign permissions based on action."""

        if self.action in ['create','update','destroy']:
            permissions = [IsAuthenticated]#IsAccountStudent,]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]





