"""User ViewSet."""


from django_filters.rest_framework import DjangoFilterBackend
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter

# Django
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

# Django REST Framework
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import status


#Models
from sscpat.sscpat.models.tracingstudent import TracingStudent
from sscpat.sscpat.models.tracingstudentfile import TracingStudentFile
from sscpat.sscpat.models.inscriptions import Inscription

# Serializers
from sscpat.sscpat.api.serializers.tracingstudent import (
    TracingStudentModelSerializer,
    TracingStudentWithFileModelSerializer,
    TracingStudentCompleteModelSerializer,
)

from sscpat.sscpat.api.serializers.tracingstudent_report import TracingStudentReportModelSerializer



# Utils
import filetype
import json

from sscpat.sscpat.utils import viewsets,mixins

# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin,IsAccountStudent
# Action
from sscpat.sscpat.pagination import CustomPagination
from sscpat.sscpat.actions.notifications import (
    progress_upload_notification
)
from sscpat.taskapp.tasks import send_uploaded_tracing_student

class TracingStudentViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.DestroyModelMixin,
                            mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """User viewset """
    queryset =  TracingStudent.objects.filter(active=True)
    serializer_class = TracingStudentModelSerializer
    # pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('-created_at',)
    ordering_fields = ('title', 'created_at')
    search_fields = ('description',)
    # filterset_fields = ['type']

    def get_permissions(self):
        """Assign permissions based on action."""

        if self.action in ['create','update','destroy']:
            permissions = [IsAuthenticated]#IsAccountStudent,]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['retrieve','list']:
            return TracingStudentWithFileModelSerializer
        return self.serializer_class

    def dispatch(self, request, *args, **kwargs):
        """Verify that the circle exists."""
        inscription_id = kwargs['inscription_id']
        self.inscription = get_object_or_404(Inscription, pk=inscription_id,active=True)
        return super(TracingStudentViewSet, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):
        return TracingStudent.objects.filter(inscription=self.inscription,active=True)

    @staticmethod
    def send_emal_notifications(instance,user_action):
        """ this function send ascincrnous email"""
        inscription = instance.inscription
        if inscription.student != user_action:
            send_uploaded_tracing_student.delay(tracing_student_pk=instance.pk, user_pk=inscription.student.pk)

        for tutor in inscription.tutors.filter(active=True).exclude(pk=user_action.pk):
            send_uploaded_tracing_student.delay(tracing_student_pk=instance.pk, user_pk=tutor.pk)

        for tutor in inscription.external_tutors.filter(active=True).exclude(pk=user_action.pk):
            send_uploaded_tracing_student.delay(tracing_student_pk=instance.pk, user_pk=tutor.pk)


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        self.send_emal_notifications(instance,request.user)
        headers = self.get_success_headers(serializer.data)
        return Response(TracingStudentCompleteModelSerializer(instance).data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        instance = serializer.save()
        files=[]
        for key in self.request.data:
            if 'files' in  key:
                files.append( self.request.data[key])

        for file in files:
            kind = filetype.guess(file)
            TracingStudentFile.objects.create(
                tracingstudent=instance,
                format=kind.mime,
                title=file.name,
                path=file
            )

        progress_upload_notification(tracingstudent_id=instance.id,user_action_id=self.request.user.id)

        return instance


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer,instance)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(TracingStudentCompleteModelSerializer(instance).data)

    def perform_update(self, serializer,instance):
        serializer.save()
        data = self.request.data

        if 'deleted' in  self.request.data:
            deleted_list = json.loads(self.request.data['deleted'])
            for file  in instance.files.all():
                if file.id in deleted_list:
                    file.active = False
                    file.save()

        files = []
        for key in self.request.data:
            if 'files' in key:
                files.append(self.request.data[key])

        for file in files:
            kind = filetype.guess(file)
            TracingStudentFile.objects.create(
                tracingstudent=instance,
                format=kind.mime,
                title=file.name,
                path=file
            )




class TracingStudentDetailViewSet(mixins.RetrieveModelMixin,
                            # mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """User viewset """
    queryset =  TracingStudent.objects.filter(active=True)
    serializer_class = TracingStudentCompleteModelSerializer




class TracingStudentReportViewSet(#mixins.RetrieveModelMixin,
                            mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """Report student progress view set """
    queryset =  TracingStudent.objects.filter(active=True)
    serializer_class = TracingStudentReportModelSerializer
    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('created_at')
    ordering_fields = ('created_at')


    def dispatch(self, request, *args, **kwargs):
        """Verify that the circle exists."""
        inscription_id = kwargs['inscription_id']
        self.inscription = get_object_or_404(Inscription, pk=inscription_id,active=True)
        return super(TracingStudentReportViewSet, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):
        return TracingStudent.objects.filter(inscription=self.inscription,active=True)

