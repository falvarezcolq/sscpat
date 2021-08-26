"""User ViewSet."""


from django_filters.rest_framework import DjangoFilterBackend
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter

# Django
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

# Django REST Framework
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework.response import  Response
from rest_framework import status



#Models
from sscpat.sscpat.models.modalities import Modality
from sscpat.sscpat.models.documents import Document
from sscpat.sscpat.models.normative import Normative
from sscpat.sscpat.models.modalityconfig import ModalityConfig



# Serializers
from sscpat.sscpat.api.serializers.modalities import (
    ModalityModelCompleteSerializer,
    ModalityModelSerializer,
)
from sscpat.sscpat.api.serializers.modalityconfig import ModalityConfigModelSerializer



# Utils

from sscpat.sscpat.utils import viewsets,mixins

# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin
# Action

from sscpat.sscpat.pagination import CustomPagination

import filetype
import json

class ModalityViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.DestroyModelMixin,
                            mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """User viewset """
    queryset =  Modality.objects.filter(active=True)
    serializer_class = ModalityModelSerializer
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

    def get_serializer_class(self):
        if self.action in ['create', 'update',]:
            return ModalityModelSerializer
        if self.action in ['retrieve','list']:
            return ModalityModelCompleteSerializer
        return self.serializer_class


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        modality =self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        data = ModalityModelCompleteSerializer(modality).data
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        modality = serializer.save()
        data = self.request.data
        # data['modality'] = modality.pk
        serializerConfig = ModalityConfigModelSerializer(data=self.request.data)
        serializerConfig.is_valid(raise_exception=True)
        ModalityConfig.objects.create(modality=modality,**serializerConfig.data)


        # import pdb;pdb.set_trace()

        files = []
        for key in self.request.data:
            if 'normatives' in key:
                files.append(self.request.data[key])

        for file in files:
            kind = filetype.guess(file)
            Normative.objects.create(
                modality=modality,
                format=kind.mime,
                title=file.name,
                path=file
            )

        if 'documents' in data:
            documents = json.loads(data['documents'])
            for doc in documents:
                d = Document.objects.get(id=doc['id'])
                modality.documents.add(d)

        if 'document_inscription' in data:
            documents = json.loads(data['document_inscription'])
            for doc in documents:
                d = Document.objects.get(id=doc['id'])
                modality.document_inscription.add(d)

        return modality

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer,instance)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}
        data = ModalityModelCompleteSerializer(instance).data
        return Response(data)

    def perform_update(self, serializer,instance):
        serializer.save()
        serializerConfig = ModalityConfigModelSerializer(instance.config,data=self.request.data)
        serializerConfig.is_valid(raise_exception=True)
        serializerConfig.save()

        data = self.request.data

        files = []
        for key in self.request.data:
            if 'normatives[' in key:
                files.append(self.request.data[key])

        for file in files:
            kind = filetype.guess(file)
            Normative.objects.create(
                modality=instance,
                format=kind.mime,
                title=file.name,
                path=file
            )

        # import pdb;pdb.set_trace()
        if 'deleted' in data:
            deleted = json.loads(data['deleted'])
            for normative_id in deleted:
                try:
                    normative = instance.normatives.get(id=normative_id)
                    normative.active = False ;
                    normative.save()
                except Normative.DoesNotExist:
                    pass

        if 'documents' in data:
            documents =  json.loads(data['documents'])
            instance.documents.clear()
            for doc in documents:
                try:
                    d = Document.objects.get(id=doc['id'])
                    instance.documents.add(d)
                except Document.DoesNotExist:
                    pass

        if 'document_inscription' in data:
            documents = json.loads(data['document_inscription'])
            instance.document_inscription.clear()
            for doc in documents:
                try:
                    d = Document.objects.get(id=doc['id'])
                    instance.document_inscription.add(d)
                except Document.DoesNotExist:
                    pass

        # return modality





    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.projects.filter(active=True).count() > 0 :
            return Response({'detail': _(
                "Some projects depends of this titulation modality, you can't delete until you delete all its dependencies")},
                            status=status.HTTP_400_BAD_REQUEST)

        self.perform_destroy(instance, request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)








