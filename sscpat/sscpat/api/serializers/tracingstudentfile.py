"""Academic Period Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
    ValidationError
)


# models
from sscpat.sscpat.models import TracingStudentFile,Inscription
from sscpat.sscpat.utils.choices.filetype import ARCHIVEMIME_CHOICES

# utlis
from datetime import timedelta

import filetype

class TracingStudentFileModelSerializer(ModelSerializer):



    class Meta:
        model = TracingStudentFile
        fields =[
            "id",
            "tracingstudent",
            "title",
            "format",
            "path",
            "img_medium",
            "thumbnail",
            ]

        read_only_fields = [
            "img_medium",
            "thumbnail",
        ]

    def validate_path(self,data):
        kind = filetype.guess(data)
        if kind is None:
            raise ValidationError(_("Cannot guess file type!"))

        import pdb;pdb.set_trace()
        if kind.mime not in (ARCHIVEMIME_CHOICES):  # RESTRINGIR A FORMATOS ACEPTADOS

            raise ValidationError(_("Not accepted type file it must be a pdf format!"))

        self.context['extension']= kind.extension
        self.context['format']=kind.mime

        return data

    def create(self, data):

        data['format'] = self.context['format']
        data['title'] = data['path'].name


        # data['path'].name="{}.{}".format("doc",self.context['extension'])

        return TracingStudentFile.objects.create(**data)
        # super(TracingStudentFile, self).save(*args, **kwargs)
