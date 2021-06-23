"""Academic Period Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
)

# models
from sscpat.sscpat.models import InscriptionDocument,InscriptionInitialDocument
from rest_framework.exceptions import ValidationError

# serializers
from sscpat.sscpat.api.serializers.documents import DocumentModelSerializer
from sscpat.sscpat.api.serializers.file import FileModelSerializer
# utlis
from datetime import timedelta

class InscriptionDocumentModelSerializer(ModelSerializer):

    document = DocumentModelSerializer(many=False)
    file = FileModelSerializer(many=False)

    class Meta:
        model = InscriptionDocument
        fields =[
            "id",
            "inscription",
            "document",
            "file",
            "deadline_date",
            "reviewed",
            "reviewed_date",
            ]



class InscriptionInitialDocumentModelSerializer(ModelSerializer):

    document = DocumentModelSerializer(many=False)
    file = FileModelSerializer(many=False)

    class Meta:
        model = InscriptionInitialDocument
        fields =[
            "id",
            "inscription",
            "document",
            "file",
            "deadline_date",
            "reviewed",
            "reviewed_date",
            ]