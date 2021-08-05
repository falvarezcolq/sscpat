"""TracingStudent model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import utc

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel

from .inscriptions import Inscription
from .documents import Document

import datetime


class TracingStudent(SSCPATModel):

    """Academic Project models.
    list academic projects
    """

    inscription = models.ForeignKey(Inscription, on_delete=models.CASCADE, verbose_name="inscription", related_name="tracingstudents")
    description = models.CharField(_("description"),max_length=255,blank=True,default="")
    number = models.IntegerField(_("progress number"),default=1)
    month = models.PositiveIntegerField(null=True)
    date_month = models.DateField(_("date uploaded"),null=True,)
    is_final_document = models.BooleanField(_("is final document"), default=False)
    require_tutor_review = models.BooleanField(default=False)
    reviewed_by_tutor = models.BooleanField(default=False)
    require_external_tutor_review = models.BooleanField(default=False)
    reviewed_by_external_tutor = models.BooleanField(default=False)
    require_admin_review = models.BooleanField(default=False)
    reviewed_by_admin = models.BooleanField(default=False)
    require_institution_report = models.BooleanField(default=False)
    institution_report_was_sent = models.BooleanField(default=False)


    def __str__(self):
        return " %s %s %s" % (self.inscription.title_academic_project,self.number, self.description)

    def get_day_diff(self):
        if self.created_at:
            now = datetime.datetime.utcnow().replace(tzinfo=utc)
            timediff = now - self.created_at
            return timediff.days