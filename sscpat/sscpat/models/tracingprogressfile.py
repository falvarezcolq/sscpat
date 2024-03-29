"""TracingStudentFile model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel

from sscpat.sscpat.utils.choices.filetype import IMAGEMIME_CHOICES
from sscpat.sscpat.utils.image_helper import ImageHelper

from .tracingprogress import TracingProgress
import filetype


class TracingProgressFile(SSCPATModel):

    """Academic Project models.
    list academic projects
    """

    tracingprogress = models.ForeignKey( TracingProgress, on_delete=models.CASCADE, verbose_name="tracingstundent" ,related_name="files")
    title = models.CharField(_("title") ,max_length=255,blank=True,default="")
    format = models.CharField(_("format"),max_length=32)
    path =  models.FileField(_("file path"),upload_to="tracing_progress_file/")
    img_medium = models.FileField("Image Medium", max_length=255, null=True, default=None, upload_to="tracing_progress_file/image_medium")
    thumbnail = models.FileField("Image Small", max_length=255, null=True, default=None, upload_to="tracing_progress_file/thumbnail")

    def __str__(self):
        return  "file for: %s" % (self.tracingprogress.description)


    def save(self, *args, **kwargs):

        if self.pk is None:
            if self.format in (IMAGEMIME_CHOICES):
                imagesave = ImageHelper()

                self.path = imagesave.compressImage(self.path, 1280, 1280, 70)
                self.img_medium = imagesave.compressImage(self.path, 400, 400, 50)
                self.thumbnail = imagesave.compressImage(self.path, 100, 100, 50)
                self.format ="image/jpeg"


        return super(TracingProgressFile, self).save(*args, **kwargs)