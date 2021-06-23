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


#Models
from sscpat.sscpat.models.documents import Document

# Serializers
from sscpat.sscpat.api.serializers.documents import (
    DocumentModelSerializer
)



# Utils

from sscpat.sscpat.utils import viewsets,mixins

# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin
# Action

from sscpat.sscpat.pagination import CustomPagination



class DocumentViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.DestroyModelMixin,
                            mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """User viewset """
    queryset =  Document.objects.filter(active=True)
    serializer_class = DocumentModelSerializer
    # pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('title',)
    ordering_fields = ('title', 'created_at')
    search_fields = ('title',)
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
        if instance.modalities.filter(active=True).count() > 0 or  instance.modalities_document_inscription.filter(active=True).count():
            return Response({'detail': _(
                "Some modalities depends of this register, you can't delete until you delete all its dependencies")},
                            status=status.HTTP_400_BAD_REQUEST)

        self.perform_destroy(instance, request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)





