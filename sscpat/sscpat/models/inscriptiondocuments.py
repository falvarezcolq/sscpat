"""InscriptionDocument model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel

from .inscriptions import Inscription
from .documents import Document
from .file import File


class InscriptionDocument(SSCPATModel):

    """Academic Project models.
    list academic projects
    """

    inscription = models.ForeignKey(Inscription, on_delete=models.CASCADE, verbose_name="inscriptions", related_name="documents")
    document = models.ForeignKey(Document, on_delete=models.CASCADE, verbose_name="documents")
    file = models.ForeignKey(File,on_delete=models.SET_NULL,null=True,default=None,verbose_name="file")
    deadline_date = models.DateField(null=True,default=None)
    reviewed = models.BooleanField(default=False)
    reviewed_date = models.DateField(null=True,default=None)

    def __str__(self):
        return self.name