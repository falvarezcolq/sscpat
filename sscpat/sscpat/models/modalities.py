"""Modality model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.models.documents import Document
from sscpat.sscpat.utils.models import  SSCPATModel


class Modality(SSCPATModel):

    """Modality Project models.
    modality  projects
    """

    THESIS = "0"
    DEGREE_PROJECT = "1"
    DEGREE_EXAM ="2"
    WORK_DIRECTED= "3"
    EXCELLENCE = "4"
    OTHER = "6"

    TYPE_MODALITIES = [
        (THESIS, _("THESIS")),
        (DEGREE_PROJECT, _("DEGREE PROJECT")),
        (DEGREE_EXAM, _("DEGREE EXAM")),
        (WORK_DIRECTED, _("WORK DIRECTED")),
        (EXCELLENCE, _("EXCELLENCE")),
        (OTHER,_("OTHER")),
    ]
    title = models.CharField(_("title"),max_length=255,unique=True)
    description = models.CharField(_("description"),max_length=255,blank=True,default="")
    documents = models.ManyToManyField(Document,related_name="modalities")
    document_inscription = models.ManyToManyField(Document,related_name="modalities_document_inscription")
    document_student = models.ManyToManyField(Document,related_name="modalities_document_student")
    general_modality = models.CharField(max_length=2,choices=TYPE_MODALITIES,default=6)

    def __str__(self):
        return self.title

