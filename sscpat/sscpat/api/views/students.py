"""User ViewSet."""


from django_filters.rest_framework import DjangoFilterBackend
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter

# Django
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from django.http import Http404

# Django REST Framework
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework.generics import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.generics import GenericAPIView,RetrieveAPIView

#Models
from sscpat.sscpat.models import Student,User

# Serializers
from sscpat.sscpat.api.serializers.students import (
    StudentModelSerializer,
    StudentListModelSerializer,
    StudentMinimalListModelSerializer,
)




# Utils
from rest_framework_simplejwt.views import TokenViewBase
from sscpat.sscpat.utils import viewsets,mixins
from sscpat.sscpat.utils.exceptions import ValidationError
# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin,IsAccountTutor,IsAccountStudent,IsAccountAdminOrTutor
# Action

from sscpat.sscpat.pagination import CustomPagination



class StudentViewSet(mixins.RetrieveModelMixin,
                   mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    """User viewset """
    queryset =  Student.objects.filter(active=True)
    serializer_class = StudentModelSerializer
    pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('last_name',)
    ordering_fields = ('last_name', 'created_at')
    search_fields = ('first_name','last_name','last_name2','CI')
    filterset_fields = ['type']

    def get_permissions(self):
        """Assign permissions based on action."""
        if self.action in ['list']:
            permissions = [IsAuthenticated,IsAccountAdmin]
        else:
            permissions = [AllowAny]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['list','retrieve']:
            return StudentListModelSerializer
        return self.serializer_class



class StudentListViewSet(mixins.RetrieveModelMixin,
                       mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    """User viewset """
    queryset =  Student.objects.filter(active=True)
    serializer_class = StudentMinimalListModelSerializer
    # pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('last_name',)
    ordering_fields = ('last_name', 'created_at')
    search_fields = ('first_name','last_name','last_name2','CI')
    # filterset_fields = ['type']

    def get_permissions(self):
        """Assign permissions based on action."""

        if self.action in ['list']:
            permissions = [IsAuthenticated,IsAccountAdmin,]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]




class StudentByTutorViewSet(mixins.RetrieveModelMixin,
                   mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    """User viewset """
    queryset =  Student.objects.filter(active=True)
    serializer_class = StudentListModelSerializer
    pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    # ordering = ('last_name',)
    # ordering_fields = ('last_name', 'created_at')
    search_fields = ('first_name','last_name','last_name2','CI')
    # filterset_fields = ['type']

    def get_permissions(self):
        """Assign permissions based on action."""
        if self.action in ['list']:
            permissions = [IsAuthenticated,IsAccountAdminOrTutor]
        else:
            permissions = [AllowAny]
        return [p() for p in permissions]

    def dispatch(self, request, *args, **kwargs):
        """Verify that the circle exists."""
        tutor_id = kwargs['tutor_id']
        self.tutor = get_object_or_404(User, pk=tutor_id )
        if not (self.tutor.type ==  User.TUTOR or self.tutor.type == User.EXTERNAL_TUTOR ):
            raise Http404

        return super(StudentByTutorViewSet, self).dispatch(request, *args, **kwargs)


    def get_queryset(self):

        # query = ''' select distinct u.*
        #         from sscpat_inscription as i
        #         join sscpat_inscription_tutors as it on i.id=it.inscription_id
        #         join sscpat_user as u on i.student_id = u.id
        #         where it.tutor_id = {}
        #         order by u.last_name;'''.format(self.tutor.id)

        # return S

        return  Student.objects.filter(projects__tutors=self.tutor.id).distinct()