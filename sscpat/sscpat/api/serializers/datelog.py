"""Academic Period Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField
)

# models
from sscpat.sscpat.models import DateLog,User
from rest_framework.exceptions import ValidationError

# utlis
from datetime import timedelta

# Serializer
from sscpat.sscpat.api.serializers.users import UserShortDetailSerializer


class DateLogModelSerializer(ModelSerializer):

    created_by = SerializerMethodField()

    def get_created_by(self,obj):
        try:
            return UserShortDetailSerializer(User.objects.get(id=obj.created_by)).data
        except User.DoesNotExist:
            return None
    class Meta:
        model = DateLog
        fields =[
           "id",
            "date_init",
            "date_end",
            "date_init_old",
            "date_end_old",
            "note",
            "title",
            "format",
            "path",
            "img_medium",
            "thumbnail",
            "created_by",
            "created_at",
    ]


