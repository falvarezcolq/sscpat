import React from "react";
// import { getNameMonth } from "../../actions/helper";
import Config from "../../utils/Config";
import {Link} from "react-router-dom";
import { getNameDateMonth } from "../../actions/helper";

// const NOTHING = "0";
// const ACCOUNT_CREATED = "1";
// const ACCOUNT_ADD = "2";
const WELCOME = "3";
const PROJECT_ASSIGNED = "4";
const PROJECT_ASSIGNED_TO_TUTOR = "5";
const PROGRESS_PROJECT_UPLOADED = "6";
const TRACING_PROGRESS_UPLOADED = "7";
// const INSTITUTION_REPORT_UPLOADED = "8";

// const ADMIN = "ADMIN";
const INTERNAL_TUTOR = "INTERNAL_TUTOR";
// const EXTERNAL_TUTOR = "EXTERNAL_TUTOR";
const INSTITUTION_REPORT = "INSTITUTION_REPORT";
const COMMENT = "COMMENT";

const NotificationText = (props) => {
  const { notification } = props;
  const {
    user,
    user_action,
    inscription,
    tracing_student,
    tracing_progress,
    // format,
    // is_read,
  } = notification;

  const name_user = (
    <strong>
      {user.first_name + " " + user.last_name + " " + user.last_name2 + " "}
    </strong>
  );
  const name_user_action = (
    <strong>
      {user_action.first_name +
        " " +
        user_action.last_name +
        " " +
        user_action.last_name2 +
        " "}
    </strong>
  );

  switch (notification.format) {
    case WELCOME:
      return (
        <>
          {name_user} Bienvenido al Sistema de seguimiento y
          control de Proyectos Académicos
        </>
      );

    case PROJECT_ASSIGNED:
      return (
         <Link  to={Config.aProjectsUrl +"/"+ inscription.id } className="notification-link">
          Usted tiene asignado un proyecto académico:{" "}
          <strong>{inscription.title_academic_project}</strong>
        </Link>
      );
    case PROJECT_ASSIGNED_TO_TUTOR:
      return (
         <Link  to={Config.aProjectsUrl +"/"+ inscription.id } className="notification-link">
          El proyecto: <strong>{inscription.title_academic_project}</strong>
          ha sido asignado bajo su tutoría
        </Link>
      );
       
    case PROGRESS_PROJECT_UPLOADED:
      return (
         <Link  to={Config.aProgressUrl +"/"+ tracing_student.id } className="notification-link">
          Proyecto <strong>{inscription.title_academic_project}</strong>: El avance correspondiente
          al mes de <strong>{getNameDateMonth(tracing_student.date_month)}</strong> fue
          subido por <strong>{name_user_action}</strong>
        </Link>
      );

    case TRACING_PROGRESS_UPLOADED:
      if (tracing_progress.typetracing === COMMENT) {
        return ( <Link  to={Config.aProgressUrl +"/"+ tracing_student.id } className="notification-link">
        
                <strong>{name_user_action}</strong> ha comentado el avance del proyecto <strong>{inscription.title_academic_project}</strong>
                </Link>);
      } else  if (tracing_progress.typetracing === INSTITUTION_REPORT) {
          return ( <Link  to={Config.aProgressUrl +"/"+ tracing_student.id } className="notification-link">
                    <strong>{name_user_action}</strong> ha subido informe de la institución, al mes de <strong>{getNameDateMonth(tracing_student.date_month)}</strong>, proyecto:  <strong>{inscription.title_academic_project}</strong>
            </Link>);
      }
        else  if (tracing_progress.typetracing === INTERNAL_TUTOR) {
            
        return ( <Link  to={Config.aProgressUrl +"/"+ tracing_student.id } className="notification-link">
            <strong>{name_user_action}</strong> ha subido revisión como tutor, al mes de <strong>{getNameDateMonth(tracing_student.date_month)}</strong>, proyecto:  <strong>{inscription.title_academic_project}</strong>
        </Link>);
      }
      else  if (tracing_progress.typetracing === INSTITUTION_REPORT) {
       return ( <Link  to={Config.aProgressUrl +"/"+ tracing_student.id } className="notification-link">
                <strong>{name_user_action}</strong> ha subido informe como tutor, al mes de <strong>{getNameDateMonth(tracing_student.date_month)}</strong>, proyecto:  <strong>{inscription.title_academic_project}</strong>
              </Link>);
      }
      return "";        

    default:
      return "";
  }
};

export default NotificationText;
