"""Academic Projects model."""
from django.db import models
from django.utils.translation import ugettext_lazy as _



# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel

class AcademicProject(SSCPATModel):
    """Academic Project models.
    list academis projects
    """
    name = models.CharField(_("name"),max_length=255,unique=True)
    description = models.CharField(_("description"),max_length=255,blank=True,default="")

    def __str__(self):
        return self.name
