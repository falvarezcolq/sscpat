import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { list, remove } from "../../actions/modalities";
import { Link } from "react-router-dom";
import Config from "../../utils/Config";

import Modal from "../../components/atoms/Modal";
import Spinner from "../atoms/Spinner";
import { 
  filePath,

} from "../../actions/helper";
import pdf_image from "../../img/pdf_icon.png";
import { GeneralModality } from "../../models/modalities";

const ListCard = (props) => {
  const { results } = props;

  useEffect(() => {
    setLoading(true);
    loadTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadTable = async () => {
    await props.list();
    setLoading(false);
  };

  const [modal, setModal] = useState({
    title: "",
    message: "",
    cancel: null,
    confirm: null,
    accept: null,
  });

  const [openModal, setOpenModal] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteObj = async (obj) => {
    setIsDeleting(true);
    const res = await props.remove(obj.id);
    setIsDeleting(false);

    if (res) {
      setModal({
        title: "Restricción",
        message: (
          <>
            <p>
              No se puede eliminar el documento: <strong>{obj.title}</strong>
            </p>
            <p style={{ color: "red" }}>{res.detail}</p>
          </>
        ),
        cancel: null,
        confirm: null,
        accept: setOpenModal.bind(this, false),
      });
    } else {
      setOpenModal(false);
    }
  };

  const removeObject = (id) => {
    const obj = results.find((obj) => obj.id === id);
    setModal({
      title: "¿Eliminar la Modalidad de Titulación?",
      message: `Confirmar que desea eliminar ${obj.title}`,
      cancel: setOpenModal.bind(this, false),
      confirm: deleteObj.bind(this, obj),
    });
    setOpenModal(true);
  };

  const showDetail = (id) => {
    const obj = results.find((obj) => obj.id === id);
    setModal({
      title: (<div>
        <span className="col-blue-grey font-bold" style={{fontSize:"1.3rem"}}>Modalidad de Titulación: </span> <br />
        <span className="col-blue"> {obj.title}</span>
      </div>),
      message: (
      

        <div className="row">
          <div className="col-lg-12">
            <p><span className="col-blue-grey font-bold">Descripción: </span> <br /><span> {obj.description}</span></p>
          </div>
          <div className="col-lg-6">
            <span className="col-blue-grey font-bold">Documentos de inscripción a la modalidad:</span> <br />
            <ul className="list-group">
            {obj.document_inscription.map((d,index)=>(
              <><li key={index}  className="list-group-item"> {d.title}</li>
              </>
            ))}
            </ul>
          </div>
          <div className="col-lg-6">
            <span className="col-blue-grey font-bold"> Documentos a elaborar:</span> <br />
            <ul className="list-group">
            {obj.documents.map((d,index)=>(
              <><li key={index}  className="list-group-item"> {d.title}</li>
              </>
            ))}
            </ul>
            
          </div>
         
          <div className="col-lg-12">
            <span className="col-blue-grey font-bold" >Reglamentos de la modalidad: </span> <br />
            { obj.normatives.length > 0 ? obj.normatives.map((file)=>(
              <div key={file.id}>
              <div className="link-container">
                <a
                  className="file-link"
                  href={filePath(file.path)}
                  title={file.title}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="image-link-small">
                    <img
                      className=""
                      src={
                        file.format ===
                        "application/pdf"
                          ? pdf_image
                          : file.thumbnail
                      }
                      alt="presentation"
                    />
                  </div>
                  <div className="text-link">
                    <div className="text-link-title">
                      {file.title}
                    </div>
                  </div>
                </a>
              </div>
            </div>
            )): "-- No tiene reglamentos subidos --"}
            <br />
          </div>
        
        </div>
      ),
      cancel: null,
      confirm: null,
      accept: setOpenModal.bind(this, false),
    });
    setOpenModal(true);
  };

  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="card">
            <div className="header">
              <h2>
                Modalidades de Titulación
                {/* <small>
                  La modalidades de titulación son la forma com
                </small> */}
              </h2>
              <ul className="header-dropdown m-r--5">
                <li>
                  <Link
                    className="btn btn-primary"
                    to={Config.aModalitiesNewUrl}
                  >
                    Nuevo +
                  </Link>
                </li>
              </ul>
            </div>

            <div className="body">
              {loading ? (
                <div className="align-center">
                  <Spinner />
                </div>
              ) : (
                <div className="table-responsive">
                  {results.length === 0 ? (
                    <h2> No hay registros </h2>
                  ) : (
                    <>
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Modalidad</th>
                            <th>Nombre de la modalidad </th>
                            <th style={{width:"200px"}}>Descripción</th>
                            <th>Registrado</th>
                            <th>Opciones</th> 
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((obj) => (
                            <tr key={obj.id}>
                              <td>{GeneralModality[obj.general_modality]}</td>
                              <td>{obj.title}</td>
                              <td >{obj.description}</td>
                              <td>
                                {new Date(obj.created_at).toLocaleDateString(
                                  "es-ES"
                                )}{" "}
                              </td>
                              <td>
                                <button
                                  className="btn btn-default btn-xs btn-circle"
                                  title="Detalle"
                                  onClick={showDetail.bind(this, obj.id)}
                                >
                                  <i className="material-icons">info</i>
                                </button>

                                <Link
                                  to={Config.aModalitiesUrl + "/" + obj.id}
                                  className="btn btn-default btn-xs btn-circle"
                                  title="Editar"
                                  style={{ paddingTop: "10px" }}
                                >
                                  <i className="material-icons">mode_edit</i>
                                </Link>

                                <button
                                  className="btn btn-default btn-xs btn-circle"
                                  onClick={removeObject.bind(this, obj.id)}
                                  title="Borrar"
                                >
                                  <i className="material-icons">delete</i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              )}
            </div>
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
              disabled={isDeleting}
            >
              {isDeleting ? "Borrando.. " : "Comfirmar"}
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
  results: state.modalities.results,
});

const mapDispatchToProps = {
  list,
  remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCard);
