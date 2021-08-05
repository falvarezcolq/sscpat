
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



class InscriptionCompleteModelSerializer(ModelSerializer):


    student = UserModelSerializer(many=False)
    modality = ModalityModelSerializer(many=alse)
    academic_period = AcademicPeriodModelSerializer(many=False)

    progress = SerializerMethodField()

    def get_progress(self,obj):
        tracing_student = obj.tracingstudents.filter(active=True).count()




    class Meta:
        model = Inscription
        fields =[
            "id",
            "student",
            "modality",
            "academic_period",
            "state",
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