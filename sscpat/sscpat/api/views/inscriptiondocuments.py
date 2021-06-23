"""InscriptionDocuments ViewSet"""

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
from sscpat.sscpat.models.inscriptiondocuments import InscriptionDocument
from sscpat.sscpat.models.inscriptioninitialdocuments import InscriptionInitialDocument

# Serializer
from sscpat.sscpat.api.serializers.inscriptiondocuments import InscriptionDocumentModelSerializer
from sscpat.sscpat.api.serializers.file import SerializerFileUpload

# Utils
from sscpat.sscpat.utils import viewsets, mixins

class InscriptionDocumentViewSet( mixins.UpdateModelMixin,
                           mixins.DestroyModelMixin,
                                mixins.RetrieveModelMixin,
                           viewsets.GenericViewSet):
    """Inscription ViewSet"""
    queryset = InscriptionDocument.objects.filter(active=True)
    serializer_class =  InscriptionDocumentModelSerializer

    # def update(self, request, *args, **kwargs):
    #     partial = kwargs.pop('partial', False)
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, data=request.data, partial=partial)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_update(serializer)
    #
    #     if getattr(instance, '_prefetched_objects_cache', None):
    #         # If 'prefetch_related' has been applied to a queryset, we need to
    #         # forcibly invalidate the prefetch cache on the instance.
    #         instance._prefetched_objects_cache = {}
    #
    #     return Response(serializer.data)
    #
    # def perform_update(self, serializer):
    #     serializer.save()

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






