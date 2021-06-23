"""InscriptionTutor model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel
from .users import User
from .inscriptions import  Inscription

class InscriptionTutor(SSCPATModel):

    """IncriptionTutor
    Inscription student relacionated with tutors
    """
    INTERNAL_TUTOR = "INTERNAL_TUTOR"
    EXTERNAL_TUTOR = "EXTERNAL_TUTOR"

    TYPE_TUTOR = [
        (INTERNAL_TUTOR, _("Internal tutor")),
        (EXTERNAL_TUTOR, _("External tutor")),
    ]

    tutor = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="tutor")
    inscription = models.ForeignKey(Inscription, on_delete=models.CASCADE, verbose_name="inscriptions")
    type = models.CharField(_("type tutor"), max_length=16, choices=TYPE_TUTOR, default=INTERNAL_TUTOR)

    def __str__(self):
        return self.name