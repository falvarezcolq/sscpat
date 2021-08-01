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
from sscpat.sscpat.models.tracingprogress import TracingProgress
from sscpat.sscpat.models.tracingprogressfile import TracingProgressFile
# from sscpat.sscpat.models.inscriptions import Inscription

# Serializers
from sscpat.sscpat.api.serializers.tracingprogress import (
    TracingProgressModelSerializer,
    TracingProgressCompleteModelSerializer,
)



# Utils
import filetype
from sscpat.sscpat.utils import viewsets,mixins

# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin,IsAccountStudent
# Action
from sscpat.sscpat.pagination import CustomPagination
from sscpat.sscpat.actions.notifications import (
    tracing_of_progress_notification,
)
from sscpat.taskapp.tasks import  send_uploaded_tracing_progress

class TracingProgressViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.DestroyModelMixin,
                            mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """User viewset """
    queryset =  TracingProgress.objects.filter(active=True)
    serializer_class = TracingProgressModelSerializer
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
            return TracingProgressCompleteModelSerializer
        return self.serializer_class

    def dispatch(self, request, *args, **kwargs):
        """Verify that the circle exists."""
        tracingstudent_id = kwargs['tracingstudent_id']
        self.tracingstudent = get_object_or_404(TracingStudent, pk=tracingstudent_id,active=True)
        return super(TracingProgressViewSet, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):
        return TracingProgress.objects.filter(tracingstudent=self.tracingstudent,active=True)

    @staticmethod
    def send_email_notification(instance,user_action):

        inscription = instance.tracingstudent.inscription

        if inscription.student != user_action:
            send_uploaded_tracing_progress.delay(tracing_progress_pk=instance.pk,user_pk=inscription.student.pk)

        for tutor in inscription.tutors.filter(active=True).exclude(pk=user_action.pk):
            send_uploaded_tracing_progress.delay(tracing_progress_pk=instance.pk, user_pk=tutor.pk)

        for tutor in inscription.external_tutors.filter(active=True).exclude(pk=user_action.pk):
            send_uploaded_tracing_progress.delay(tracing_progress_pk=instance.pk, user_pk=tutor.pk)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        self.send_email_notification(instance, request.user)
        return Response(TracingProgressCompleteModelSerializer(instance).data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        instance = serializer.save()
        files=[]
        for key in self.request.data:
            if 'files' in  key:
                files.append( self.request.data[key])

        for file in files:
            kind = filetype.guess(file)
            TracingProgressFile.objects.create(
                tracingprogress=instance,
                format=kind.mime,
                title=file.name,
                path=file
            )
        if self.request.data['typetracing'] == TracingProgress.INSTITUTION_REPORT:
            tracingstudent = instance.tracingstudent
            tracingstudent.institution_report_was_sent=True
            tracingstudent.save()
            instance.institution=tracingstudent.inscription.institution
            instance.save()

        if self.request.data['typetracing'] == TracingProgress.INTERNAL_TUTOR:
            tracingstudent = instance.tracingstudent
            tracingstudent.reviewed_by_tutor = True
            tracingstudent.save()

        if self.request.data['typetracing'] == TracingProgress.EXTERNAL_TUTOR:
            tracingstudent = instance.tracingstudent
            tracingstudent.reviewed_by_external_tutor = True
            tracingstudent.save()

        if self.request.data['typetracing'] == TracingProgress.ADMIN:
            tracingstudent = instance.tracingstudent
            tracingstudent.reviewed_by_admin =True
            tracingstudent.save()

        tracing_of_progress_notification(tracingprogress_id=instance.id, user_action_id=self.request.user.id)
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

        return Response(TracingProgressCompleteModelSerializer(instance).data)


    def perform_update(self, serializer,instance):
        serializer.save()
        files = []
        for key in self.request.data:
            if 'files' in key:
                files.append(self.request.data[key])

        for file in files:
            kind = filetype.guess(file)
            TracingProgressFile.objects.create(
                tracingprogress=instance,
                format=kind.mime,
                title=file.name,
                path=file
            )

        if self.request.data['typetracing'] == TracingProgress.INSTITUTION_REPORT:
            tracingstudent = instance.tracingstudent
            tracingstudent.institution_report_was_sent = True
            tracingstudent.save()
            instance.institution = tracingstudent.inscription.institution
            instance.save()

        if self.request.data['typetracing'] == TracingProgress.INTERNAL_TUTOR:
            tracingstudent = instance.tracingstudent
            tracingstudent.reviewed_by_tutor = True
            tracingstudent.save()

        if self.request.data['typetracing'] == TracingProgress.EXTERNAL_TUTOR:
            tracingstudent = instance.tracingstudent
            tracingstudent.reviewed_by_external_tutor = True
            tracingstudent.save()

        if self.request.data['typetracing'] == TracingProgress.ADMIN:
            tracingstudent = instance.tracingstudent
            tracingstudent.reviewed_by_admin = True
            tracingstudent.save()




class TracingProgressDetailViewSet(mixins.RetrieveModelMixin,
                            # mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """User viewset """
    queryset =  TracingProgress.objects.filter(active=True)
    serializer_class = TracingProgressCompleteModelSerializer


