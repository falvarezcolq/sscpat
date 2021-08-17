import React from "react";
import { Link } from 'react-router-dom';
import imageProfile from "adminbsb-materialdesign/images/image-gallery/thumb/thumb-1.jpg";
import { getNameType } from "../../actions/helper";
import HeaderDropdown from "../atoms/HeaderDropdown";
import Config from "../../utils/Config";
import AuthHandler from "../../utils/AuthHandler";


const percentBar = (current_project, id) => {
  if (!current_project) {
    return  <Link  className="btn btn-xs btn-warning"  to={Config.aProjectsNewUrl + id}> Asignar proyecto</Link>;
  }

  const percentage = current_project.progress === 0 ? 10 : (current_project.progress / 12) * 100;
  
  return (
    <>
      <div
        className="progress"
        style={{ margin: "0", width: "100%", display: "inline-block" }}
      >
        <div
          className={
            current_project.progress === 0 ?
            "progress-bar bg-red":
            "progress-bar bg-green"
          }
          style={{ width: percentage + "%" }}
        >
          {current_project.progress} 
        </div>
      </div>
    </>
  );
};

export default function CardTutor({ student }) {
  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="card">
          <div className="header">
            <h2>
              Perfil del estudiante universitario
              <small></small>
            </h2>

            <HeaderDropdown>
                { AuthHandler.isAdmin() && 
                <>
                <li><Link to={Config.aUsersUrl+"/"+student.id}> Editar </Link></li> 
                <li><Link to={Config.aUsersUrl+"/"+student.id+"/password"}> Actualizar usuario y contraseña</Link></li>
                <li><Link to={Config.aProjectsNewUrl + student.id}> Asignar nuevo proyecto</Link></li>
                </>
                } 

                {  AuthHandler.isStudent() && 
                <>
                <li><Link to={Config.aUsersUrl+"/"+student.id}> Ver mi informacion</Link></li> 
                <li><Link to={Config.updateMyPasswordUrl}> Actualizar mi contraseña</Link></li>
                </>
                } 
                  
            </HeaderDropdown>
          </div>
          <div className="body">
            <div className="row">
              <div className="col-lg-2 col-md-2">
                <img className="img-responsive thumbnail" src={imageProfile} alt="" />
              </div>
              <div className="col-lg-10 col-md-10">
                <h2>
                  {" "}
                  {student.abbreviation} {student.first_name} {student.last_name}{" "}
                  {student.last_name2} ({getNameType(student.type)}){" "}


                
                </h2>
                <small>
                  {student.position}
                  <code>
                    Agregado en{" "}
                    {new Date(student.created_at).toLocaleDateString("es-ES")}
                  </code>
                </small>
                <br />
                Grado Academico: {student.academic_degree}
                <br />
                Correo electrónico: {student.email} <code>!</code>
                <br />
                Telefono: {student.telf}
                <br />
                Celular: {student.phone}
              </div>
            </div>

            <div className="footer">
              <h4>Proyectos: </h4>
              Total:{student.total} <br />
              { student.current_project ? (
                <><span>Proyecto actual</span>
                {" "}<Link to={Config.aProjectsUrl+"/"+student.current_project.id}>{student.current_project.title_academic_project}</Link>
                <br />
                Número de avances entregados  
                {percentBar(
                            student.current_project,
                            student.id
                          )}
                </>
              ) 
              : "No tiene proyecto actual en desarrollo"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
