"""User permissions."""

# Django REST Framework
from rest_framework.permissions import BasePermission

# models
from sscpat.sscpat.models import User


class IsAccountAdmin(BasePermission):
    """Allow access only to admin."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.type == User.ADMIN)


class IsAccountAdminOrTutor(BasePermission):
    """Allow access only to admin."""

    def has_permission(self, request, view):
        return bool(request.user and (request.user.type == User.ADMIN or
                                      request.user.type == User.TUTOR or
                                      request.user.type == User.EXTERNAL_TUTOR ))




class IsAccountTutor(BasePermission):
    """Allow access only to Tutor."""

    def has_permission(self, request, view):
        return bool(request.user and (request.user.type == User.TUTOR or  request.user.type == User.EXTERNAL_TUTOR))


class IsAccountInternalTutor(BasePermission):
    """Allow access only to Tutor."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.type == User.TUTOR)


class IsAccountExternalTutor(BasePermission):
    """Allow access only to Tutor."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.type == User.EXTERNAL_TUTOR)


class IsAccountStudent(BasePermission):
    """Allow access only to admin."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.type == User.STUDENT)



class IsAccountOwner(BasePermission):
    """Allow access only to objects owned by the requesting user."""

    def has_object_permission(self, request, view, obj):
        """Check obj and user are the same."""
        return request.user == obj
