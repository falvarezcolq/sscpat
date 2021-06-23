"""ModalityPeriod model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel
from .academicperiods import AcademicPeriod
from .modalities import Modality

class ModalityPeriod(SSCPATModel):

    """Modality Period models.
    Academic projects
    """
    modality = models.ForeignKey(Modality,on_delete=models.CASCADE)
    academicperiod = models.ForeignKey(AcademicPeriod,on_delete=models.CASCADE)
    fileconvocatory = models.FileField(_("file convocatory"),null=True,max_length=255,upload_to="convocatory/")

    def __str__(self):
        return self.name