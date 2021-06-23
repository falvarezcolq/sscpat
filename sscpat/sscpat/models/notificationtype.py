"""NotificationType model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import SSCPATModel

from .tracingprogress import TracingProgress


class NotificationType(SSCPATModel):
    """Academic Project models.
    list academic projects
    """

    title = models.CharField(_("title"), max_length=255)
    message_format = models.CharField(_("message"), max_length=1024)

    def __str__(self):
        return self.name