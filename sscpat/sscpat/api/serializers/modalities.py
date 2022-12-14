"""Academic Period Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
    CharField,
    BooleanField,
    IntegerField,
    SerializerMethodField
)

from rest_framework import serializers
# serializers
from sscpat.sscpat.api.serializers.modalityconfig import ModalityConfigModelSerializer
from sscpat.sscpat.api.serializers.documents import DocumentModelSerializer
from sscpat.sscpat.api.serializers.normatives import NormativeModelSerializer


# models
from sscpat.sscpat.models import Modality,ModalityConfig
from rest_framework.exceptions import ValidationError

# utlis
from datetime import timedelta



class ModalityModelSerializer(ModelSerializer):

    class Meta:
        model = Modality
        fields =[
            "id",
            "title",
            "description",
            "created_at",
            "general_modality",
    ]

class ModalityModelCompleteSerializer(ModelSerializer):


    documents = DocumentModelSerializer(many=True)
    document_inscription = DocumentModelSerializer(many=True)
    document_student = DocumentModelSerializer(many=True)

    config = ModalityConfigModelSerializer(many=False)
    # normatives = NormativeModelSerializer(many=True)
    normatives = SerializerMethodField()
    general_modality_name = SerializerMethodField()

    def get_normatives(self,modality):
        return NormativeModelSerializer(modality.normatives.filter(active=True),many=True).data
    def get_general_modality_name(self,modality):
        return ""
        # return Modality.TYPE_MODALITIES[modality.general_modality]

    class Meta:
        model = Modality
        fields =[
            "id",
            "title",
            "description",
            "created_at",
            "documents",
            "document_inscription",
            "document_student",
            "general_modality",
            "normatives",
            "config",
            "general_modality_name",
        ]


class ModalityModelConfigSerializer(ModelSerializer):

    config = ModalityConfigModelSerializer(many=False)

    class Meta:
        model = Modality
        fields =[
            "id",
            "title",
            "description",
            "created_at",
            "config",
            "general_modality",
    ]
