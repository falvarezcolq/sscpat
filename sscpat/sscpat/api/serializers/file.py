"""File Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    FileField
)

# models
from sscpat.sscpat.models import File
from rest_framework.exceptions import ValidationError

# utlis
from datetime import timedelta

import filetype

class FileModelSerializer(ModelSerializer):

    class Meta:
        model = File
        fields =[
            "id",
            "title",
            "format",
            "size",
            "path",
            "img_medium",
            "thumbnail",
    ]


class SerializerFileUpload(Serializer):

    file = FileField()


    def create(self, data):
        """Create new File."""

        file = data['file']
        kind = filetype.guess(file)
        newFile = File.objects.create(
            title=file.name,
            format=kind.mime,
            size=file.size,
            path=file,
        )

        return newFile


