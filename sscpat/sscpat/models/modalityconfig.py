"""ModalityConfig model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel

# models
from .modalities import Modality


class ModalityConfig(SSCPATModel):

    """ModalityConfig models.
    is a config for Modality

    list academic projects
    """
    # for
    modality = models.OneToOneField(Modality,on_delete=models.CASCADE,verbose_name="modalityconfig",related_name="config")

    # charasteristic of modality
    max_author = models.PositiveIntegerField(_("max author"),default=1)
    month_duration = models.PositiveIntegerField(_("month_duration"),default=6)
    month_max_duration = models.PositiveIntegerField(_("month_doration"),default=6)
    has_time_extension = models.BooleanField(_("Has extention time"), default=False)
    month_extension = models.PositiveIntegerField(_("month extension"), default=0)

    # Implicated
    has_tutors = models.BooleanField(_("has tutors"), default=True);
    has_institution =  models.BooleanField(_("has institution"), default=False);

    # Inscription requirements
    mandatory_month_report_progress_student = models.BooleanField(default=True)
    frequency_report_student =  models.PositiveIntegerField(default=1)
    mandatory_month_report_tutor = models.BooleanField(default=False)
    frequency_report_tutor =  models.PositiveIntegerField(default=1)
    mandatory_month_report_external_tutor =  models.BooleanField(default=False)
    frequency_report_external_tutor =  models.PositiveIntegerField(default=1)
    mandatory_month_report_institution =  models.BooleanField(default=False)
    frequency_report_institution =  models.PositiveIntegerField(default=1)

    # Finalization requirements
    send_final_document = models.BooleanField(default=False)
    send_abstract_final_document = models.BooleanField(default=False)
    send_resolution_commission_aproval = models.BooleanField(default=False)







    def __str__(self):
        return "config of %s" % self.modality.title