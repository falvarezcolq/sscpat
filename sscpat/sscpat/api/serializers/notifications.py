"""Notifications Serializer"""
# Django


# Django REST Framework
from rest_framework.serializers import ModelSerializer

# Models
from sscpat.sscpat.models import Notification

from .users import UserShortDetailSerializer
from .inscriptions import InscriptionShortDetailModelSerializer
from .tracingstudent import TracingStudentShortDetailModelSerializer
from .tracingprogress import TracingProgressShortDetailModelSerializer

class NotificationModelSerializer( ModelSerializer):

    user = UserShortDetailSerializer(many=False)
    user_action = UserShortDetailSerializer(many=False)
    inscription = InscriptionShortDetailModelSerializer(many=False)
    tracing_student = TracingStudentShortDetailModelSerializer(many=False)
    tracing_progress = TracingProgressShortDetailModelSerializer(many=False)

    class Meta:
        model = Notification
        fields = [
            "id",
            "user",
            "user_action",
            "format",
            "inscription",
            "tracing_student",
            "tracing_progress",
            "is_read",
            "created_at",
        ]
