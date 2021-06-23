"""Academic Period Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
)

# models
from sscpat.sscpat.models import Normative
from rest_framework.exceptions import ValidationError

# utlis
from datetime import timedelta



class NormativeModelSerializer(ModelSerializer):

    class Meta:
        model = Normative
        fields =[
            "id",
            "modality",
            "title",
            "format",
            "path",
    ]

