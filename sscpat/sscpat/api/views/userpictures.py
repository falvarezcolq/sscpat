"""UserPicture View"""


#Django
from django.utils.translation import ugettext_lazy as _

# Django REST Framework
# from rest_framework.views import  APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

#models
from sscpat.sscpat.models import UserPicture

# Serializer
from sscpat.sscpat.api.serializers.userpictures import UserPictureSerializer


# utils
from sscpat.sscpat.utils.exceptions import ValidationError
from sscpat.sscpat.utils.viewsets import GenericViewSet
from sscpat.sscpat.utils import mixins
# from rest_framework import  generics




class UserPictureViewSet(mixins.CreateModelMixin,
                         mixins.DestroyModelMixin,
                         GenericViewSet
                         ):
    """Userpicture View.

    View for user profile picture
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = UserPictureSerializer
    queryset = UserPicture.objects.filter(active=True)

