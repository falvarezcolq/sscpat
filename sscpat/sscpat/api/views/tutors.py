"""User ViewSet."""


from django_filters.rest_framework import DjangoFilterBackend
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from django.conf import settings

# Django
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

# Django REST Framework
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.generics import GenericAPIView,RetrieveAPIView


#Models
from sscpat.sscpat.models.users import Tutor,User

# Serializers
from sscpat.sscpat.api.serializers.tutors import (
    TutorModelSerializer,
    TutorListSerializer,
    TutorMinimalListModelSerializer,
    TutorSearchSerializer,
    TutorAddSerializer,
)

from sscpat.sscpat.api.serializers.report_tutors import TutorDelayProjectsSerializer



# Utils
from rest_framework_simplejwt.views import TokenViewBase
from sscpat.sscpat.utils import viewsets,mixins
from sscpat.sscpat.utils.exceptions import ValidationError
# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin
# Action

from sscpat.sscpat.pagination import CustomPagination

import requests
import json
from sscpat.sscpat.utils.cipher import str_encrypt,str_decrypt


class TutorViewSet(mixins.RetrieveModelMixin,
                   mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    """User viewset """
    queryset =  Tutor.objects.filter(active=True)
    serializer_class = TutorModelSerializer
    pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('last_name',)
    ordering_fields = ('last_name', 'created_at')
    search_fields = ('first_name','last_name','last_name2','CI')
    filterset_fields = ['type']

    def get_permissions(self):
        """Assign permissions based on action."""

        if self.action in ['list']:
            permissions = [IsAuthenticated,IsAccountAdmin,]
        else:
            permissions = [AllowAny]
        return [p() for p in permissions]

    def get_serializer_class(self):
        if self.action in ['list','retrieve']:
            return TutorListSerializer
        return self.serializer_class




class TutorListViewSet(mixins.RetrieveModelMixin,
                       mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    """User viewset """
    queryset =  Tutor.objects.filter(active=True)
    serializer_class = TutorMinimalListModelSerializer
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


class TutorReportListViewSet(mixins.RetrieveModelMixin,
                       mixins.ListModelMixin,
                      viewsets.GenericViewSet):
    """User viewset """
    queryset =  Tutor.objects.filter(active=True)
    serializer_class = TutorDelayProjectsSerializer
    pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('last_name',)
    ordering_fields = ('last_name', 'created_at')
    search_fields = ('first_name','last_name','last_name2')
    # filterset_fields = ['type']

    def get_permissions(self):
        """Assign permissions based on action."""

        if self.action in ['list']:
            permissions = [IsAuthenticated, IsAccountAdmin,]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]


class SearchTutorFromServer(APIView):
    # authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated,IsAccountAdmin,]

    def post(self, request, format=None):
        """
        Return a tutor
        """
        serializer = TutorSearchSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        search = request.data['search']
        url = "{}/api/tutor/{}/".format(
            settings.EXTERNAL_HOST,
            search
        )
        result = requests.get(url)

        if result.status_code == 404:
            data = {
                "user": None,
                "value":0,
                "detail": _("not found"),
            }
            return Response(data)

        user = json.loads(result._content)
        id_persona = str(user['id'])
        id_encrypt = str_encrypt(id_persona)

        msg = _("User isn't registered")
        value = 1

        try:
            user_on_db = User.objects.get(id_people=id_persona)
            msg = _("User is registered")
            value=2
        except User.DoesNotExist:
            pass

        data = {
            "user":user,
            "value":value,
            "key":id_encrypt,
            "detail": msg,
        }
        return Response(data)

class AddTutorFromServer(APIView):
    # authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [IsAuthenticated,IsAccountAdmin,]

    def post(self, request, format=None):
        """
        Return a tutor
        """

        serializer = TutorAddSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = request.data['key']
        id_persona = str_decrypt(token)

        url = "{}/api/people/{}/".format(
            settings.EXTERNAL_HOST,
            id_persona
        )
        result = requests.get(url)

        if result.status_code == 404:
            data = {
                "user": None,
                "value":0,
                "detail": _("not found on external  general server"),
            }
            return Response(data)

        data = json.loads(result._content)
        id_persona = str(data['id'])

        try:
            user = User.objects.get(id_people=id_persona)
            msg = _("User already registered")

            data = {
                "user": None,
                "value":2,
                "detail": msg,
            }
            return Response(data)
        except User.DoesNotExist:
            pass

        new_user = User.objects.create(
                first_name=data['first_name'],
                last_name=data['last_name'],
                last_name2=data['last_name2'],
                CI=data['CI'],
                RU=data['RU'],
                position=data['position'],
                academic_degree=data['academic_degree'],
                abbreviation=data['abbreviation'],
                phone=data['phone'],
                telf=data['telf'],
                address=data['address'],
                email=data['email'],
                type=User.TUTOR,
                id_student=data['RU'],
                id_teacher=data['RU'],
                id_people=id_persona,
                from_server=True,
                username=data['RU'],
        )

        new_user.set_password(data['CI'])
        new_user.save()

        data = {
            "user":TutorModelSerializer(new_user).data,
            "value":1,
            "detail": _("Tutor added"),
        }
        return Response(data)