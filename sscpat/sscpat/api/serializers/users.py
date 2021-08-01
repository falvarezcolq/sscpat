"""User Serializer"""


# Django
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework import serializers,exceptions


# models
from sscpat.sscpat.models import User
from rest_framework.serializers import ValidationError

# jwt
from rest_framework_simplejwt.serializers import TokenObtainSerializer

from rest_framework_simplejwt.tokens import RefreshToken
# utlis
from datetime import timedelta
#tasks
from sscpat.taskapp.tasks import send_welcome_email


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ["username", "email", "name", "url"]
        fields =[
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "last_name2",
            "type",
            "CI",
            "RU",
            "ID_TUTOR",
            "position",
            "academic_degree",
            "abbreviation",
            "phone",
            "telf",
            "address",
            "is_active",
            "created_at",

    ]





class UserSignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =[
            	"username",
                "password",
                "email",
                "first_name",
                "last_name",
                "last_name2",
                "type",
                "CI",
                "RU",
                "ID_TUTOR",
                "position",
                "academic_degree",
                "abbreviation",
                "phone",
                "telf",
                "address",
        ]

    def create(self, data):
        """Handle user and profile creation."""
        user = User.objects.create_user(**data)
        return user







class UpdateMyPasswordSerializer(serializers.Serializer):
    """Logout serializer"""

    # username  = serializers.CharField()
    password = serializers.CharField()
    new_password = serializers.CharField()


    def validate_password(self, data):
        username = self.context['user'].username
        user = authenticate(username=username, password=data)

        if user is None:
            raise ValidationError(_('Your current password is incorrect'))



    def save(self):
        data = self.validated_data
        user = self.context['user']
        new_password = data['new_password']
        user.set_password(new_password)
        user.save()


class UpdatePasswordUserSerializer(serializers.Serializer):
    """Logout serializer"""

    user = serializers.IntegerField()
    username  = serializers.CharField()
    new_password = serializers.CharField()

    def validate_user(self, data):
        self.user = User.objects.get(pk=data, active=True)
        if self.user is None:
            raise ValidationError(_('User not valid'))
        return data

    def validate_username(self, data):
        try:
            user = User.objects.get(username=data)
            if user != self.user:
                raise ValidationError(_("The username for user is not available"))

        except User.DoesNotExist:
            pass

        return data


    def save(self):
        data = self.validated_data
        user_id = data['user']
        username = data['username']
        new_password = data['new_password']

        user = User.objects.get(pk=user_id,active=True)
        user.username=username
        user.set_password(new_password)
        user.save()



class UpdateUserAccessSerializer(serializers.Serializer):
    """Logout serializer"""

    user = serializers.IntegerField()
    is_active  = serializers.BooleanField()

    def validate_user(self, data):
        self.user = User.objects.get(pk=data, active=True)
        if self.user is None:
            raise ValidationError(_('User not valid'))
        return data

    def save(self):
        data = self.validated_data
        user_id = data['user']
        is_active = data['is_active']
        self.user.is_active=is_active
        self.user.save()




class TokenObtainPairSerializer(TokenObtainSerializer):
    username_field = User.USERNAME_FIELD

    default_error_messages = {
        'no_active_account': _('No active account found with the given credentials')
    }

    def validate_credentials(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            'password': attrs['password'],
        }
        try:
            authenticate_kwargs['request'] = self.context['request']
        except KeyError:
            pass

        self.user = authenticate(**authenticate_kwargs)

        if self.user is None or not self.user.is_active:
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )

        return {}

    @classmethod
    def get_token(cls, user):
        """Return token with user's credentials"""
        refresh_token = RefreshToken.for_user(user)
        refresh_token['type'] = user.type
        refresh_token['full_name'] = str(user)

        return refresh_token


    def validate(self, attrs):
        data = self.validate_credentials(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        access  = refresh.access_token
        access.set_exp(lifetime=timedelta(days=180))
        data['access'] = str(access)
        # data['access'] = str(refresh.access_token)
        return data

class UserShortDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
           "id",
            "first_name",
            "last_name",
            "last_name2",
        ]
