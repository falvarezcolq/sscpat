"Info View "

#Django REST Framework
from rest_framework.views import APIView
from rest_framework.response import Response
# Serializer
from sscpat.sscpat.api.serializers.desktop import SomeInfoSerializer

#models

from sscpat.sscpat.models import Inscription,User,TracingProgress,TracingStudent

import json
from sscpat.taskapp.tasks import send_assign_project_to_student,send_welcome_email


class InfoView(APIView):

    def get_inscriptions(self):
        return Inscription.objects.filter(active=True).count()

    def get_tutors(self):
        return User.objects.filter(type__in=[User.EXTERNAL_TUTOR,User.TUTOR]).count()

    def get_tracing_students(self):
        return TracingStudent.objects.filter(active=True).count()

    def get_reviews_by_tutors(self):
        return TracingProgress.objects.filter(active=True, typetracing=TracingProgress.EXTERNAL_TUTOR).count() + \
               TracingProgress.objects.filter(active=True, typetracing=TracingProgress.EXTERNAL_TUTOR).count()

    def get(self,request):
        data={
            "inscriptions": self.get_inscriptions(),
            'tutor':self.get_tutors(),
            "tracing_student":self.get_tracing_students(),
            "reviews_by_tutors":self.get_reviews_by_tutors(),
        }
        return Response(data)




