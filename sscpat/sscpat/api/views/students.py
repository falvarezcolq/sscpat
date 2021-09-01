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
    StudentAddSerializer,
    StudentSearchSerializer,
)




# Utils
from rest_framework_simplejwt.views import TokenViewBase
from sscpat.sscpat.utils import viewsets,mixins
from sscpat.sscpat.utils.exceptions import ValidationError
from sscpat.sscpat.utils.cipher import str_encrypt,str_decrypt

# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin,IsAccountTutor,IsAccountStudent,IsAccountAdminOrTutor
# Action

from sscpat.sscpat.pagination import CustomPagination


from django.conf import settings

#imports
import json
import requests




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

        if self.tutor.type == User.TUTOR:
            return Student.objects.filter(sprojects__tutors=self.tutor.id).distinct()

        elif self.tutor.type == User.EXTERNAL_TUTOR:
            return Student.objects.filter(sprojects__external_tutors=self.tutor.id).distinct()

        return []



class SearchStudentFromServer(APIView):

    permission_classes = [IsAuthenticated,IsAccountAdmin,]

    def post(self, request, format=None):
        """
        Return a tutor
        """
        serializer = StudentSearchSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        search = request.data['search']

        url = "{}/alumno/{}".format(
            settings.EXTERNAL_HOST,
            search
        )
        result = requests.get(url)
        if result.status_code == 404:
            data = {
                "user": None,
                "value": 0,
                "detail": _("not found"),
            }
            return Response(data)

        if result.status_code == 200:
            results = json.loads(result._content)

            if len(results) == 0:
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
                value = 2
            except User.DoesNotExist:
                pass

            data = {
                "user":
                    {
                        "email": user["Correo"],
                        "CI": user["ci"],
                        "first_name": user["nombres"],
                        "last_name": user["paterno"],
                        "last_name2": user["materno"],
                    },
                "value": value,
                "key": id_encrypt,
                "detail": msg,
            }
            return Response(data)


class AddStudentFromServer(APIView):

    permission_classes = [IsAuthenticated,IsAccountAdmin,]

    def post(self, request, format=None):
        """
        Return a tutor
        """

        serializer = StudentAddSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = request.data['key']
        ci = str_decrypt(token)

        url = "{}/alumno/{}".format(
            settings.EXTERNAL_HOST,
            ci
        )
        result = requests.get(url)

        if result.status_code == 404:
            data = {
                "user": None,
                "value": 0,
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
            user.RU = data["reguniv"]
            user.phone = data["celular"]
            user.telf = data["telefono"]
            user.email = data["Correo"]
            user.type = User.STUDENT
            user.username = data["reguniv"]
            user.is_active = True
            user.active = True
            user.set_password(data['ci'])
            user.save()

            msg = _("User was updated from server")

            data = {
                "user": StudentModelSerializer(user).data,
                "value": 2,
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
            RU=data['reguniv'],
            phone=data['celular'],
            telf=data['telefono'],
            email=data['Correo'],
            type=User.STUDENT,
            id_people=id_persona,
            from_server=True,
            username=data['reguniv'],
        )

        new_user.set_password(data['ci'])
        new_user.save()

        data = {
            "user": StudentModelSerializer(new_user).data,
            "value": 1,
            "detail": _("Tutor added"),
        }
        return Response(data)

