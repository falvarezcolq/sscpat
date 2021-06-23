"""Academic Period Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
)

# models
from sscpat.sscpat.models import AcademicPeriod
from rest_framework.exceptions import ValidationError

# utlis
from datetime import timedelta



class AcademicPeriodModelSerializer(ModelSerializer):

    class Meta:
        model = AcademicPeriod
        fields =[
            "id",
            "title",
            "year",
            "semester",
            "date_init",
            "date_end",
            "created_at",
    ]

