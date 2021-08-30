import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { connect } from "react-redux";
import { get,remove } from "../../actions/projects";
import Config from "../../utils/Config";
import HeaderDropdown from "../atoms/HeaderDropdown";
import { LabelStatus } from "../atoms/LabelStatus";
import Spinner from "../atoms/Spinner";
import { getDate } from "../../actions/helper";
import AuthHandler from "../../utils/AuthHandler";
import Modal from "../atoms/Modal";



const initial_modal_data ={
  title: "",
  message: "",
  cancel: null,
  confirm: null,  
  accept: null,
}

const DetailCard = (props) => {
  const { id ,project } = props;
  // const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modal,setModal] = useState(initial_modal_data); 
  const [openModal, setOpenModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);


  const deleteObj = async (obj) => {
    setIsDeleting(true);
    const res = await props.remove(obj.id);
    setIsDeleting(false);
    if (res) {
      setModal({
        title: "Restricción",
        message: (<>
          <p>No se puede eliminar el proyecto: <strong>{obj.title}</strong></p>
          <p style={{color:"red"}}>{res.detail}</p>
          </>),
        cancel: null,   
        confirm: null,  
        accept: setOpenModal.bind(this, false),
      });
    } else {
      setOpenModal(false);
      window.location = Config.aProjectsUrl;    
    
    }
  };

  const removeProject = (id) => {
    const obj = project
    setModal({
      title: "¿Eliminar el proyecto?",
      message: <p>Confirmar que desea eliminar el proyecto: <strong>{obj.title_academic_project}</strong></p>,
      cancel: setOpenModal.bind(this, false),
      confirm: deleteObj.bind(this, obj),
    });
    setOpenModal(true); 
  };


  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    if ( !project || project.id+"" !== id +""){
      
      await props.get(id);
    }
    setLoading(false);
  };

  if (!project ) {
    return <Spinner />;
  }

  if (project.id+"" !== id +"") {
   
    return <Spinner />;
  }

  return (
    <>
    <div className="row clearfix">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card">
          {loading ? <Spinner/>:
          <div className="header bg-indigo">
            <h1>Título: {project.title_academic_project} </h1>
            <h2 className="pull-right">
              {project.modality.title}{" "}
              {project.academic_period && project.academic_period.title}
            </h2>

            
              <h2 >
                Autor(es): {" "} <br /> 
                {project.authors.map((author, index) => (
                  <>
                  <span style={{fontSize:"1.4 rem"}}>
                  {author.last_name + " "}
                  {author.last_name2 + " "}
                  {author.first_name + " "}
                  </span> <br />
                  </>
                 ))}
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
                   <i className="material-icons">description</i>
                  Documentos del proyecto
                </Link>
            </span>


            <HeaderDropdown>
            {  AuthHandler.isAdmin && 
              <li>
                <Link
                  to={Config.aProjectsUpdateUrl + project.id}
                  className=" waves-effect waves-block"
                >
                  Editar información
                </Link>
              </li>
              }

            {  AuthHandler.isAdmin && 
              <li>

              <Link
                to={Config.aProjectStateUrl + project.id}
                className=" waves-effect waves-block"
              >
                Cambiar estado del proyecto
              </Link>
                
              </li>
            }
            {  AuthHandler.isAdmin && 
              <li>
                <Link
                  to={Config.aProjectTimeUrl + project.id}
                  className=" waves-effect waves-block"
                >
                  Extender tiempo de desarrollo
                </Link>
              </li>
              }
              {  AuthHandler.isAdmin && 
                <li>
                 <Link
                  to={Config.aProjectsUrl+"/nuevo_autor/"+ project.id}
                  className=" waves-effect waves-block"
                >
                  Agregar autores
                </Link>
                </li>
              }
              {  AuthHandler.isAdmin && 
                <li>
                  <div className="item-link" onClick={()=>removeProject(project.id)}>
                  Borrar proyecto
                 </div>
                </li>
              }


            </HeaderDropdown>
          </div>
           }
        </div>
      </div>
    </div>
    <Modal open={openModal}>
        <div className="modal-header">
          <h4 className="modal-title" id="defaultModalLabel">
            {modal.title}
          </h4>
        </div>
        <div className="modal-body">{modal.message}</div>
        <div className="modal-footer">
          {modal.cancel && (
            <button
              type="button"
              className="btn btn-link waves-effect pull-left"
              onClick={modal.cancel}
            >
              Cancelar
            </button>
          )}

          {modal.confirm && (
            <button
              type="button"
              className="btn btn-success waves-effect"
              onClick={modal.confirm}
            >
              {isDeleting ? "Eliminando...":"Confirmar"}
            </button>
          )}

          {modal.accept && (
            <button
              type="button"
              className="btn btn-primary waves-effect"
              onClick={modal.accept}
            >
              Aceptar
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  project: state.projects.object,
});

const mapDispatchToProps = {
  get,
  remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCard);
