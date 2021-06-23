"""Academic Period Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
)

# models
from sscpat.sscpat.models import Document
from rest_framework.exceptions import ValidationError

# utlis
from datetime import timedelta



class DocumentModelSerializer(ModelSerializer):

    class Meta:
        model = Document
        fields =[
            "id",
            "title",
            "description",
            "time_send",
            "created_at",
    ]

