


#models
from sscpat.sscpat.models import (
    User,
    Notification,
    Inscription,
    Tutor,
    TracingStudent,
    TracingProgress,
)
import datetime
from sscpat.taskapp.tasks import  send_uploaded_tracing_student

# ACCOUNT_CREATED = "1"
# ACCOUNT_ADD = "2"
# WELCOME = "3"
# PROJECT_ASSIGNED = "4"
# PROGRESS_PROJECT_UPLOADED = "5"
# REVIEW_PROGRESS_UPLOADED = "6"
# INSTITUTION_REPORT_UPLOADED = "7"

def create_welcome_notification(user_id, user_action_id):
    """Create and send notifiacion welcome """
    try:
        user = User.objects.get(pk=user_id)
        user_action = User.objects.get(pk=user_action_id)
        if user != user_action:
            notification = Notification.objects.create(
                user=user,
                user_action=user_action,
                format=Notification.WELCOME,
            )
    except (User.DoesNotExist):
        pass


def assign_project_notification(inscription_id, student_id, user_action_id):
    """Create and send notifiacion assign project to student"""
    try:
        inscription = Inscription.objects.get(pk=inscription_id)
        user_action = User.objects.get(pk=user_action_id)
        student = User.objects.get(pk=student_id)
        if student != user_action:
            notification = Notification.objects.create(
                user=student,
                user_action=user_action,
                format=Notification.PROJECT_ASSIGNED,
                inscription=inscription
            )
    except (User.DoesNotExist,Inscription.DoesNotExist):
        pass


def assign_project_to_tutor_notification(inscription_id, tutor_id, user_action_id):
    """Create and send notifiacion postlike"""
    try:
        inscription = Inscription.objects.get(pk=inscription_id)
        user_action = User.objects.get(pk=user_action_id)
        tutor = User.objects.get(pk=tutor_id)
        if tutor != user_action:
            notification = Notification.objects.create(
                user=tutor,
                user_action=user_action,
                format=Notification.PROJECT_ASSIGNED_TO_TUTOR,
                inscription=inscription,
            )
    except (User.DoesNotExist,Inscription.DoesNotExist):
        pass

def progress_upload_notification(tracingstudent_id,user_action_id):
    """Create and send notifiacion postlike"""
    try:
        tracingstudent = TracingStudent.objects.get(pk=tracingstudent_id)
        user_action = User.objects.get(pk=user_action_id)
        inscription = tracingstudent.inscription

        # send notification to student project
        if inscription.student != user_action:
            notification = Notification.objects.create(
                user=inscription.student ,
                user_action=user_action,
                format=Notification.PROGRESS_PROJECT_UPLOADED,
                inscription=inscription,
                tracing_student=tracingstudent
            )


        # send notifications to tutor of project
        for tutor in inscription.tutors.all():
            if tutor != user_action:
                notification = Notification.objects.create(
                    user=tutor,
                    user_action=user_action,
                    format=Notification.PROGRESS_PROJECT_UPLOADED,
                    inscription=inscription,
                    tracing_student = tracingstudent
                )


        # send notification to external tutors of project
        for tutor in inscription.external_tutors.all():
            if tutor != user_action:
                notification = Notification.objects.create(
                    user=tutor,
                    user_action=user_action,
                    format=Notification.PROGRESS_PROJECT_UPLOADED,
                    inscription=inscription,
                    tracing_student = tracingstudent
                )


    except (User.DoesNotExist,TracingStudent.DoesNotExist):
        pass


def tracing_of_progress_notification(tracingprogress_id, user_action_id):
    """Create and send notifiacion postlike"""
    try:
        tracingprogress = TracingProgress.objects.get(pk=tracingprogress_id)
        user_action = User.objects.get(pk=user_action_id)
        tracingstudent = tracingprogress.tracingstudent
        inscription = tracingstudent.inscription

        # send notification to student project
        if inscription.student != user_action:
            notification = Notification.objects.create(
                user=inscription.student,
                user_action=user_action,
                format=Notification.TRACING_PROGRESS_UPLOADED,
                inscription=inscription,
                tracing_student=tracingstudent,
                tracing_progress=tracingprogress,
            )


        for tutor in inscription.tutors.all():
            if tutor != user_action:
                notification = Notification.objects.create(
                    user=tutor,
                    user_action=user_action,
                    format=Notification.TRACING_PROGRESS_UPLOADED,
                    inscription=inscription,
                    tracing_student=tracingstudent,
                    tracing_progress=tracingprogress,
                )
        for tutor in inscription.external_tutors.all():
            if tutor != user_action:
                notification = Notification.objects.create(
                    user=tutor,
                    user_action=user_action,
                    format=Notification.TRACING_PROGRESS_UPLOADED,
                    inscription=inscription,
                    tracing_student=tracingstudent,
                    tracing_progress=tracingprogress,
                )

    except (User.DoesNotExist, TracingStudent.DoesNotExist):
        pass

