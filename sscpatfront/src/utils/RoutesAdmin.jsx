
import React from "react";
// import AuthHandler from "./AuthHandler";
import Config from "./Config";
import PrivateRoute from "./PrivateRoute";
import HomeComponent from "../pages/admin/HomeComponent";
import Tutors from "../pages/admin/tutor/Tutors";
import TutorAdd from "../pages/admin/tutor/TutorAdd";
import StudentAdd from "../pages/admin/student/StudentAdd";
import Students from "../pages/admin/student/Students";
import UserAdd from "../pages/admin/config/UserAdd";
import UserEdit from "../pages/admin/config/UserEdit";
import Users from "../pages/admin/config/Users";
import TutorDetail from "../pages/admin/tutor/TutorDetail";
import AcademicPeriods from "../pages/admin/academicperiod/AcademicPeriods";
import AcademicPeriodsCreate from "../pages/admin/academicperiod/AcademicPeriodsCreate";
import AcademicPeriodsUpdate from "../pages/admin/academicperiod/AcademicPeriodsUpdate";
import Modalities from "../pages/admin/modalities/Modalities";
import Documents from "../pages/admin/documents/Documents";
import DocumentsUpdate from "../pages/admin/documents/DocumentsUpdate";
import DocumentsCreate from "../pages/admin/documents/DocumentsCreate";
import ModalitiesCreate from "../pages/admin/modalities/ModalitiesCreate";
import ModalitiesUpdate from "../pages/admin/modalities/ModalitiesUpdate";
import StudentDetail from "../pages/admin/student/StudentDetail";
import ProjectsCreate from "../pages/admin/projects/ProjectsCreate";
import Institutions from "../pages/admin/institutions/Institutions";
import InstitutionsCreate from "../pages/admin/institutions/InstitutionsCreate";
import InstitutionsUpdate from "../pages/admin/institutions/InstitutionsUpdate";
import Projects from "../pages/admin/projects/Projects";
import ProjectsDetail from "../pages/admin/projects/ProjectsDetail";
import ProjectsUpdate from "../pages/admin/projects/ProjectsUpdate";

//tutor
import TDetail from '../pages/tutors/tutors/TutorDetail';

//student
import SDetail from "../pages/student/student/StudentDetail";
import ExternalTutors from "../pages/admin/tutor/ExternalTutors";
import UpdatePassword from "../pages/user/UpdatePassword";
import UpdateUserPassword from "../pages/admin/config/UpdateUserPassword";
import CurrentProject from "../pages/student/projects/CurrentProject";
import ProgressDetail from "../pages/admin/progress/ProgressDetail";
import ListStudents from "../pages/tutors/students/ListStudents";
import ListProjects from "../pages/tutors/projects/ListProjects";
import ExternalTutorDetail from "../pages/admin/tutor/ExternalTutorDetail";
import ProjectState from "../pages/admin/projects/ProjectState";
import ProjectsTimeExtended from "../pages/admin/projects/ProjectsTimeExtended";
import ProjectsDetailReport from "../pages/admin/projects/ProjectsDetailReport";
import ProjectsDocument from "../pages/admin/projects/ProjectsDocument";
import Notifications from "../pages/user/Notifications";
import Reports from "../pages/admin/Reports/Reports";
import TutorsReport from "../pages/admin/Reports/TutorsReport";


