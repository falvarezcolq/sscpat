"""User Model."""
from django.contrib.auth.models import AbstractUser

#Django
from django.db import models
from django.utils.translation import ugettext_lazy as _


# Utilities
from sscpat.sscpat.utils.models import SSCPATModel



class User(SSCPATModel,AbstractUser):

    """ User Model.
    Extends from Django's abstract user and SSCPAT base model,
    """
    STUDENT = "STUDENT"
    TUTOR = "TUTOR"
    EXTERNAL_TUTOR = "EXTERNAL_TUTOR"
    ADMIN = "ADMIN"

    TYPE_USER = [
        (STUDENT , _("Student")),
        (TUTOR , _("Tutor")),
        (EXTERNAL_TUTOR , _("external_tutor")),
        (ADMIN , _("admin")),
    ]

    last_name2 = models.CharField(_('last name 2'), max_length=150, blank=True)
    type = models.CharField(_("Type"),max_length=50,choices=TYPE_USER,default=STUDENT)
    CI = models.CharField(_("CI"),max_length=255,unique=True)
    RU = models.CharField(_("RU"),max_length=255,blank=True,default="")
    position = models.CharField(_("Position"),max_length=255,blank=True,default="")
    academic_degree = models.CharField(_("academic_degree"),max_length=255,blank=True,default="")
    abbreviation = models.CharField(_("abbreviation"),max_length=255,blank=True,default="")
    phone = models.CharField(_("phone"),max_length=255,blank=True,default="")
    telf = models.CharField(_("phone"),max_length=255,blank=True,default="")
    address = models.CharField(_("address"),max_length=1024,blank=True,default="")

    email = models.EmailField(
        _("email"),
        unique=True,
        error_messages={
            'unique': _('A user with  this email already exists.')
        },
    )

    id_student = models.CharField(_("id student"),max_length=30,default="",blank=True)
    id_teacher = models.CharField(_("id docente"),max_length=30,default="",blank=True)
    id_people = models.CharField(_("id people"),max_length=30,unique=True)
    from_server = models.BooleanField(_("from server"), default=False)



    def __str__(self):
        """Return first name and last name"""
        return "{} {} {}".format(
            self.first_name,
            self.last_name,
            self.last_name2,
        )

    def get_full_name(self):
        return "{} {} {}".format(
            self.first_name,
            self.last_name,
            self.last_name2,
        )

    def abbr_full_name(self):
        return "{} {} {} {}".format(
            self.abbreviation,
            self.first_name,
            self.last_name,
            self.last_name2,
        )


class StudentManager(models.Manager):

    def get_queryset(self,*args,**kwargs):
        return super().get_queryset(*args,**kwargs).filter(type=User.STUDENT)

class Student(User):
    objects = StudentManager()
    class Meta:
        proxy=True

    def save(self,*args,**kwargs):
        if not self.pk:
            self.type = User.STUDENT
        return super().save(*args, **kwargs)

    def __str__(self):
        """Return first name and last name"""
        return "{} {} {}".format(
            self.first_name,
            self.last_name,
            self.last_name2,
        )


class TutorManager(models.Manager):
    def get_queryset(self,*args,**kwargs):
        return super().get_queryset(*args,**kwargs).filter(type=User.TUTOR)
#
class Tutor(User):
    objects = TutorManager()
    class Meta:
        proxy=True

    def save(self,*args,**kwargs):
        if not self.pk:
            self.type = User.TUTOR
        return super().save(*args, **kwargs)

    def __str__(self):
        """Return first name and last name"""
        return "{} {} {}".format(
            self.first_name,
            self.last_name,
            self.last_name2,
        )


class ExternalTutorManager(models.Manager):
    def get_queryset(self,*args,**kwargs):
        return super().get_queryset(*args,**kwargs).filter(type=User.EXTERNAL_TUTOR)
#
class ExternalTutor(User):
    objects = ExternalTutorManager()
    class Meta:
        proxy=True

    def save(self,*args,**kwargs):
        if not self.pk:
            self.type = User.TUTOR
        return super().save(*args, **kwargs)

    def __str__(self):
        """Return first name and last name"""
        return "{} {} {}".format(
            self.first_name,
            self.last_name,
            self.last_name2,
        )
#
#
class AdminManager(models.Manager):
    def get_queryset(self,*args,**kwargs):
        return super().get_queryset(*args,**kwargs).filter(type=User.ADMIN)
#


class Admin(User):
    objects = AdminManager()
    class Meta:
        proxy=True

    def save(self,*args,**kwargs):
        if not self.pk:
            self.type = User.ADMIN
        return super().save(*args, **kwargs)

    def __str__(self):
        """Return first name and last name"""
        return "{} {} {}".format(
            self.first_name,
            self.last_name,
            self.last_name2,
        )