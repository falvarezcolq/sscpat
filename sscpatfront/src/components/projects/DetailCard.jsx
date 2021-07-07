import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { get } from "../../actions/projects";
import Config from "../../utils/Config";
import HeaderDropdown from "../atoms/HeaderDropdown";
import { LabelStatus } from "../atoms/LabelStatus";
import Spinner from "../atoms/Spinner";
import { getDate } from "../../actions/helper";

const DetailCard = (props) => {
  const { id ,project } = props;
  // const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const loadData = async () => {
    if ( !project || project.id+"" !== id ){
      const res = await props.get(id);
    }
    setLoading(false);
  };

  if (!project ) {
    return <Spinner />;
  }

  if (project.id+"" !== id ) {
    return <Spinner />;
  }

  return (
    <div className="row clearfix">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card">
          <div className="header bg-indigo">
            <h1>Título: {project.title_academic_project} </h1>
            <h2 className="pull-right">
              {project.modality.title}{" "}
              {project.academic_period && project.academic_period.title}
            </h2>
            <h2>
              Autor:{" "}
              {project.student.last_name +
                " " +
                project.student.last_name2 +
                " " +
                project.student.first_name}
            </h2>
            <h4>{LabelStatus(project.state)}</h4>

            {project.tutors.map((tutor, index) => (
              <h2 key={index}>
                Tutor: {" "}
                <span style={{fontFamily:"cursive"}}>
                {tutor.abbreviation + " "}
                {tutor.last_name + " "}
                {tutor.last_name2 + " "}
                {tutor.first_name + " "}
                </span>
                
              </h2>
            ))}

            {project.external_tutors.map((tutor, index) => (
              <h2 key={index}>
                Tutor externo:{" "}
                <span style={{fontFamily:"cursive"}}>
                {tutor.abbreviation + " "}
                {tutor.last_name + " "}
                {tutor.last_name2 + " "}
                {tutor.first_name + " "}
                </span>
              </h2>
            ))}
            <br />
            {project.institution && (
              <h2>Institución o empresa: {project.institution.name}</h2>
            )}
            <br />  

            <span >
              Fecha de inicio: {getDate(project.date_init)}
            </span>

            <br />

            <span >
            Fecha de Finalización: {getDate(project.date_end)}
            </span>
            {/* <span > <Link className="link-extended-time" to={""} > Extender tiempo de desarrollo </Link></span> */}

            <span className="pull-right">
            
                <Link
                  to={Config.aProjectsDocumentUrl + project.id}
                  className="link-extended-time"
                >
                   <i class="material-icons">description</i>
                  Documentos del proyecto
                </Link>
            </span>


            <HeaderDropdown>
              <li>
               
                <Link
                  to={Config.aProjectsUpdateUrl + project.id}
                  className=" waves-effect waves-block"
                >
                 
                  Editar información
                </Link>
              </li>
              <li>

              <Link
                to={Config.aProjectStateUrl + project.id}
                className=" waves-effect waves-block"
              >
                Cambiar estado del proyecto
              </Link>
                
              </li>
              <li>

              <Link
                  to={Config.aProjectTimeUrl + project.id}
                  className=" waves-effect waves-block"
                >
                  Extender tiempo de desarrollo
                </Link>
              </li>
            </HeaderDropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  project: state.projects.object,
});

const mapDispatchToProps = {
  get,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCard);
