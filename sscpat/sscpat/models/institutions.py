
"""Institution model."""

from django.db import models
from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import SSCPATModel




class Institution(SSCPATModel):

    """
    Institution models.
    list type institutions.
    """

    name = models.CharField( _("name"), max_length=255)
    responsable = models.CharField( _("responsable"), blank=True,max_length=255,default="")
    phone = models.CharField(_("phone"), blank=True, max_length=255, default="")
    address = models.CharField(_("address"), blank=True, max_length=255, default="")

    def __str__(self):
        return self.name