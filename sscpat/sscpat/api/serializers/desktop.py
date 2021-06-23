""" Desktop serializer"""

#django


#Django REST Framework
from rest_framework.serializers import (
    SerializerMethodField,
    Serializer,
)
# Models
from sscpat.sscpat.models import Inscription,User,TracingStudent,TracingProgress

class SomeInfoSerializer(Serializer):

    inscriptions = SerializerMethodField()
    tutors = SerializerMethodField()
    tracing_students=  SerializerMethodField()
    reviews_by_tutors =  SerializerMethodField()

    def get_inscriptions(self):
        return Inscription.objects.count(active=True)

    def get_tutors(self):
        return User.objects.count(type=User.EXTERNAL_TUTOR)  +  User.objects.count(type=User.TUTOR)

    def get_tracing_students(self):
        return TracingStudent.objects.count(active=True)

    def get_reviews_by_tutors(self):
        return TracingProgress.objects.count(active=True,typetracing=TracingProgress.EXTERNAL_TUTOR) + \
               TracingProgress.objects.count(active=True,typetracing=TracingProgress.EXTERNAL_TUTOR)

