"""User Serializer"""

# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
)

# models
from sscpat.sscpat.models import Student,Inscription

# Serializer
from sscpat.sscpat.api.serializers.inscriptions import InscriptionModelSerializer,InscriptionStatiticsModelSerializer



# utlis
# from datetime import timedelta

#tasks
# from sscpat.taskapp.tasks import send_welcome_email

class StudentModelSerializer(ModelSerializer):
    class Meta:
        model = Student
        # fields = ["username", "email", "name", "url"]
        fields =[
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "last_name2",
            "CI",
            "RU",
            "ID_TUTOR",
            "position",
            "academic_degree",
            "abbreviation",
            "phone",
            "telf",
            "created_at",
            "type",
    ]


class StudentListModelSerializer(ModelSerializer):

    current_project = SerializerMethodField()
    state_project = SerializerMethodField()
    progress_project = SerializerMethodField()
    total = SerializerMethodField()
    total_current = SerializerMethodField()

    def get_current_project(self,student):
        inscription = student.projects.filter(state=Inscription.UNDER_DEVELOPMENT).last()
        if inscription:
            return InscriptionStatiticsModelSerializer(inscription).data
        return None


    def get_state_project(self,student):
        return 0
    def get_progress_project(self,student):
        return 0
    def get_total(self,student):
        return student.projects.count()

    def get_total_current(self,obj):
        return 0


    class Meta:
        model = Student
        fields =[
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "last_name2",
            "CI",
            "RU",
            "ID_TUTOR",
            "position",
            "academic_degree",
            "abbreviation",
            "phone",
            "telf",
            "created_at",
            "type",

            "current_project",
            "state_project",
            "progress_project",
            "total",
            "total_current",
        ]


class StudentMinimalListModelSerializer(ModelSerializer):

    class Meta:
        model = Student
        fields = [
            "id",
            "first_name",
            "last_name",
            "last_name2",
            "CI",
            "RU",
        ]









