"""Grindhood exceptions."""
# Django
from django.utils.encoding import force_str
from django.utils.translation import gettext_lazy as _

# Django REST Framework
from rest_framework import status
from rest_framework.exceptions import  APIException


def get_serializers_error_list(errors):
    errors_list_string = []
    for key, value in errors.items():
        errors_list_string.append(key + ": " + value[0])
    return errors_list_string




class ValidationError(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = _('Error request.')
    default_code = 'bad_request'

    def __init__(self, detail=None, code=None):
        if detail is not None:

            if isinstance(detail,dict):
                detail = get_serializers_error_list(detail)[0]

            elif isinstance(detail,list):
                detail = detail[0]

            detail = {
                'status':'error',
                'data': force_str(detail)
            }
        else:
            detail = self.default_detail
        super().__init__(detail, code)