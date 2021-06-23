"""Normative model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel

# models
from .modalities import Modality

class Normative(SSCPATModel):

    """Normative file models.
    """
    modality = models.ForeignKey(Modality,on_delete=models.CASCADE,verbose_name="modality",related_name="normatives")
    title = models.CharField(_("title"), max_length=255, blank=True, default="")
    format = models.CharField(_("format"), max_length=32)
    path = models.FileField(_("file path"), upload_to="modality_normative/")

    def __str__(self):
        return "file %s for modality: %s " % (self.title, self.modality.title)

