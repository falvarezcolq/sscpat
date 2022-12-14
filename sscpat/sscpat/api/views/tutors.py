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

        """http://200.7.160.49:8080/docente/1111123"""
        url = "{}/docente/{}".format(
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


        results = json.loads(result._content)

        if result.status_code == 200:

            if len(results) == 0 :
                data = {
                    "user": None,
                    "value": 0,
                    "detail": _("not found"),
                }
                return Response(data)

            user = results[0][0]
            ci = str(user['ci'])
            id_persona = str(user['Id_persona'])
            id_encrypt = str_encrypt(ci)
            msg = _("User isn't registered")
            value = 1

            try:
                user_on_db = User.objects.get(id_people=id_persona)
                msg = _("User is registered")
                value=2
            except User.DoesNotExist:
                pass

            data = {
                "user":
                {
                    "email" : user["Correo"],
                    "CI" : user["ci"],
                    "first_name" : user["nombres"],
                    "last_name" : user["paterno"],
                    "last_name2": user["materno"],
                },
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
        ci = str_decrypt(token)

        url = "{}/docente/{}".format(
            settings.EXTERNAL_HOST,
            ci
        )
        result = requests.get(url)

        if result.status_code == 404:
            data = {
                "user": None,
                "value":0,
                "detail": _("not found on external  general server"),
            }
            return Response(data)

        results = json.loads(result._content)


        if result.status_code == 200 and len(results) == 0:
            data = {
                "user": None,
                "value": 0,
                "detail": _("not found"),
            }
            return Response(data)

        data = results[0][0]
        id_persona = str(data['Id_persona'])

        try:
            user = User.objects.get(id_people=id_persona)
            user.first_name = data["nombres"]
            user.last_name = data["paterno"]
            user.last_name2 = data["materno"]
            user.CI = data["ci"]
            user.RU = data["ci"]
            user.phone = data["celular"]
            user.telf = data["telefono"]
            user.email = data["Correo"]
            user.type = User.TUTOR
            user.id_teacher = data["iddocente"]
            user.username = data["iddocente"]
            user.is_active = True
            user.active = True
            user.set_password(data['ci'])
            user.save()

            msg = _("User was updated from server")

            data = {
                "user": TutorModelSerializer(user).data,
                "value":2,
                "detail": msg,
            }
            return Response(data)
        except User.DoesNotExist:
            pass

        new_user = User.objects.create(
                first_name=data['nombres'],
                last_name=data['paterno'],
                last_name2=data['materno'],
                CI=data['ci'],
                RU=data['ci'],
                phone=data['celular'],
                telf=data['telefono'],
                email=data['Correo'],
                type=User.TUTOR,
                id_teacher=data['iddocente'],
                id_people=id_persona,
                from_server=True,
                username=data['iddocente'],
        )

        new_user.set_password(data['ci'])
        new_user.save()

        data = {
            "user":TutorModelSerializer(new_user).data,
            "value":1,
            "detail": _("Tutor added"),
        }
        return Response(data)
