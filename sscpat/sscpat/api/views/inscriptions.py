"""User ViewSet."""


from django_filters.rest_framework import DjangoFilterBackend
# Filters
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import action

# Django
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _
from django.http import Http404


# Django REST Framework
from rest_framework.permissions import IsAuthenticated,IsAdminUser,AllowAny
from rest_framework.response import  Response
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.serializers import ValidationError



#Models
from sscpat.sscpat.models.inscriptions import Inscription
from sscpat.sscpat.models.users import Tutor,ExternalTutor,Student,User
from sscpat.sscpat.models.inscriptiondocuments import InscriptionDocument
from sscpat.sscpat.models.inscriptioninitialdocuments import InscriptionInitialDocument
from sscpat.sscpat.models.datelog import DateLog


# Serializers

from sscpat.sscpat.api.serializers.users import UserCheckStudentSerializer,ArrayStudentSerializer
from sscpat.sscpat.api.serializers.inscriptions import (
    InscriptionModelSerializer,
    InscriptionCompleteModelSerializer,
    InscriptionModelSerializerForTutor,
    InscriptionModelSerializerForStudent,
    InscriptionDatelogSerializer,
)
from sscpat.sscpat.api.serializers.report_inscriptions import InscriptionReportModelSerializer
from sscpat.sscpat.api.serializers.institutions import InstitutionModelSerializer
from sscpat.sscpat.api.serializers.inscriptiondocuments import InscriptionInitialDocumentModelSerializer,InscriptionDocumentModelSerializer
from sscpat.sscpat.api.serializers.datelog import DateLogModelSerializer

# Utils

from sscpat.sscpat.utils import viewsets,mixins
from sscpat.sscpat.utils.helper import get_date_months
import datetime


# Permissions
from sscpat.sscpat.permissions import IsAccountAdmin,IsAccountAdminOrTutor

# Action

from sscpat.sscpat.pagination import CustomPagination
from sscpat.sscpat.actions.notifications import (
    assign_project_notification,
    assign_project_to_tutor_notification,
)

from sscpat.taskapp.tasks import (
    send_assign_project_to_student,
    send_assign_project_to_tutor,
    send_email_disassociate_project_to_tutor,
)

class InscriptionViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.DestroyModelMixin,
                            mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """User viewset """
    queryset =  Inscription.objects.filter(active=True)
    serializer_class = InscriptionModelSerializer
    pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('-academic_period__created_at','title_academic_project',)
    ordering_fields = ('title_academic_project', 'created_at')
    search_fields = ('title_academic_project','student__first_name','student__last_name')
    filterset_fields = ['academic_period','modality','state']

    def get_permissions(self):
        """Assign permissions based on action."""
        if self.action in ['create','update','destroy']:
            permissions = [IsAuthenticated,IsAccountAdmin,]
        else:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]


    def get_serializer_class(self):
        if self.action in ['create', 'update',]:
            return InscriptionModelSerializer
        if self.action in ['retrieve','list']:
            return InscriptionCompleteModelSerializer
        return self.serializer_class


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        data =  InscriptionCompleteModelSerializer(instance).data

        return Response(data, status=status.HTTP_201_CREATED, headers=headers)

    @staticmethod
    def get_date(date_init,date_end,days):
        if days == -2:
            return None;
        elif days == -1:
            return date_end - datetime.timedelta(7);
        elif days == 0:
            return date_init + datetime.timedelta(7);
        elif days > 1 :
            return date_init + datetime.timedelta(days);



    def perform_create(self, serializer):
        data = self.request.data
        user = self.request.user
        instance = serializer.save()



        if 'tutors' in data:
            tutors = data['tutors']
            for tutor in tutors:
                try:
                    t = Tutor.objects.get(id=tutor['id'],active=True)
                    instance.tutors.add(t)
                    assign_project_to_tutor_notification(inscription_id=instance.id, tutor_id=t.id, user_action_id=user.id)
                    send_assign_project_to_tutor.delay(inscription_pk=instance.id,tutor_pk=t.id)
                except Tutor.DoesNotExist:
                    pass

        if 'external_tutors' in data:
            external_tutors = data['external_tutors']
            for tutor in external_tutors:
                try:
                    t = ExternalTutor.objects.get(id=tutor['id'],active=True)
                    instance.external_tutors.add(t)
                    assign_project_to_tutor_notification(inscription_id=instance.id, tutor_id=t.id,
                                                         user_action_id=user.id)
                    send_assign_project_to_tutor.delay(inscription_pk=instance.id, tutor_pk=t.id)
                except Tutor.DoesNotExist:
                    pass

        # add notification
        for student in instance.authors.filter(active=True).exclude(pk=user.id):
            assign_project_notification(inscription_id=instance.id, student_id=student.id, user_action_id=user.id)
            send_assign_project_to_student.delay(inscription_pk=instance.id, student_pk=student.id)


            for old_project in student.sprojects.filter(state=Inscription.UNDER_DEVELOPMENT).exclude(pk=instance.pk):
                if old_project.authors.count() == 1:
                    old_project.state = Inscription.ABANDONED
                    old_project.save()


        for document in instance.modality.documents.filter(active=True):
            InscriptionDocument.objects.create(inscription=instance,
                                               document=document,
                                               deadline_date= self.get_date(instance.date_init,instance.date_end,document.time_send),
                                               )

        for document in instance.modality.document_inscription.filter(active=True):
            InscriptionInitialDocument.objects.create(inscription=instance,
                                               document=document,
                                               deadline_date= self.get_date(instance.date_init,instance.date_end,document.time_send),
                                               )



        #notification


        return instance

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer,instance)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}
        data = InscriptionCompleteModelSerializer(instance).data
        return Response(data)

    def perform_update(self, serializer,instance):
        serializer.save()
        data = self.request.data

        if 'tutors' in data:
            tutors = data['tutors']
            not_delete_tutors = [] # save array id from tutors registereds
            for tutor in tutors:
                try:
                    if not instance.tutors.filter(pk=tutor['id']).exists():
                        new_tutor = Tutor.objects.get(id=tutor['id'], active=True)
                        instance.tutors.add(new_tutor)
                        not_delete_tutors.append(tutor['id'])
                        ## send email
                        send_assign_project_to_tutor.delay(inscription_pk=instance.id, tutor_pk=new_tutor.id)
                    else:
                        not_delete_tutors.append(tutor['id'])

                except Tutor.DoesNotExist:
                    pass

            for remove_tutor in instance.tutors.exclude(pk__in=not_delete_tutors):
                # send email down project to tutor
                send_email_disassociate_project_to_tutor(inscription_pk=instance.id, tutor_pk=remove_tutor.id)
                # send_email_down
                instance.tutors.remove(remove_tutor)



        if 'external_tutors' in data:
            external_tutors = data['external_tutors']
            instance.external_tutors.clear()
            not_delete_etutors = []

            for tutor in external_tutors:
                try:
                    if not instance.external_tutors.filter(pk=tutor['id']).exists():
                        new_tutor = ExternalTutor.objects.get(id=tutor['id'],active=True)
                        instance.external_tutors.add(new_tutor)
                        not_delete_etutors.append(tutor['id'])
                        # send mail
                        send_assign_project_to_tutor.delay(inscription_pk=instance.id, tutor_pk=new_tutor.id)
                    else:
                        not_delete_etutors.append(tutor['id'])

                except Tutor.DoesNotExist:
                    pass

            for remove_tutor in instance.external_tutors.exclude(pk__in=not_delete_etutors):

                send_email_disassociate_project_to_tutor(inscription_pk=instance.id, tutor_pk=remove_tutor.id)
                # send email down project to tutor
                instance.external_tutors.remove(remove_tutor)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # if instance :
        #     return Response({'detail': _(
        #         "Some modalities depends of this register, you can't delete until you delete all its dependencies")},
        #                     status=status.HTTP_400_BAD_REQUEST)

        self.perform_destroy(instance, request.user)
        return Response(status=status.HTTP_204_NO_CONTENT)


    @action(detail=True,methods=["GET"])
    def documents(self,request, *args, **kwargs):
        """ this method get all of documents """
        inscription = self.get_object()

        documents= inscription.documents.filter(active=True)
        initialdocuments = inscription.initialdocuments.filter(active=True)
        data = {
            'documents': InscriptionDocumentModelSerializer(documents,many=True).data,
            'document_inscription':InscriptionInitialDocumentModelSerializer(initialdocuments,many=True).data,
        }
        return Response(data)

    @action(detail=True,methods=["GET"])
    def months_of_work(self,request, *args, **kwargs):
        """ this method get all of documents """
        inscription = self.get_object()
        data = {
            'months': get_date_months(inscription.date_init,inscription.date_end)
        }
        return Response(data)

    @action(detail=True,methods=["POST"])
    def add_author(self,request,*args,**kwargs):
        inscription = self.get_object()
        serializer = UserCheckStudentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        author = Student.objects.get(pk=request.data["user"])
        inscription.authors.add(author)
        return Response(InscriptionCompleteModelSerializer(inscription).data)

    @action(detail=True,methods=["POST"])
    def remove_author(self,request,*args,**kwargs):
        inscription = self.get_object()
        serializer = ArrayStudentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        author = Student.objects.get(pk=request.data["user"])
        inscription.authors.remove(author)
        return Response(InscriptionCompleteModelSerializer(inscription).data)

    @action(detail=True,methods=['POST'])
    def add_authors(self,request,*args,**kwargs):
        inscription = self.get_object()
        serializer = ArrayStudentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        id_students = sorted(set(request.data['users']))

        if len(id_students) > inscription.modality.config.max_author :
            return Response({'detail':_("Not allowed more authors.")},status.HTTP_400_BAD_REQUEST)

        if len(id_students) == 0 :
            return Response({'detail': _("At least one user.")}, status.HTTP_400_BAD_REQUEST)

        not_delete_authors=[]
        for id in id_students:

            try:
                if not inscription.authors.filter(pk=4).exists():
                    author = Student.objects.get(pk=str(id), active=True)
                    inscription.authors.add(author)
                    not_delete_authors.append(id)
                    # send mail
                    send_assign_project_to_student.delay(inscription_pk=inscription.id, student_pk=author.id)
                else:
                    not_delete_authors.append(id)

            except Student.DoesNotExist:
                pass
        #
        for remove_author in inscription.authors.exclude(pk__in=not_delete_authors):
            # send_email_disassociate_project_to_tutor(inscription_pk=instance.id, tutor_pk=remove_tutor.id)
            # send email down project to tutor
            inscription.authors.remove(remove_author)

        return Response(InscriptionCompleteModelSerializer(inscription).data)

    @action(detail=False,methods=['POST'])
    def update_projects(self, request, *args, **kwargs):
        queryset = Inscription.objects.all()
        for instance in queryset:
            instance.authors.add(instance.student)
        return Response({'detail':"ok"})

    @action(detail=True, methods=["POST"])
    def update_dates(self, request, *args, **kwargs):
        """ this method get all of documents """
        inscription = self.get_object()
        data = request.data
        serializer = InscriptionDatelogSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        DateLog.objects.create(inscription=inscription,
                               date_init=data['date_init'],
                               date_end=data['date_end'],
                               date_init_old=inscription.date_init,
                               date_end_old=inscription.date_end,
                               note=data['note'],
                               created_by = self.request.user.id ,
                               )

        inscription.date_end_old = inscription.date_end
        inscription.date_init = data['date_init']
        inscription.date_end = data['date_end']
        inscription.extended = True
        inscription.save()

        return Response(InscriptionCompleteModelSerializer(inscription).data)

    @action(detail=True, methods=["GET"])
    def datelogs(self, request, *args, **kwargs):
        """ this method get all of documents """
        inscription = self.get_object()
        return Response(DateLogModelSerializer(inscription.datelogs,many=True).data)


