"""ADMIN CONFIG class """
#Django
from django.contrib import admin


class AdminModelConfig(admin.ModelAdmin):
    """AdminConfig overrride some important functions.
    from admin.ModelAdmin
    """

    def save_model(self, request, obj, form, change):
        """
        Given a model instance save it to the database.
        """
        if obj.id == None:
            obj.created_by = request.user.id
        else:
            obj.updated_by = request.user.id
        obj.save()