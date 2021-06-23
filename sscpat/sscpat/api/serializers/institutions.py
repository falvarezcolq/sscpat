"""Academic Period Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
)

# models
from sscpat.sscpat.models import Institution
from rest_framework.exceptions import ValidationError

# utlis
from datetime import timedelta



class InstitutionModelSerializer(ModelSerializer):

    class Meta:
        model = Institution
        fields =[
            "id",
            "name",
            "responsable",
            "phone",
            "address",
            "created_at",
    ]

