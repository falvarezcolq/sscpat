"""InscriptionInitialDocuments ViewSet"""

#django filter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter,OrderingFilter

# Django
from django.utils.translation import ugettext_lazy as _

# Django REST Framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

# Models
from sscpat.sscpat.models.inscriptioninitialdocuments import InscriptionInitialDocument
from sscpat.sscpat.models.inscriptioninitialdocuments import InscriptionInitialDocument

# Serializer
from sscpat.sscpat.api.serializers.inscriptiondocuments import InscriptionInitialDocumentModelSerializer
from sscpat.sscpat.api.serializers.file import SerializerFileUpload

# Utils
from sscpat.sscpat.utils import viewsets, mixins

class InscriptionInitialDocumentViewSet( mixins.UpdateModelMixin,
                           mixins.DestroyModelMixin,
                                mixins.RetrieveModelMixin,
                           viewsets.GenericViewSet):
    """Inscription ViewSet"""
    queryset = InscriptionInitialDocument.objects.filter(active=True)
    serializer_class =  InscriptionInitialDocumentModelSerializer

    @action(detail=True, methods=['POST'])
    def uploadfile(self,request,*arg,**kwargs):
        instance = self.get_object()
        serializer = SerializerFileUpload(data=request.data)
        serializer.is_valid(raise_exception=True)
        file = serializer.save()
        instance.file=file
        instance.save()

        return Response(self.get_serializer(instance).data)

    @action(detail=True, methods=['DELETE'])
    def deletefile(self, request, *arg, **kwargs):
        instance = self.get_object()
        instance.file = None
        instance.save()

        return Response(self.get_serializer(instance).data)






