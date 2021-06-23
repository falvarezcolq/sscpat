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
from sscpat.sscpat.models import Tutor,Inscription,TracingProgress,TracingStudent
from rest_framework.exceptions import ValidationError

# jwt
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework_simplejwt.tokens import RefreshToken
# utlis
from datetime import timedelta
#tasks
from sscpat.taskapp.tasks import send_welcome_email

class TutorModelSerializer(ModelSerializer):
    class Meta:
        model = Tutor
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




class TutorListSerializer(ModelSerializer):

    complete = SerializerMethodField()
    under_development = SerializerMethodField()
    abandoned = SerializerMethodField()
    total = SerializerMethodField()

    pending_reviews = SerializerMethodField()

    def get_complete(self,tutor):
        return tutor.tutor_projects.filter(active=True,state=Inscription.CONCLUDED_SUCCESSFULLY).count()
    def get_under_development(self,tutor):
        return tutor.tutor_projects.filter(active=True,state=Inscription.UNDER_DEVELOPMENT).count()
    def get_abandoned(self,tutor):
        return tutor.tutor_projects.filter(active=True,state=Inscription.ABANDONED).count()

    def get_total(self,tutor):
        return tutor.tutor_projects.filter(active=True).count()

    def get_pending_reviews(self,tutor):

        projects=tutor.tutor_projects.filter(active=True, state=Inscription.UNDER_DEVELOPMENT)
        pending_review = 0

        for project in projects:

            last_tracingstudent = project.tracingstudents.filter(active=True).order_by("-pk").first()

            if last_tracingstudent:
                if last_tracingstudent.tracingprogress.filter(active=True, user=tutor ).count() == 0:
                    pending_review = pending_review + 1



        return pending_review



    class Meta:
        model = Tutor
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
            "complete",
            "under_development",
            "abandoned",
            "total",
            "pending_reviews",
    ]






class TutorMinimalListModelSerializer(ModelSerializer):
    class Meta:
        model = Tutor
        fields =[
            "id",
            "first_name",
            "last_name",
            "last_name2",
            "academic_degree",
            "abbreviation",
    ]






