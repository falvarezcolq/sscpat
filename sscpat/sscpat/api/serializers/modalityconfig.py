"""Academic Period Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
)

# models
from sscpat.sscpat.models import ModalityConfig
from rest_framework.exceptions import ValidationError

# utlis
from datetime import timedelta



class ModalityConfigModelSerializer(ModelSerializer):

    class Meta:
        model = ModalityConfig
        fields =[
          # "modality",
          "max_author",
          "month_duration",
          "month_max_duration",
          "has_time_extension",
          "month_extension",
          "has_tutors",
          "has_review_commission",
          "has_evaluating_court",
          "has_institution",
          "mandatory_month_report_progress_student",
          "frequency_report_student",
          "mandatory_month_report_tutor",
          "frequency_report_tutor",
          "mandatory_month_report_external_tutor",
          "frequency_report_external_tutor",
          "mandatory_month_report_institution",
          "frequency_report_institution",
          "send_final_document",
          "send_abstract_final_document",
          "send_resolution_commission_aproval",
    ]

