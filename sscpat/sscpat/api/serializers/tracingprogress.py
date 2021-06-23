"""Academic Period Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
    ValidationError,
    ListField,
    FileField,
    SerializerMethodField

)
from rest_framework import serializers


# models
from sscpat.sscpat.models import TracingProgress
from sscpat.sscpat.models import TracingProgress,User
# Serializers
from sscpat.sscpat.api.serializers.users import UserShortDetailSerializer
from sscpat.sscpat.api.serializers.institutions import InstitutionModelSerializer
from sscpat.sscpat.api.serializers.tracingprogressfile import TracingProgressFileModelSerializer



# utlis
from datetime import timedelta



class TracingProgressModelSerializer(ModelSerializer):


    # user = UserShortDetailSerializer(many=False)


    class Meta:
        model = TracingProgress
        fields =[
            "id",
            "tracingstudent",
            "user",
            "institution",
            "typetracing",
            "description",
            "created_at",
            ]

        read_only_fields = [
            "user",
            "created_at",
        ]

    def validate_inscription(self,data):
        """verify if inscription is correct"""

        tracingstudent = self.context['view'].tracingstudent
        if tracingstudent != data:
            raise ValidationError(_("the inscription project is not valid"))
        return data

    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs

    # def create(self, data):
    #     tracing = TracingProgress.objects.create(**data)
    #     return tracing






class TracingProgressCompleteModelSerializer(ModelSerializer):

    # files = TracingProgressFileModelSerializer(many=True)
    user = UserShortDetailSerializer(many=False)
    institution = InstitutionModelSerializer(many=False)
    files = TracingProgressFileModelSerializer(many=True)


    class Meta:
        model = TracingProgress
        fields = [
            "id",
            "tracingstudent",
            "user",
            "institution",
            "typetracing",
            "description",
            "created_at",
            "files",
        ]

class TracingProgressShortDetailModelSerializer(ModelSerializer):

    # files = TracingProgressFileModelSerializer(many=True)
    # user = UserShortDetailSerializer(many=False)
    # institution = InstitutionModelSerializer(many=False)
    # files = TracingProgressFileModelSerializer(many=True)


    class Meta:
        model = TracingProgress
        fields = [
            "id",
            "typetracing",
            "description",
            "created_at",
            "files",
        ]
