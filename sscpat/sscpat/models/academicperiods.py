"""AcademicPeriod model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel

class AcademicPeriod(SSCPATModel):

    """Academic Project models.
    list academic projects
    """
    title = models.CharField(_("title"),max_length=255)
    year = models.CharField(_("year"),max_length=4,blank=True,default="")
    semester = models.PositiveIntegerField(_("semester"), default=1)
    date_init = models.DateField(_("Date initial"))
    date_end = models.DateField(_("Date end"))

    def __str__(self):
        return self.title