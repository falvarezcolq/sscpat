
# Django
from django.utils.translation import ugettext_lazy as _

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
    SerializerMethodField,
)

# models
from sscpat.sscpat.models import Tutor,Inscription,TracingProgress,TracingStudent
from rest_framework.exceptions import ValidationError
# Serializers
from sscpat.sscpat.api.serializers.inscriptions import InscriptionShortDetailModelSerializer
from sscpat.sscpat.api.serializers.tracingstudent import TracingStudentShortDetailModelSerializer



class TutorDelayProjectsSerializer(ModelSerializer):


    pending_reviews = SerializerMethodField()
    delay_project = SerializerMethodField()

    def get_pending_reviews(self,tutor):

        projects=tutor.tutor_projects.filter(active=True, state=Inscription.UNDER_DEVELOPMENT)
        under_development = projects.count()
        progress = 0
        review = 0
        pending_review = 0

        for project in projects:
            progress = progress + project.tracingstudents.filter(active=True).count()
            review = review + project.tracingstudents.filter(active=True,reviewed_by_tutor = True).count()

        data ={
            "under_development":under_development,
            "progress":progress,
            "review":review,
            "pending_review":pending_review,
        }
        return data

    def get_delay_project(self,tutor):
        projects = tutor.tutor_projects.filter(active=True, state=Inscription.UNDER_DEVELOPMENT)

        max_day = 0
        delay_proyect = None
        delay_tracingstudent = None

        for project in projects:
            for tracingstudent in project.tracingstudents.filter(active=True, reviewed_by_tutor=False):
                day = tracingstudent.get_day_diff()
                if day > max_day:
                    delay_proyect = project
                    delay_tracingstudent = tracingstudent
                    max_day = day

        data = {
            "inscription":InscriptionShortDetailModelSerializer(delay_proyect).data if delay_proyect else None,
            "tracingstudent":TracingStudentShortDetailModelSerializer(delay_tracingstudent).data if delay_tracingstudent else None,
            "days":max_day,
        }

        return data


    class Meta:
        model = Tutor
        fields =[
            "id",
            "email",
            "first_name",
            "last_name",
            "last_name2",
            "abbreviation",
            "pending_reviews",
            "delay_project",
        ]