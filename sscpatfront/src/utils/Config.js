import HOST from "./global";

class Config{
    
    static loginUrl= HOST + "/api/auth/login/"
    static refreshApiUrl = HOST + "/api/auth/refresh/"
    static userSignUp =  HOST + "/api/users/signup/"
    static UserApiUrl = HOST + "/api/users/"
    static UpdatePasswordApiUrl = HOST + "/api/users/updatepassword/"
    static UpdateUserPasswordApiUrl = HOST + "/api/users/updateuserpassword/"
    static UpdateUserAccessApiUrl = HOST + "/api/users/updateuseraccess/"
    static TutorApiUrl = HOST + "/api/tutors/"
    static TutorListApiUrl = HOST + "/api/tutorslist/"
    static ExternalTutorApiUrl = HOST + "/api/etutors/"
    static ExternalTutorListApiUrl = HOST + "/api/etutorslist/"
    static StudentApiUrl = HOST + "/api/students/"
    static StudentListApiUrl = HOST + "/api/studentslist/"
    // static UserPictureApiUrl = HOST + "/api/userpictures/"
    static AcademicPeriodApiUrl =  HOST + "/api/academicperiods/"
    static DocumentsApiUrl = HOST + "/api/documents/"
    static ModalitiesApiUrl = HOST + "/api/modalities/"
    static InstitutionsApiUrl = HOST + "/api/institutions/"

    static ProjectsApiUrl = HOST + "/api/inscriptions/"
    static ProjectDocumentApiUrl = HOST + "/api/inscriptionsdocument/"
    static ProjectInitialDocumentApiUrl = HOST + "/api/inscriptionsinitialdocument/"
    static TracingStudentApiUrl = HOST + "/api/tracingstudent/"
    static NotificationApiUrl = HOST + "/api/notifications/"
    static InfoApiUrl = HOST + "/api/info/"

    // static TypeReportApiUrl = HOST + "/api/typereports/"
    // static ReportApiUrl = HOST + "/api/reports/"
    // static FileReportApiUrl = HOST + "/api/filereports/"
    // static ServiceApiUrl = HOST + "/api/services/"
    // static AttentionApiUrl = HOST + "/api/attentions/"
    // static MedicalHistoryApiUrl = HOST + "/api/medicalhistories/"

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
    static aReportsUrl                      ="/reportes";
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
        {"index":"0","title":"Escritorio","url":this.HomeUrl,"icon":"home","subItems":[]},
        // {"index":"1","title":"Inscripción","url":this.aInscriptionUrl,"icon":"assessment","subItems":[]},
        {"index":"2","title":"Tutores","url":"/#","icon":"accessibility",
         "subItems":[
            {"index":"20","title":"Agregar Tutor","url":this.aTutorNewUrl,"icon":"home","subItems":[]},
            {"index":"21","title":"Tutores","url":this.aTutorUrl,"icon":"home","subItems":[]},
            {"index":"22","title":"Tutores Externos","url":this.aETutorUrl,"icon":"home","subItems":[]},
         ]
        },
        {"index":"3","title":"Estudiantes","url":"/#","icon":"face",
        "subItems":[
            {"index":"30","title":"Agregar estudiante","url":this.aStudentsNewUrl,"icon":"home","subItems":[]},
            {"index":"31","title":"Estudiantes","url":this.aStudentsUrl,"icon":"home","subItems":[]},
        ]},
        {"index":"4","title":"Proyectos","url":"","icon":"class",
        "subItems":[
            {"index":"40","title":"Proyectos","url":this.aProjectsUrl,"icon":"","subItems":[]},
        ]},
        {"index":"5","title":"Configuración","url":"","icon":"settings",
        "subItems":[
            {"index":"50","title":"Nuevo Usuario","url":this.aUserNewUrl,"icon":"","subItems":[]},
            {"index":"51","title":"Usuarios","url":this.aUsersUrl,"icon":"","subItems":[]},
            {"index":"52","title":"Periodo académico","url":this.aPeriodsUrl,"icon":"","subItems":[]},
            {"index":"53","title":"Modalidades de titulación","url":this.aModalitiesUrl,"icon":"","subItems":[]},
            {"index":"54","title":"Documentos","url":this.aDocumentsUrl,"icon":"","subItems":[]},
            {"index":"55","title":"Instituciones","url":this.aInstitutionsUrl,"icon":"","subItems":[]},
        ]},
        {"index":"6","title":"Reportes","url":this.aReportsUrl,"icon":"account_balance","subItems":[]},
    ]

    static sidebarTutorItem=[
        {"index":"0","title":"Escritorios","url":this.tHomeUrl,"icon":"home","subItems":[]},
        {"index":"3","title":"Estudiantes","url":this.tStudentsUrl,"icon":"face","subItems":[]},
        {"index":"4","title":"Proyectos","url":this.tProjectsUrl,"icon":"class","subItems":[]},
        // {"index":"5","title":"Configuracion","url":this.aConfigUrl,"icon":"settings","subItems":[]},
        // {"index":"6","title":"Reportes","url":this.aReportsUrl,"icon":"account_balance","subItems":[]},
    ]

    static sidebarStudentItem=[
        {"index":"0","title":"Escritorios","url":this.sHomeUrl,"icon":"home","subItems":[]},
        {"index":"4","title":"Mi proyecto","url":this.sProjectUrl,"icon":"class","subItems":[]},
        // {"index":"6","title":"Reportes","url":this.sReportsUrl,"icon":"account_balance","subItems":[]},
    ]

    static language = 'es'
} 

export default Config;