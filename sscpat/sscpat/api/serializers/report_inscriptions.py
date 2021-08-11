
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
from sscpat.sscpat.api.serializers.users import UserModelSerializer
from sscpat.sscpat.api.serializers.academicperiods import AcademicPeriodModelSerializer
from sscpat.sscpat.api.serializers.modalities import ModalityModelSerializer
from sscpat.sscpat.utils.helper import get_date_months

from datetime import datetime,date

class InscriptionReportModelSerializer(ModelSerializer):

    student = UserModelSerializer(many=False)
    modality = ModalityModelSerializer(many=False)
    academic_period = AcademicPeriodModelSerializer(many=False)
    report = SerializerMethodField()

    def get_report(self,obj):
        tracingstudents =   obj.tracingstudents.filter(active=True)
        progress = tracingstudents.count()
        range = get_date_months(obj.date_init,obj.date_end)


        tracing_months_validate = [d for d in range if d < date.today() ]

        tracing_months = []
        for tracingstudent in tracingstudents:
            if tracingstudent.date_month in tracing_months_validate:
                if tracingstudent.date_month not in tracing_months:
                    tracing_months.append(tracingstudent.date_month)


        data = {
            "progress":progress,
            "range": range,
            "tracing_months_validate":tracing_months_validate,
            "tracing_months":tracing_months,
            "tracing_months_not_sent":[d for d in tracing_months_validate if d not in tracing_months],
        }
        return data




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
            "report",
        ]