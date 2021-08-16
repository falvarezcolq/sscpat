from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from django.utils.translation import ugettext_lazy as _

from .models import *

from sscpat.sscpat.utils.admin import AdminModelConfig
# User = get_user_model()


@admin.register(User)
class UserAdmin(auth_admin.UserAdmin):
    fieldsets = (
        (_('Crendentials'), {'fields': ('username', 'password')}),

        (_('Personal info'), {'fields': ( "type",
                                         'first_name',
                                         'last_name',
                                         'last_name2',
                                         'email',
                                         "CI",
                                         "RU",
                                         "position",
                                         "academic_degree",
                                         "abbreviation",
                                         "phone",
                                         "telf",
                                          "id_student",
                                          "id_teacher",
                                          "id_people",
                                          "from_server",
                                          )}),
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser',
                       # , 'groups', 'user_permissions'
                       'active'
                       ),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined',)}),

        (_('Audit info'), {'fields': ("created_at", "updated_at", "deleted_at",
                       "created_by", "updated_by", "deleted_by")}),
    )

    readonly_fields = ["created_at", "updated_at", "deleted_at",
                       "created_by", "updated_by", "deleted_by",
                       'last_login', 'date_joined',]

    def save_model(self, request, obj, form, change):
        """
        Given a model instance save it to the database.
        """
        if obj.id == None:
            obj.created_by = request.user.id
        else:
            obj.updated_by = request.user.id
        obj.save()



    # def change_view(self, *args, **kwargs):
    #     self.inlines = [GHUserInline]
    #     return super(UserAdmin, self).change_view(*args, **kwargs)

    # def add_view(self, *args, **kwargs):
    #     self.inlines = []
    #     return super(UserAdmin, self).add_view(*args, **kwargs)
    #
    # fieldsets = (("User", {"fields": ("name",)}),)  + auth_admin.UserAdmin.fieldsets
    # list_display = ["username", "name", "is_superuser"]
    # search_fields = ["name"]

@admin.register(Document)
class DocumentAdmin(AdminModelConfig):

    readonly_fields = ["created_at", "updated_at", "deleted_at",
                       "created_by", "updated_by", "deleted_by", ]


@admin.register(Modality)
class ModalityAdmin(AdminModelConfig):
    readonly_fields = ["created_at", "updated_at", "deleted_at",
                       "created_by", "updated_by", "deleted_by", ]



@admin.register(Inscription)
class ModalityAdmin(AdminModelConfig):
    readonly_fields = ["created_at", "updated_at", "deleted_at",
                       "created_by", "updated_by", "deleted_by", ]

# @admin.register(Species)
# class SpeciesAdmin(admin.ModelAdmin):
#     pass

#
#
# @admin.register(UserPicture)
# class UserPictureAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(Breed)
# class BreedAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(Animal)
# class AnimalAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(AnimalPicture)
# class AnimalPictureAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(TypeReport)
# class TypeReportAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(Report)
# class ReportAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(FileReport)
# class FileReportAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(Service)
# class ServiceAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(Attention)
# class AttentionAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(MedicalHistory)
# class MedicalHistoryAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(Diagnosis)
# class DiagnosisAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(Plan)
# class PlanAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(PlanDetail)
# class PlanDetailAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(Treatment)
# class TreatmentAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(TreatmentDetail)
# class TreatmentDetailAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(Payment)
# class PaymentAdmin(admin.ModelAdmin):
#     pass
#
# @admin.register(PaymentDetail)
# class PaymentDetailAdmin(admin.ModelAdmin):
#     pass
