import React from "react";
import { Link } from 'react-router-dom';
import imageProfile from "adminbsb-materialdesign/images/image-gallery/thumb/thumb-1.jpg";
import { getNameType } from "../../actions/helper";
import HeaderDropdown from "../atoms/HeaderDropdown";
import Config from "../../utils/Config";
import AuthHandler from "../../utils/AuthHandler";
import PercentBar from "../../components/atoms/PercentBar";

export default function CardTutor({ tutor }) {


  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="card">
          <div className="header">
            <h2>
              Perfil del tutor
              <small></small>
            </h2>

            <HeaderDropdown>
                { AuthHandler.isAdmin() && 
                <>
                <li><Link to={Config.aUsersUrl+"/"+tutor.id}> Editar </Link></li> 
                <li><Link to={Config.aUsersUrl+"/"+tutor.id+"/password"}> Actualizar usuario y contraseña</Link></li>
                </>
                } 

                {  AuthHandler.isTutor() && 
                <>
                <li><Link to={Config.aUsersUrl+"/"+tutor.id}> Ver mi informacion</Link></li> 
                <li><Link to={Config.updateMyPasswordUrl}> Actualizar mi contraseña</Link></li>
                </>
                } 
                  
            </HeaderDropdown>

          </div>
          <div className="body">
            <div className="row">
              <div className="col-lg-2 col-md-2">
                <img className="img-responsive thumbnail" src={imageProfile} />
              </div>
              <div className="col-lg-10 col-md-10">
                <h2>
                  {" "}
                  {tutor.abbreviation} {tutor.first_name} {tutor.last_name}{" "}
                  {tutor.last_name2} ({getNameType(tutor.type)}){" "}
                </h2>
                <small>
                  {tutor.position}
                  <code>
                    Agregado en{" "}
                    {new Date(tutor.created_at).toLocaleDateString("es-ES")}
                  </code>
                </small>
                <br />
                Grado Academico: {tutor.academic_degree}
                <br />
                Correo electronico: {tutor.email} <code>!</code>
                <br />
                Telefono: {tutor.telf}
                <br />
                Celular: {tutor.phone}
              </div>
            </div>

            <div className="footer">
              <h4>Proyectos: </h4>
              Total:{tutor.total} <br />
              Concluido: {tutor.complete} <br />
              Abandonados:{tutor.abandoned} <br /> 
              Revisiones pendientes: {tutor.pending_reviews} <br />
              En desarrollo: {tutor.under_development} <br />

              
              {PercentBar(
                                tutor.under_development,
                                tutor.pending_reviews
                              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
