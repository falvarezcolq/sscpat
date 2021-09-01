"""Datelog model for inscriptions."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel
from sscpat.sscpat.models.inscriptions import Inscription

class DateLog(SSCPATModel):

    """
    """


    inscription = models.ForeignKey( Inscription , on_delete=models.CASCADE,related_name="datelogs" )

    date_init = models.DateField(_("date initial"))
    date_end = models.DateField(_("date finalization"))
    date_init_old = models.DateField(_("date initial old"))
    date_end_old = models.DateField(_("date finalization old"))

    #file
    note = models.CharField(_("note"),max_length=255,blank=True,default="")

    title = models.CharField(_("title") ,max_length=255,blank=True,default="")
    format = models.CharField(_("format"),max_length=32)
    path =  models.FileField(_("file path"),upload_to="tracing_progress_file/")
    img_medium = models.FileField("Image Medium", max_length=255, null=True, default=None, upload_to="tracing_progress_file/image_medium")
    thumbnail = models.FileField("Image Small", max_length=255, null=True, default=None, upload_to="tracing_progress_file/thumbnail")


    def __str__(self):
        return self.title

    class Meta:
        ordering = ("title", "created_at")