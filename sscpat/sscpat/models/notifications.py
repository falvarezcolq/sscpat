"""Notification model."""

from django.db import models

from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import  SSCPATModel

from .users import User
from . import (
    Document,
    InscriptionDocument,
    Inscription,
    TracingStudent,
    TracingProgress
)
from .notificationtype import NotificationType


class Notification(SSCPATModel):
    NOTHING = "0"
    ACCOUNT_CREATED = "1"
    ACCOUNT_ADD = "2"
    WELCOME = "3"
    PROJECT_ASSIGNED = "4"
    PROJECT_ASSIGNED_TO_TUTOR = "5"
    PROGRESS_PROJECT_UPLOADED = "6"
    TRACING_PROGRESS_UPLOADED = "7"
    INSTITUTION_REPORT_UPLOADED = "8"

    TYPE_NOTIFICATION = [
        (NOTHING,_("No thing")),
        (ACCOUNT_CREATED,_("Account created")),
        (ACCOUNT_ADD,_("Account add")),
        (WELCOME,_("Welcome")),
        (PROJECT_ASSIGNED,_("Project assigned")),
        (PROGRESS_PROJECT_UPLOADED,_("progress uploaded")),
        (TRACING_PROGRESS_UPLOADED,_("review progress uploaded")),
        (INSTITUTION_REPORT_UPLOADED,_("Institution report uploaded")),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Usuario",related_name="notifications")
    user_action = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Usuario Accionador", related_name='notifications_actions',null=True,default=None)
    inscription_document = models.ForeignKey(InscriptionDocument, on_delete=models.CASCADE, verbose_name="inscription_document", null=True)
    inscription = models.ForeignKey(Inscription, on_delete=models.CASCADE, verbose_name="inscription", null=True)
    tracing_student = models.ForeignKey(TracingStudent,on_delete=models.CASCADE,verbose_name="tracing_student",null=True)
    tracing_progress = models.ForeignKey(TracingProgress,on_delete=models.CASCADE,verbose_name="tracing_progress",null=True)

    format = models.CharField(max_length=2, choices=TYPE_NOTIFICATION, verbose_name="Type", default=NOTHING)
    is_read = models.BooleanField(default=False)


    # manager = NotificationManager()
    class Meta:
        verbose_name = "Notification"
        verbose_name_plural = "Notifications"

    def __str__(self):
        return "user: %s, user actions:  %s" % (self.user, self.user_action, )