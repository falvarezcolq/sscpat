"""Modality model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.models.documents import Document
from sscpat.sscpat.utils.models import  SSCPATModel


class Modality(SSCPATModel):

    """Academic Project models.
    list academic projects
    """
    title = models.CharField(_("title"),max_length=255,unique=True)
    description = models.CharField(_("description"),max_length=255,blank=True,default="")
    documents = models.ManyToManyField(Document,related_name="modalities")
    document_inscription = models.ManyToManyField(Document,related_name="modalities_document_inscription")

    def __str__(self):
        return self.title