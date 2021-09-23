"""Inscription model."""

from django.db import models
from django.utils.translation import ugettext_lazy as _

# Utilities
from sscpat.sscpat.utils.models import SSCPATModel
from .users import Student,Tutor,ExternalTutor
from .modalities import Modality
from .institutions import Institution
from .academicperiods import AcademicPeriod


class Inscription(SSCPATModel):

    """
    Inscription models.
    list type institutions.
    """

    UNDER_DEVELOPMENT = "UNDER_DEVELOPMENT"
    CONCLUDED_SUCCESSFULLY = "CONCLUDED_SUCCESSFULLY"
    ABANDONED = "ABANDONED"

    STATE = [
        (UNDER_DEVELOPMENT, _("under development ")),
        (CONCLUDED_SUCCESSFULLY, _("Tutor")),
        (ABANDONED, _("external_tutor")),
    ]

    student =  models.ForeignKey( Student, on_delete=models.CASCADE, verbose_name="students",related_name="projects")
    modality = models.ForeignKey( Modality, on_delete=models.CASCADE, verbose_name="inscriptions", related_name="projects" )
    academic_period = models.ForeignKey( AcademicPeriod,on_delete=models.SET_NULL,null=True,related_name="projects")
    institution = models.ForeignKey( Institution, on_delete=models.SET_NULL, null=True,related_name="projects")
    state = models.CharField(_("state"),max_length=32,choices=STATE,default=UNDER_DEVELOPMENT)

    tutors = models.ManyToManyField(Tutor,related_name="tutor_projects")
    external_tutors = models.ManyToManyField(ExternalTutor,related_name="etutor_projects")
    tutors_review_commission = models.ManyToManyField(Tutor, related_name="projects_review")
    tutors_evaluating_court = models.ManyToManyField(Tutor, related_name="projects_court")

    authors = models.ManyToManyField( Student, related_name="sprojects" )

    title_academic_project = models.TextField(_("title of academic project"), max_length=1024,unique=True)
    description_project = models.TextField(_("Description project"),max_length=2048,default="",blank=True)
    date_init = models.DateField(_("date initial"))
    date_end = models.DateField(_("date finalization"))
    date_end_old = models.DateField(_("date finalization old"), default=None, null=True)
    extended = models.BooleanField(_("date extended"), default=False)

    month_duration = models.PositiveIntegerField(_("month_duration"), default=6)
    month_max_duration = models.PositiveIntegerField(_("month_doration"), default=6)
    has_time_extension = models.BooleanField(_("Has extention time"), default=False)
    month_extension = models.PositiveIntegerField(_("month extension"), default=0)







    def __str__(self):
        return self.title_academic_project