class InscriptionByTutorsViewSet(
    # mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            # mixins.UpdateModelMixin,
                            # mixins.DestroyModelMixin,
                            mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """User viewset """
    queryset =  Inscription.objects.filter(active=True)
    serializer_class = InscriptionModelSerializerForTutor
    pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('-academic_period__created_at','title_academic_project',)
    ordering_fields = ('title_academic_project', 'created_at')
    search_fields = ('title_academic_project','student__first_name','student__last_name')
    filterset_fields = ['academic_period','modality','state']

    permission_classes = [IsAuthenticated,IsAccountAdminOrTutor]

    def dispatch(self, request, *args, **kwargs):
        """Verify that the circle exists."""
        tutor_id = kwargs['tutor_id']
        self.user = get_object_or_404(User, pk=tutor_id)
        if not (self.user.type == User.TUTOR or self.user.type == User.EXTERNAL_TUTOR):
            raise Http404

        self.tutor  = Tutor.objects.get(pk=self.user.pk) if self.user.type == User.TUTOR  else ExternalTutor.objects.get(pk=self.user.pk)
        return super(InscriptionByTutorsViewSet, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):

        tutor = self.tutor
        if tutor.type == User.TUTOR:
            return tutor.tutor_projects.filter(active=True)

        if tutor.type == User.EXTERNAL_TUTOR:
            return tutor.etutor_projects.filter(active=True)
        return []



class InscriptionByStudentViewSet(
                            mixins.RetrieveModelMixin,
                            mixins.ListModelMixin,
                            viewsets.GenericViewSet):
    """User viewset """
    queryset =  Inscription.objects.filter(active=True)
    serializer_class = InscriptionModelSerializerForStudent
    pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('-academic_period__created_at','-created_at',)
    ordering_fields = ('title_academic_project', 'created_at')
    search_fields = ('title_academic_project',)
    filterset_fields = ['academic_period','modality','state']
    permission_classes = [IsAuthenticated]

    def dispatch(self, request, *args, **kwargs):
        """Verify that the circle exists."""
        student_id = kwargs['student_id']
        self.student = get_object_or_404(Student, pk=student_id)
        return super(InscriptionByStudentViewSet, self).dispatch(request, *args, **kwargs)

    def get_queryset(self):
        student = self.student
        return student.sprojects.filter(active=True)


class InscriptionReportViewSet(mixins.ListModelMixin,
                               viewsets.GenericViewSet):
    """User viewset """
    queryset =  Inscription.objects.filter(active=True,state=Inscription.UNDER_DEVELOPMENT)
    serializer_class = InscriptionReportModelSerializer
    pagination_class = CustomPagination

    filter_backends = (SearchFilter, OrderingFilter, DjangoFilterBackend)
    ordering = ('title_academic_project','-created_at',)
    ordering_fields = ('title_academic_project', 'created_at')
    search_fields = ('title_academic_project','authors__last_name','authors__last_name2','authors__first_name','authors__CI')
    filterset_fields = ['academic_period','modality','state']

    # def dispatch(self, request, *args, **kwargs):
    #     """Verify that the circle exists."""
    #     student_id = kwargs['student_id']
    #     self.student = get_object_or_404(Student, pk=student_id)
    #     return super(InscriptionByStudentViewSet, self).dispatch(request, *args, **kwargs)







