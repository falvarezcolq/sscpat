class Config{
    
    static loginUrl="http://127.0.0.1:8000/api/auth/login/"
    static refreshApiUrl ="http://127.0.0.1:8000/api/auth/refresh/"
    static userSignUp = "http://127.0.0.1:8000/api/users/signup/"
    static UserApiUrl ="http://127.0.0.1:8000/api/users/"
    static UpdatePasswordApiUrl ="http://127.0.0.1:8000/api/users/updatepassword/"
    static UpdateUserPasswordApiUrl ="http://127.0.0.1:8000/api/users/updateuserpassword/"
    static TutorApiUrl ="http://127.0.0.1:8000/api/tutors/"
    static TutorListApiUrl ="http://127.0.0.1:8000/api/tutorslist/"
    static ExternalTutorApiUrl ="http://127.0.0.1:8000/api/etutors/"
    static ExternalTutorListApiUrl ="http://127.0.0.1:8000/api/etutorslist/"
    static StudentApiUrl ="http://127.0.0.1:8000/api/students/"
    static StudentListApiUrl ="http://127.0.0.1:8000/api/studentslist/"
    // static UserPictureApiUrl ="http://127.0.0.1:8000/api/userpictures/"
    static AcademicPeriodApiUrl = "http://127.0.0.1:8000/api/academicperiods/"
    static DocumentsApiUrl ="http://127.0.0.1:8000/api/documents/"
    static ModalitiesApiUrl ="http://127.0.0.1:8000/api/modalities/"
    static InstitutionsApiUrl ="http://127.0.0.1:8000/api/institutions/"

    static ProjectsApiUrl ="http://127.0.0.1:8000/api/inscriptions/"
    static ProjectDocumentApiUrl ="http://127.0.0.1:8000/api/inscriptionsdocument/"
    static ProjectInitialDocumentApiUrl ="http://127.0.0.1:8000/api/inscriptionsinitialdocument/"
    static TracingStudentApiUrl ="http://127.0.0.1:8000/api/tracingstudent/"
    static NotificationApiUrl ="http://127.0.0.1:8000/api/notifications/"
    static InfoApiUrl ="http://127.0.0.1:8000/api/info/"

    // static TypeReportApiUrl ="http://127.0.0.1:8000/api/typereports/"
    // static ReportApiUrl ="http://127.0.0.1:8000/api/reports/"
    // static FileReportApiUrl ="http://127.0.0.1:8000/api/filereports/"
    // static ServiceApiUrl ="http://127.0.0.1:8000/api/services/"
    // static AttentionApiUrl ="http://127.0.0.1:8000/api/attentions/"
    // static MedicalHistoryApiUrl ="http://127.0.0.1:8000/api/medicalhistories/"

    static baseUrl="/"
    static logoutPageUrl="/logout";
    static updateMyPasswordUrl = "/actualizar/credenciales"

    static HomeUrl="/escritorio";
    
    static aTutorUrl                        ="/tutores";
    static aTutorIDUrl                      ="/tutores/:id";
    static aTutorNewUrl                     ="/tutores_nuevo";

    static aETutorUrl                        ="/e_tutores";
    static aETutorIDUrl                      ="/e_tutores/:id";
    static aETutorNewUrl                     ="/e_tutores_nuevo";

    static aStudentsUrl                     ="/estudiantes";
    static aStudentsNewUrl                  ="/estudiantes_nuevo";
    static aStudentsIdUrl                  ="/estudiantes/:id";
    
    static aProjectsUrl                     ="/proyectos";
    static aProjectsNewUserIdUrl            ="/proyectos/nuevo/:id";
    static aProjectsNewUrl                  ="/proyectos/nuevo/";
    static aProjectsUpdateIdUrl             ="/proyectos/actualizar/:id";
    static aProjectsUpdateUrl               ="/proyectos/actualizar/";
    static aProjectsIdUrl                   ="/proyectos/:id";
    static aProjectsReportIdUrl             ="/proyectos/report/:id";
    static aProjectsReportUrl               ="/proyectos/report/";
    static aProjectsDocumentIdUrl             ="/proyectos/document/:id";
    static aProjectsDocumentUrl               ="/proyectos/document/";

    static aProjectStateIdUrl             ="/proyectos/estado/:id";
    static aProjectStateUrl               ="/proyectos/estado/";

    static aProjectTimeIdUrl             ="/proyectos/tiempo/:id";
    static aProjectTimeUrl               ="/proyectos/tiempo/";
 
    
    static aConfigUrl                       ="/config";
    static aUserNewUrl                      ="/usuario_nuevo";
    static aUsersUrl                        ="/usuarios";
    static aUserIdEditUrl                   ="/usuarios/:id";
    static aUserIdUpdatePasswordtUrl         ="/usuarios/:id/password";

    static aPeriodsUrl                      ="/periodo_academico";
    static aPeriodsNewUrl                      ="/periodo_academico_nuevo";
    static aPeriodsIdUrl                      ="/periodo_academico/:id";
   

    static aModalitiesUrl                       ="/modalidad";
    static aModalitiesNewUrl                    ="/modalidad_nuevo";
    static aModalitiesIdUrl                     ="/modalidad/:id";
    

    static aDocumentsUrl                       ="/documentos";
    static aDocumentsNewUrl                    ="/documentos_nuevo";
    static aDocumentsIdUrl                     ="/documentos/:id";

    static aInstitutionsUrl                       ="/instituciones";
    static aInstitutionsNewUrl                    ="/instituciones_nuevo";
    static aInstitutionsIdUrl                     ="/instituciones/:id";

    static aProgressUrl                     ="/avance";
    static aProgressIdUrl                   ="/avance/:id";

    static aNotificationUrl                 ="/notificaciones"
    
    static aReportsUrl                      ="/informes";

    static tHomeUrl="/tutor/";
    static tStudentsUrl="/tutor/estudiantes";
    static tStudentAdvanceUrl="/tutor/estudiantes/avance";
    static tStudentAdvanceReportUrl="/tutor/estudiantes/avance/revision";
    static tProjectsUrl="/tutor/proyectosasignados";


    static sHomeUrl="/home/";
    static sProjectUrl="/myproject";
    // static sProjectRevisionsUrl="/project/revisions";
    // static sNewAdvanceUrl="/project/nuevoavance";
 

    static sidebarAdminItem=[
        {"index":"0","title":"Escritorio","url": Config.HomeUrl,"icon":"home","subItems":[]},
        // {"index":"1","title":"Inscripción","url": Config.aInscriptionUrl,"icon":"assessment","subItems":[]},
        {"index":"2","title":"Tutores","url":"/#","icon":"accessibility",
         "subItems":[
            {"index":"20","title":"Agregar Tutor","url": Config.aTutorNewUrl,"icon":"home","subItems":[]},
            {"index":"21","title":"Tutores","url": Config.aTutorUrl,"icon":"home","subItems":[]},
            {"index":"22","title":"Tutores Externos","url": Config.aETutorUrl,"icon":"home","subItems":[]},
         ]
        },
        {"index":"3","title":"Estudiantes","url":"/#","icon":"face",
        "subItems":[
            {"index":"30","title":"Agregar estudiante","url": Config.aStudentsNewUrl,"icon":"home","subItems":[]},
            {"index":"31","title":"Estudiantes","url": Config.aStudentsUrl,"icon":"home","subItems":[]},
        ]},
        {"index":"4","title":"Proyectos","url":"","icon":"class",
        "subItems":[
            {"index":"40","title":"Proyectos","url": Config.aProjectsUrl,"icon":"","subItems":[]},
        ]},
        {"index":"5","title":"Configuración","url":"","icon":"settings",
        "subItems":[
            {"index":"50","title":"Nuevo Usuario","url": Config.aUserNewUrl,"icon":"","subItems":[]},
            {"index":"51","title":"Usuarios","url": Config.aUsersUrl,"icon":"","subItems":[]},
            {"index":"52","title":"Periodo académico","url": Config.aPeriodsUrl,"icon":"","subItems":[]},
            {"index":"53","title":"Modalidades de titulación","url": Config.aModalitiesUrl,"icon":"","subItems":[]},
            {"index":"54","title":"Documentos","url": Config.aDocumentsUrl,"icon":"","subItems":[]},
            {"index":"55","title":"Instituciones","url": Config.aInstitutionsUrl,"icon":"","subItems":[]},
        ]},
        {"index":"6","title":"Reportes","url": Config.aReportsUrl,"icon":"account_balance","subItems":[]},
    ]

    static sidebarTutorItem=[
        {"index":"0","title":"Escritorios","url": Config.tHomeUrl,"icon":"home","subItems":[]},
        {"index":"3","title":"Estudiantes","url": Config.tStudentsUrl,"icon":"face","subItems":[]},
        {"index":"4","title":"Proyectos","url": Config.tProjectsUrl,"icon":"class","subItems":[]},
        // {"index":"5","title":"Configuracion","url": Config.aConfigUrl,"icon":"settings","subItems":[]},
        // {"index":"6","title":"Reportes","url": Config.aReportsUrl,"icon":"account_balance","subItems":[]},
    ]

    static sidebarStudentItem=[
        {"index":"0","title":"Escritorios","url": Config.sHomeUrl,"icon":"home","subItems":[]},
        {"index":"4","title":"Mi proyecto","url": Config.sProjectUrl,"icon":"class","subItems":[]},
        // {"index":"6","title":"Reportes","url": Config.sReportsUrl,"icon":"account_balance","subItems":[]},
    ]

    static language = 'es'
} 

export default Config;