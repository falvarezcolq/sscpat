""" Routes DogCenter """

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import  TokenRefreshView


from sscpat.sscpat.api.views import *
from sscpat.sscpat import views


router = DefaultRouter()

router.register("users",viewset=UserViewSet)
router.register("tutors",viewset=TutorViewSet)
router.register("tutorslist",viewset=TutorListViewSet)
router.register("tutorsreport",viewset=TutorReportListViewSet)
router.register("etutors",viewset=ExternalTutorViewSet)
router.register("etutorslist",viewset=ExternalTutorListViewSet)
router.register("students",viewset=StudentViewSet)
router.register("students/(?P<tutor_id>[0-9]+)/bytutors",viewset=StudentByTutorViewSet)
router.register("studentslist",viewset=StudentListViewSet)
router.register("academicperiods",viewset=AcademicPeriodViewSet)
router.register("documents",viewset=DocumentViewSet)
router.register("modalities",viewset=ModalityViewSet)
router.register("inscriptions",viewset=InscriptionViewSet)
router.register("inscriptionsdocument",viewset=InscriptionDocumentViewSet)
router.register("inscriptionsinitialdocument",viewset=InscriptionInitialDocumentViewSet)
router.register("institutions",viewset=InstitutionViewSet)
router.register("inscriptions/(?P<tutor_id>[0-9]+)/bytutors",viewset=InscriptionByTutorsViewSet)
router.register("inscriptions/(?P<student_id>[0-9]+)/bystudents",viewset=InscriptionByStudentViewSet)
router.register("inscriptions/(?P<student_id>[0-9]+)/bystudents",viewset=InscriptionByStudentViewSet)
router.register("inscriptions/(?P<inscription_id>[0-9]+)/tracing",viewset=TracingStudentViewSet)
router.register("inscriptions/(?P<inscription_id>[0-9]+)/report",viewset=TracingStudentReportViewSet)
router.register("tracingstudentfile",viewset=TracingStudentFileViewSet)
router.register("tracingstudent",viewset=TracingStudentDetailViewSet)
router.register("tracingstudent/(?P<tracingstudent_id>[0-9]+)/tracingprogress",viewset=TracingProgressViewSet)
router.register("notifications",viewset=NotificationsViewSet)
# router.register("info",viewset=InfoView)




urlpatterns = [
    path('',views.init_page),
    path('api/', include(router.urls)),
    path('api/auth/login/', TokenObtainPairView.as_view(),name="gettoken"),
    path('api/auth/refresh/', TokenRefreshView.as_view(),name="refreshtoken"),
    path('api/auth/datasession/', DataSessionApiView.as_view(),name="datasession"),
    path('api/info/',InfoView.as_view(),name="info")

    ]