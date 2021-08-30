"""Celery tasks."""

# Django
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.encoding import smart_str

# Models
from sscpat.sscpat.models.users import User
from sscpat.sscpat.models.inscriptions import Inscription
from sscpat.sscpat.models.tracingstudent import TracingStudent
from sscpat.sscpat.models.tracingprogress import TracingProgress


# Celery
from celery.decorators import task, periodic_task

# Utilities
from sscpat.sscpat.utils.choices.months_es import months
import jwt
import time
from datetime import timedelta

from .mail_smtp import send_email

import time


def send_email(subject, content,emailSend):
    emailToSend = []
    emailToSend.append('aeumsa.tech@gmail.com')
    # emailToSend.append(emailSend)
    from_email = 'Carrera de Administración de Empresas UMSA <noreply@aeumsa.com>'

    try:
        msg = EmailMultiAlternatives(subject, content, from_email, emailToSend)
        msg.attach_alternative(content, "text/html")
        msg.send()
        print("email sent")
    except Exception as e:
        print(e)


    # def gen_verification_token(user):
    #     """Create JWT token that the user can use to verify its account."""
    #     exp_date = timezone.now() + timedelta(days=3)
    #     payload = {
    #         'user': user.username,
    #         'exp': int(exp_date.timestamp()),
    #         'type': 'email_confirmation'
    #     }
    #     token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    #     return token.decode()

# def send_confirmation_email(user_pk):
#     """Send account verification link to given user."""
#     user = User.objects.get(pk=user_pk)
#     verification_token = gen_verification_token(user)
#     subject = 'Welcome @{}! Verify your account to start using Comparte Ride'.format(user.username)
#     from_email = 'Comparte Ride <noreply@comparteride.com>'
#     content = render_to_string(
#         'emails/users/account_verification.html',
#         {'token': verification_token, 'user': user}
#     )
#     msg = EmailMultiAlternatives(subject, content, from_email, [user.email])
#     msg.attach_alternative(content, "text/html")
#     msg.send()


@task(name='send_welcome_email', max_retries=3)
def send_welcome_email(user_pk):
    """Send welcome email to new user"""
    time.sleep(3)

    user = User .objects.get(pk=user_pk)
    subject = '¡Bienvenido {}! Has sido registrado en el sistema de  seguimiento y' \
              ' control de proyectos academicos de titulación'.format(user.first_name)

    content = render_to_string(
        'emails/users/account_new_user_welcome.html',
        {'user': user}
    )
    send_email(subject,content,user.email)



@task(name='send_assign_project_to_student', max_retries=3)
def send_assign_project_to_student(inscription_pk,student_pk):
    """Assign project to student"""
    time.sleep(3)
    user = User.objects.get(pk=student_pk)

    inscription = Inscription.objects.get(pk=inscription_pk)
    students  = ", ".join([str(x) for x in inscription.authors.all()])
    tutors  =  ", ".join([str(x) for x in inscription.tutors.all()])
    external_tutors =  ", ".join([str(x) for x in inscription.external_tutors.all()])

    subject = '¡Proyecto asignado! Un nuevo proyecto ha sido asignado a tu persona'

    content = render_to_string(
        'emails/users/account_add_project_to_student.html',
        {
            'student': user,
            'students':students,
            'inscription': inscription,
            'tutors': tutors if tutors != "" else "--",
            'external_tutors': external_tutors if external_tutors != "" else "--",
            'date_init': inscription.date_init.strftime("%d/%m/%Y"),
            'date_end': inscription.date_end.strftime("%d/%m/%Y"),
        }
    )
    send_email(subject, content, user.email)





