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
    SerializerMethodField,
)

from rest_framework import serializers

# serializers
# from sscpat.sscpat.api.serializers.students import StudentModelSerializer
from sscpat.sscpat.api.serializers.institutions import InstitutionModelSerializer
from sscpat.sscpat.api.serializers.tutors import TutorMinimalListModelSerializer
from sscpat.sscpat.api.serializers.users import  UserModelSerializer,UserShortDetailSerializer
from sscpat.sscpat.api.serializers.modalities import ModalityModelSerializer,ModalityModelConfigSerializer
from sscpat.sscpat.api.serializers.academicperiods import AcademicPeriodModelSerializer



# models
from sscpat.sscpat.models import Inscription,DateLog
from rest_framework.exceptions import ValidationError

# utlis
from datetime import timedelta



class InscriptionModelSerializer(ModelSerializer):

    # institution = InstitutionModelSerializer(many=False)

    class Meta:
        model = Inscription
        fields =[
            "id",
            "student",
            "modality",
            "academic_period",
            "state",
            "tutors",
            "external_tutors",
            "institution",
            "title_academic_project",
            "description_project",
            "date_init",
            "date_end",
            "date_end_old",
            "extended",
            "month_duration",
            "month_max_duration",
            "has_time_extension",
            "month_extension",
            "created_at",
            ]

        read_only_fields=[
            "tutors",
            "external_tutors",
        ]


    def create(self, validated_data):
        config = validated_data['modality'].config
        validated_data['month_duration'] = config.month_duration
        validated_data['month_max_duration'] = config.month_max_duration
        validated_data['has_time_extension'] = config.has_time_extension
        validated_data['month_extension'] = config.month_extension
        instance = Inscription.objects.create(**validated_data)
        instance.authors.add(validated_data['student'])
        instance.save()
        return instance;






class InscriptionCompleteModelSerializer(ModelSerializer):


    student = UserModelSerializer(many=False)
    tutors = TutorMinimalListModelSerializer(many=True)
    external_tutors = TutorMinimalListModelSerializer(many=True)
    institution = InstitutionModelSerializer(many=False)
    modality = ModalityModelConfigSerializer(many=False)
    academic_period = AcademicPeriodModelSerializer(many=False)
    progress = SerializerMethodField()
    authors = UserShortDetailSerializer(many=True)

    def get_progress(self,obj):
        return obj.tracingstudents.filter(active=True).count()

    class Meta:
        model = Inscription
        fields =[
            "id",
            "student",
            "authors",
            "modality",
            "academic_period",
            "state",
            "tutors",
            "external_tutors",
            "institution",
            "title_academic_project",
            "description_project",
            "date_init",
            "date_end",
            "date_end_old",
            "extended",
            "created_at",
            "progress",
    ]




class InscriptionModelSerializerForTutor(ModelSerializer):


    student = UserModelSerializer(many=False)
    authors = UserShortDetailSerializer(many=True)
    tutors = TutorMinimalListModelSerializer(many=True)
    external_tutors = TutorMinimalListModelSerializer(many=True)
    institution = InstitutionModelSerializer(many=False)
    modality = ModalityModelSerializer(many=False)
    academic_period = AcademicPeriodModelSerializer(many=False)
    progress = SerializerMethodField()
    without_review = SerializerMethodField()
    without_review_by_etutor = SerializerMethodField()

    def get_progress(self,obj):
        return obj.tracingstudents.filter(active=True).count()

    def get_without_review(self,obj):
        return obj.tracingstudents.filter(active=True,require_tutor_review=True,reviewed_by_tutor=False).count()

    def get_without_review_by_etutor(self, obj):
        return obj.tracingstudents.filter(active=True, require_external_tutor_review=True, reviewed_by_external_tutor=False).count()

    class Meta:
        model = Inscription
        fields =[
            "id",
            "student",
            "authors",
            "modality",
            "academic_period",
            "state",
            "tutors",
            "external_tutors",
            "institution",
            "title_academic_project",
            "description_project",
            "date_init",
            "date_end",
            "date_end_old",
            "extended",
            "created_at",
            "progress",
            "without_review",
            "without_review_by_etutor",
    ]



class InscriptionModelSerializerForStudent(ModelSerializer):

    student = UserModelSerializer(many=False)
    tutors = TutorMinimalListModelSerializer(many=True)
    external_tutors = TutorMinimalListModelSerializer(many=True)
    institution = InstitutionModelSerializer(many=False)
    modality = ModalityModelSerializer(many=False)
    academic_period = AcademicPeriodModelSerializer(many=False)
    progress = SerializerMethodField()
    without_review = SerializerMethodField()
    without_report_institution = SerializerMethodField()

    def get_progress(self,obj):
        return obj.tracingstudents.filter(active=True).count()

    def get_without_review(self,obj):
        return obj.tracingstudents.filter(active=True,require_tutor_review=True,reviewed_by_tutor=False).count()

    def get_without_report_institution(self,obj):
        return obj.tracingstudents.filter(active=True,require_institution_report=True,institution_report_was_sent=False).count()

    class Meta:
        model = Inscription
        fields =[
            "id",
            "student",
            "modality",
            "academic_period",
            "state",
            "tutors",
            "external_tutors",
            "institution",
            "title_academic_project",
            "description_project",
            "date_init",
            "date_end",
            "date_end_old",
            "extended",
            "created_at",
            "progress",
            "without_review",
            "without_report_institution",
    ]



class InscriptionStatiticsModelSerializer(ModelSerializer):
    # institution = InstitutionModelSerializer(many=False)
    progress = SerializerMethodField()

    def get_progress(self,obj):
        return obj.tracingstudents.filter(active=True).count()

    class Meta:
        model = Inscription
        fields = [
            "id",
            "modality",
            "academic_period",
            "tutors",
            "external_tutors",
            "institution",
            "title_academic_project",
            "description_project",
            "date_init",
            "date_end",
            "date_end_old",
            "extended",
            "created_at",
            "progress"
        ]

class InscriptionShortDetailModelSerializer(ModelSerializer):
    # institution = InstitutionModelSerializer(many=False)
    class Meta:
        model = Inscription
        fields = [
            "id",
            "title_academic_project",
        ]



class InscriptionDatelogSerializer(ModelSerializer):
    # institution = InstitutionModelSerializer(many=False)
    class Meta:
        model = DateLog
        fields = [
            "date_init",
            "date_end",
            # "date_init_old"
            # "date_end_old"
           
            "note",
            # "title"
            # "format"
            # "path"
            # "img_medium"
            # "thumbnail"
        ]