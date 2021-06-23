"""TracingProgress model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel

from .tracingstudent import TracingStudent
from .users import User
from .institutions import Institution



class TracingProgress(SSCPATModel):

    """Academic Project models.

    list academic projects.
    """
    ADMIN = "ADMIN"
    INTERNAL_TUTOR = "INTERNAL_TUTOR"
    EXTERNAL_TUTOR = "EXTERNAL_TUTOR"
    INSTITUTION_REPORT = "INSTITUTION_REPORT"
    COMMENT = "COMMENT"

    TYPE = [
        (ADMIN,_("Admin")),
        (INTERNAL_TUTOR, _("Tutor")),
        (EXTERNAL_TUTOR, _("External tutor")),
        (INSTITUTION_REPORT, _("institution report")),
        (COMMENT, _("Comment")),
    ]

    tracingstudent = models.ForeignKey(TracingStudent, on_delete=models.CASCADE, verbose_name="tracingstudent", related_name="tracingprogress")
    user = models.ForeignKey( User, on_delete=models.SET_NULL,null=True)
    institution = models.ForeignKey( Institution, on_delete=models.SET_NULL,null=True)
    typetracing = models.CharField(_("type"),max_length=20,choices=TYPE,null=True,default=COMMENT)
    description = models.TextField(_("description"),blank=True, default="")

    def __str__(self):
        return " %s :  %s %s" % (self.tracingstudent.description, self.user.username, self.description)