@task(name='send_assign_project_to_tutor', max_retries=3)
def send_assign_project_to_tutor(inscription_pk,tutor_pk):
    """Assign priject to tutor"""
    time.sleep(3)
    inscription = Inscription.objects.get(pk=inscription_pk)
    tutor = User.objects.get(pk=tutor_pk)
    student = inscription.student
    students = ", ".join([str(x) for x in inscription.authors.all()])
    tutors = ", ".join([ x.abbreviation + " "+str(x) for x in inscription.tutors.all()])
    external_tutors = ", ".join([x.abbreviation + " "+str(x) for x in inscription.external_tutors.all()])

    subject = '¡Proyecto asignado! Un nuevo proyecto académico ha sido asignado bajo su tutoría '  + inscription.academic_period.title +' '+ inscription.title_academic_project

    content = render_to_string(
        'emails/users/account_add_project_to_tutor.html',
        {
            'tutor':tutor,
            'student': student,
            'students':students,
            'inscription': inscription,
            'tutors': tutors if tutors != "" else "--",
            'external_tutors':external_tutors if external_tutors != "" else "--" ,
            'date_init':inscription.date_init.strftime("%d/%m/%Y"),
            'date_end':inscription.date_end.strftime("%d/%m/%Y"),
        }
    )
    send_email(subject, content, tutor.email)



@task(name='send_email_disassociate_project_to_tutor', max_retries=3)
def send_email_disassociate_project_to_tutor(inscription_pk,tutor_pk):
    """Assign priject to tutor"""
    time.sleep(3)
    inscription = Inscription.objects.get(pk=inscription_pk)
    tutor = User.objects.get(pk=tutor_pk)
    student = inscription.student
    students = ", ".join([str(x) for x in inscription.authors.all()])
    tutors = ", ".join([ x.abbreviation + " "+str(x) for x in inscription.tutors.all()])
    external_tutors = ", ".join([x.abbreviation + " "+str(x) for x in inscription.external_tutors.all()])

    subject = '¡Proyecto fuera de su tutoría! El proyecto académico ya no esta bajo su tutoría:  '  + inscription.academic_period.title +' '+ inscription.title_academic_project

    content = render_to_string(
        'emails/users/account_disassociate_project_to_tutor.html',
        {
            'tutor':tutor,
            'student': student,
            'students': students,
            'inscription': inscription,
        }
    )
    send_email(subject, content, tutor.email)

@task(name='send_uploaded_tracing_student', max_retries=3)
def send_uploaded_tracing_student(tracing_student_pk,user_pk):

    time.sleep(3)
    tracing_student = TracingStudent.objects.get(pk=tracing_student_pk)
    user = User.objects.get(pk=user_pk)
    user_action = User.objects.get(pk=tracing_student.created_by)
    inscription = tracing_student.inscription

    subject = '¡Un nuevo avance ha sido subido a '  + inscription.academic_period.title +' '+ inscription.title_academic_project+' !'

    text_date_month = "{} {}".format(
        months[str(tracing_student.date_month.month)] if tracing_student.date_month else "",
        tracing_student.date_month.year if tracing_student else ""
    )
    content = render_to_string(
        'emails/users/progress_project_uploaded.html',
        {
            'tracing_student':tracing_student,
            'user':user,
            'user_action':user_action,
            'inscription':inscription,
            'month': text_date_month,
        }
    )
    send_email(subject, content, user.email)


@task(name='send_uploaded_tracing_progress', max_retries=3)
def send_uploaded_tracing_progress(tracing_progress_pk,user_pk):

    time.sleep(3)
    tracing_progress = TracingProgress.objects.get(pk=tracing_progress_pk)
    tracing_student = tracing_progress.tracingstudent
    user = User.objects.get(pk=user_pk)
    user_action = User.objects.get(pk=tracing_student.created_by)
    inscription = tracing_student.inscription

    subject = '¡El proyecto '  + inscription.academic_period.title +' '+ inscription.title_academic_project+'  ha sido revisado o comentado!'

    text_date_month = "{} {}".format(
        months[str(tracing_student.date_month.month)] if tracing_student.date_month else "",
        tracing_student.date_month.year if tracing_student else ""
    )
    content = render_to_string(
        'emails/users/review_progress_project_uploaded.html',
        {
            'tracing_progress':tracing_progress,
            'tracing_student':tracing_student,
            'user':user,
            'user_action':user_action,
            'inscription':inscription,
            'month':text_date_month,
        }
    )
    send_email(subject, content, user.email)