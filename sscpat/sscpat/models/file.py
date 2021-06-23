"""File model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel

from sscpat.sscpat.utils.choices.filetype import IMAGEMIME_CHOICES
from sscpat.sscpat.utils.image_helper import ImageHelper

from .tracingstudent import TracingStudent
import filetype


class File(SSCPATModel):

    """Academic Project models.
    list academic projects
    """

    title = models.CharField(_("title") ,max_length=255,blank=True,default="")
    format = models.CharField(_("format"),max_length=32)
    size = models.PositiveIntegerField(_("size"),default=0)
    path =  models.FileField(_("file path"),upload_to="tracing_student_file/images/")
    img_medium = models.FileField("Image Medium", max_length=255, null=True, default=None, upload_to="tracing_student_file/image_medium")
    thumbnail = models.FileField("Image Small", max_length=255, null=True, default=None, upload_to="tracing_student_file/thumbnail")

    def __str__(self):
        return  "file for: %s" % (self.tracingstudent.description)


    def save(self, *args, **kwargs):

        if self.pk is None:

            if self.format in (IMAGEMIME_CHOICES):
                imagesave = ImageHelper()

                self.path = imagesave.compressImage(self.path, 1280, 1280, 70)
                self.img_medium = imagesave.compressImage(self.path, 400, 400, 50)
                self.thumbnail = imagesave.compressImage(self.path, 100, 100, 50)
                self.format ="image/jpeg"


        return super(File, self).save(*args, **kwargs)