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



# utlis
from datetime import timedelta



class TracingStudentModelSerializer(ModelSerializer):

    # files = TracingStudentFileModelSerializer(many=True)
    created_by = SerializerMethodField()

    def get_created_by(self,obj):
        if not obj.created_by:
            return None
        try:
            user = User.objects.get(id=obj.created_by,active=True)
            return UserShortDetailSerializer(user).data
        except User.DoesNotExist:
            pass
        return None


    class Meta:
        model = TracingStudent
        fields =[
            "id",
            "inscription",
            "description",
            "number",
            "month",
            "date_month",
            "is_final_document",
            "require_tutor_review",
            "reviewed_by_tutor",
            "require_external_tutor_review",
            "reviewed_by_external_tutor",
            "require_admin_review",
            "reviewed_by_admin",
            "require_institution_report",
            "institution_report_was_sent",
            # "files",
            "created_at",
            "created_by"
            ]

        read_only_fields = [
            "require_tutor_review",
            "reviewed_by_tutor",
            "require_external_tutor_review",
            "reviewed_by_external_tutor",
            "require_admin_review",
            "reviewed_by_admin",
            "require_institution_report",
            "institution_report_was_sent",

            # "files",
            "created_at",
            "created_by"
        ]

    def validate_inscription(self,data):
        """verify if inscription is correct"""

        inscription = self.context['view'].inscription
        if inscription != data:
            raise ValidationError(_("the inscription project is not valid"))
        return data

    def create(self, data):
        data['created_by'] = self.context['request'].user.pk
        inscription = self.context['view'].inscription

        modality = inscription.modality
        config = modality.config
        number = TracingStudent.objects.filter(inscription=data["inscription"]).count()
        tracing = TracingStudent.objects.create(
                                                number=(number + 1),
                                                require_tutor_review=config.has_tutors,
                                                require_external_tutor_review=inscription.external_tutors.count()>0,
                                                require_admin_review=True,
                                                require_institution_report=config.has_institution,
                                                **data)
        return tracing





class TracingStudentWithFileModelSerializer(ModelSerializer):

    files = TracingStudentFileModelSerializer(many=True)
    created_by = SerializerMethodField()

    class Meta:
        model = TracingStudent
        fields =[
            "id",
            "inscription",
            "description",
            "number",
            "month",
            "date_month",
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
            "created_at",
            "created_by"
            ]

        read_only_fields = [
            "require_tutor_review",
            "reviewed_by_tutor",
            "require_external_tutor_review",
            "reviewed_by_external_tutor",
            "require_admin_review",
            "reviewed_by_admin",
            "require_institution_report",
            "institution_report_was_sent",
            "files",
            "created_at",
            "created_by"
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


class TracingStudentCompleteModelSerializer(ModelSerializer):

    files = TracingStudentFileModelSerializer(many=True)
    inscription = InscriptionCompleteModelSerializer(many=False)
    created_by = SerializerMethodField()
    class Meta:
        model = TracingStudent
        fields =[
            "id",
            "inscription",
            "description",
            "number",
            "month",
            "date_month",
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
            "created_at",
            "created_by"
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



class TracingStudentShortDetailModelSerializer(ModelSerializer):

    class Meta:
        model = TracingStudent
        fields =[
            "id",
            "description",
            "number",
            "month",
            "date_month",
            ]