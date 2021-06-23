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
from sscpat.sscpat.models import TracingStudent
from sscpat.sscpat.models import TracingStudent,User
# Serializers
from sscpat.sscpat.api.serializers.users import UserShortDetailSerializer
from sscpat.sscpat.api.serializers.inscriptions import InscriptionCompleteModelSerializer
from sscpat.sscpat.api.serializers.tracingstudentfile import TracingStudentFileModelSerializer
from sscpat.sscpat.api.serializers.tracingprogress import  TracingProgressCompleteModelSerializer



# utlis
from datetime import timedelta




class TracingStudentReportModelSerializer(ModelSerializer):

    files = TracingStudentFileModelSerializer(many=True)
    created_by = SerializerMethodField()
    tracingprogress = TracingProgressCompleteModelSerializer(many=True)

    class Meta:
        model = TracingStudent
        fields =[
            "id",
            "inscription",
            "description",
            "number",
            "month",
            "is_final_document",
            "require_tutor_review",
            "reviewed_by_tutor",
            "require_external_tutor_review",
            "reviewed_by_external_tutor",
            "require_admin_review",
            "reviewed_by_admin",
            "require_institution_report",
            "institution_report_was_sent",
            "files",
            "tracingprogress",
            "created_at",
            "created_by",

            ]



    def get_created_by(self, obj):
        if not obj.created_by:
            return None
        try:
            user = User.objects.get(id=obj.created_by, active=True)
            return UserShortDetailSerializer(user).data
        except User.DoesNotExist:
            pass
        return None
