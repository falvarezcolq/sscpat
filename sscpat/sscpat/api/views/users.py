"""User ViewSet."""


from django_filters.rest_framework import DjangoFilterBackend
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter

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

# Serializers
from sscpat.sscpat.api.serializers.users import (
    UserModelSerializer,
    UpdateMyPasswordSerializer,
    UpdatePasswordUserSerializer,
    TokenObtainPairSerializer, # login
    UserSignUpSerializer, # ResgisterUser
    UpdateUserAccessSerializer
)



# Utils
from rest_framework_simplejwt.views import TokenViewBase
from sscpat.sscpat.utils import viewsets,mixins
from sscpat.sscpat.utils.exceptions import ValidationError
# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin
# Action
from sscpat.sscpat.actions.notifications import  create_welcome_notification

from sscpat.sscpat.pagination import CustomPagination


from sscpat.sscpat.models.users import User
from sscpat.sscpat.models.inscriptions import Inscription
from django.utils import timezone
from sscpat.taskapp.tasks import send_welcome_email

class UserViewSet(mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    """User viewset """
    queryset =  User.objects.filter(active=True)
    serializer_class = UserModelSerializer
    pagination_class = CustomPagination
    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('last_name',)
    ordering_fields = ('last_name', 'created_at')
    search_fields = ('first_name','last_name','last_name2','CI')
    filterset_fields = ['type']

    def get_permissions(self):
        """Assign permissions based on action."""
        print(self.action)
        if self.action in ['signup', 'updateuserpassword','list','updateuseraccess','destroy']:
            permissions = [IsAuthenticated,IsAccountAdmin,]

        elif self.action in ['updatepassword']:
            permissions = [IsAuthenticated,]
        else:
            permissions = [AllowAny]
        return [p() for p in permissions]

    @action(detail=False, methods=['post'])
    def signup(self,request):
        """User sign up."""
        serializer = UserSignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        create_welcome_notification(user_id=user.pk, user_action_id=request.user.pk)
        send_welcome_email.delay(user_pk=user.pk)
        data = UserModelSerializer(user).data
        return Response(data, status=status.HTTP_201_CREATED)


    @action(detail=False, methods=['post'])
    def updatepassword(self,request):
        """ User update password """
        serializer = UpdateMyPasswordSerializer(
            data=request.data,
            context={"user": request.user})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response_data = {
            "message": _('password updated')
        }
        return Response(response_data, status=status.HTTP_200_OK)


    @action(detail=False, methods=['post'])
    def updateuserpassword(self, request):
        """ User update password """
        serializer = UpdatePasswordUserSerializer(
            data=request.data,
            context={"user": request.user})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response_data = {
            "message": _('Credentials Updated')
        }
        return Response(response_data, status=status.HTTP_200_OK)


    @action(detail=False, methods=['post'])
    def updateuseraccess(self, request):
        """ User update password """
        serializer = UpdateUserAccessSerializer(
            data=request.data,
            context={"user": request.user})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response_data = {
            "message": _('Access Updated')
        }
        return Response(response_data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance == request.user:
            return Response({'detail': _(
                "You cant delete your own accont")},
                status=status.HTTP_400_BAD_REQUEST)

        if instance.projects.filter(active=True).count() > 0:
            return Response({'detail': _(
                "You cant delete this user, "
                "because he have some projects that depends on it")},
                status=status.HTTP_400_BAD_REQUEST)

        if Inscription.objects.filter(tutors=instance.id,active=True).count() > 0:
            return Response({'detail': _(
                "You cant delete this user, "
                "because he have some projects that depends on it")},
                status=status.HTTP_400_BAD_REQUEST)

        if Inscription.objects.filter(external_tutors=instance.id, active=True).count() > 0:
            return Response({'detail': _(
                "You cant delete this user, "
                "because he have some projects that depends on it")},
                status=status.HTTP_400_BAD_REQUEST)


        self.perform_destroy(instance, request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def perform_destroy(self, instance, user):
        instance.active = False
        instance.deleted_at = timezone.now()
        instance.deleted_by = user.id
        instance.is_active=False
        instance.save()





class TokenObtainPairView(TokenViewBase):
    """
    API LOGIN
    return access_token and refresh token

    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """
    serializer_class = TokenObtainPairSerializer

class DataSessionApiView(RetrieveAPIView):
    """
    API DATA SESSION
    RETURN data for storage front
    """
    permission_classes = [
        IsAuthenticated
    ]
    serializer_class = UserModelSerializer

    def get_object(self):
        return self.request.user



