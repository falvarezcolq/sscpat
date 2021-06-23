"""Document model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel

class Document(SSCPATModel):

    """Document models.
    list academic projects
    """
    ANY_MOMENT = -2
    AT_THE_END = -1
    AT_THE_BEGINNING = 0
    STATE = [
        (ANY_MOMENT, _("Any moment")),
        (AT_THE_END, _("At the end")),
        (AT_THE_BEGINNING, _("At the beginning")),
    ]

    title = models.CharField(_("title"),max_length=255 )
    description = models.TextField(_("description"),blank=True,default="")
    time_send = models.IntegerField(_("time_send"),default=ANY_MOMENT)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ("title", "-created_at")