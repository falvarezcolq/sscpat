"""User ViewSet."""


from django_filters.rest_framework import DjangoFilterBackend
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter

# Django
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

# Django REST Framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny


#Models
from sscpat.sscpat.models.institutions import Institution

# Serializers
from sscpat.sscpat.api.serializers.institutions import (
    InstitutionModelSerializer
)



# Utils

from sscpat.sscpat.utils import viewsets,mixins

# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin
# Action

from sscpat.sscpat.pagination import CustomPagination



class InstitutionViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.DestroyModelMixin,
                            mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """User viewset """
    queryset =  Institution.objects.filter(active=True)
    serializer_class = InstitutionModelSerializer
    # pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('name',)
    ordering_fields = ('name', 'created_at')
    search_fields = ('name',)
    # filterset_fields = ['type']

    def get_permissions(self):
        """Assign permissions based on action."""

        if self.action in ['create','update','destroy']:
            permissions = [IsAuthenticated,IsAccountAdmin,]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.projects.filter(active=True).count() > 0:
            return Response({'detail': _(
                "Some projects depends of this register, you can't delete until you delete all its dependencies")},
                            status=status.HTTP_400_BAD_REQUEST)

        self.perform_destroy(instance, request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)