const RoutesAdmin = () => {
  return (
    <>
      <PrivateRoute
        exact
        path={Config.HomeUrl}
        activepage="0"
        activepage2="0"
        page={HomeComponent}
      />

     <PrivateRoute
        exact
        path={Config.updateMyPasswordUrl}
        activepage="0"
        activepage2="0"
        page={UpdatePassword}
      />

      {/* Routes Tutors active page:2 */}
      <PrivateRoute
        exact
        path={Config.aTutorNewUrl}
        activepage="2"
        activepage2="20"
        page={TutorAdd}
      />
      <PrivateRoute
        exact
        path={Config.aTutorUrl}
        activepage="2"
        activepage2="21"
        page={Tutors}
      />
      
      <PrivateRoute
        exact
        path={Config.aTutorIDUrl}
        activepage="2"
        activepage2="21"
        page={TutorDetail}
      />


      <PrivateRoute
        exact
        path={Config.aETutorUrl}
        activepage="2"
        activepage2="22"
        page={ExternalTutors}
      />
      
      <PrivateRoute
        exact
        path={Config.aETutorIDUrl}
        activepage="2"
        activepage2="22"
        page={ExternalTutorDetail}
      />
      

      {/* Routes Students active page:3 */}
      <PrivateRoute
        exact
        path={Config.aStudentsNewUrl}
        activepage="3"
        activepage2="30"
        page={StudentAdd}
      />
      <PrivateRoute
        exact
        path={Config.aStudentsUrl}
        activepage="3"
        activepage2="31"
        page={Students}
      />
      <PrivateRoute
        exact
        path={Config.aStudentsIdUrl}
        activepage="3"
        activepage2="31"
        page={StudentDetail}
      />

      {/* Routes Proyects active page:4 */}
      <PrivateRoute
        exact
        path={Config.aProjectsUrl}
        activepage="4"
        activepage2="40"
        page={Projects}
      />

      <PrivateRoute
        exact
        path={Config.aProjectsNewUserIdUrl}
        activepage="4"
        activepage2="40"
        page={ProjectsCreate}
      />

      <PrivateRoute
        exact
        path={Config.aProjectsIdUrl}
        activepage="4"
        activepage2="40"
        page={ProjectsDetail}
      />

      <PrivateRoute
        exact
        path={Config.aProjectsReportIdUrl}
        activepage="4"
        activepage2="40"
        page={ProjectsDetailReport}
      />

      <PrivateRoute
        exact
        path={Config.aProjectsDocumentIdUrl}
        activepage="4"
        activepage2="40"
        page={ProjectsDocument}
      />

      <PrivateRoute
        exact
        path={Config.aProjectsUpdateIdUrl}
        activepage="4"
        activepage2="40"
        page={ProjectsUpdate}
      />

      <PrivateRoute
        exact
        path={Config.aProjectStateIdUrl}
        activepage="4"
        activepage2="40"
        page={ProjectState}
      />

      <PrivateRoute
        exact
        path={Config.aProjectTimeIdUrl}
        activepage="4"
        activepage2="40"
        page={ProjectsTimeExtended}
      />


      <PrivateRoute
        exact
        path={Config.aProgressIdUrl}
        activepage="4"
        activepage2="40"
        page={ProgressDetail}
      />





      {/* Routes Config active page:5 */}

      <PrivateRoute
        exact
        path={Config.aUserNewUrl}
        activepage="5"
        activepage2="50"
        page={UserAdd}
      />

      {/* Config User */}
      <PrivateRoute
        exact
        path={Config.aUsersUrl}
        activepage="5"
        activepage2="51"
        page={Users}
      />
     <PrivateRoute
        exact
        path={Config.aUserIdUpdatePasswordtUrl }
        activepage="5"
        activepage2="51"
        page={UpdateUserPassword}
      />
      <PrivateRoute
        exact
        path={Config.aUserIdEditUrl}
        activepage="5"
        activepage2="51"
        page={UserEdit}
      />
     

      {/* Config academics periods */}
      <PrivateRoute
        exact
        path={Config.aPeriodsUrl}
        activepage="5"
        activepage2="52"
        page={AcademicPeriods}
      />

      <PrivateRoute
        exact
        path={Config.aPeriodsNewUrl}
        activepage="5"
        activepage2="52"
        page={AcademicPeriodsCreate}
      />

      <PrivateRoute
        exact
        path={Config.aPeriodsIdUrl}
        activepage="5"
        activepage2="52"
        page={AcademicPeriodsUpdate}
      />

      {/* Config modalities */}
      <PrivateRoute
        exact
        path={Config.aModalitiesUrl}
        activepage="5"
        activepage2="53"
        page={Modalities}
      />

      <PrivateRoute
        exact
        path={Config.aModalitiesNewUrl}
        activepage="5"
        activepage2="53"
        page={ModalitiesCreate}
      />
      <PrivateRoute
        exact
        path={Config.aModalitiesIdUrl}
        activepage="5"
        activepage2="53"
        page={ModalitiesUpdate}
      />

      {/* Documents */}

      <PrivateRoute
        exact
        path={Config.aDocumentsUrl}
        activepage="5"
        activepage2="54"
        page={Documents}
      />

      <PrivateRoute
        exact
        path={Config.aDocumentsNewUrl}
        activepage="5"
        activepage2="54"
        page={DocumentsCreate}
      />

      <PrivateRoute
        exact
        path={Config.aDocumentsIdUrl}
        activepage="5"
        activepage2="54"
        page={DocumentsUpdate}
      />

      {/* institutions  55 */}
      <PrivateRoute
        exact
        path={Config.aInstitutionsUrl}
        activepage="5"
        activepage2="55"
        page={Institutions}
      />

      <PrivateRoute
        exact
        path={Config.aInstitutionsNewUrl}
        activepage="5"
        activepage2="55"
        page={InstitutionsCreate}
      />

      <PrivateRoute
        exact
        path={Config.aInstitutionsIdUrl}
        activepage="5"
        activepage2="55"
        page={InstitutionsUpdate}
      />

      <PrivateRoute
        exact
        path={Config.aReportsUrl}
        activepage="6"
        activepage2="0"
        page={Reports}
      />

      <PrivateRoute
        exact
        path={Config.aReportsTutorsUrl}
        activepage="6"
        activepage2="0"
        page={TutorsReport}
      />

      
      {/*//////////////////// user Notifications //////////////////////*/}
      <PrivateRoute
        exact
        path={Config.aNotificationUrl}
        activepage="0"
        activepage2="0"
        page={Notifications}
      />
       
      {/*//////////////////// Tutor Pages //////////////////////*/}
      <PrivateRoute
        exact
        path={Config.tHomeUrl}
        activepage="0"
        activepage2="0"
        page={TDetail}
      />

      <PrivateRoute
        exact
        path={Config.tStudentsUrl}
        activepage="3"
        activepage2="0"
        page={ListStudents}
      />

      <PrivateRoute
        exact
        path={Config.tProjectsUrl}
        activepage="4"
        activepage2="0"
        page={ListProjects}
      />
      
      {/*//////////////////// StudentPage //////////////////////*/}
      <PrivateRoute
        exact
        path={Config.sHomeUrl}
        activepage="0"
        activepage2="0"
        page={SDetail}
      />

      <PrivateRoute
        exact
        path={Config.sProjectUrl}
        activepage="0"
        activepage2="0"
        page={CurrentProject}
      />
      
    </>
  );
};

export default RoutesAdmin;
