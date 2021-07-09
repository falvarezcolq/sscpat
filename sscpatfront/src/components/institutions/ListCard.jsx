import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { list, remove } from "../../actions/institutions";
import { Link } from "react-router-dom";
import Config from "../../utils/Config";

import Modal from "../../components/atoms/Modal";
import Spinner from "../atoms/Spinner";

const ListCard = (props) => {
  const { results } = props;

  useEffect(() => {
    setLoading(true);
    loadTable();
  }, []);

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
        message: (<>
        <p>No se puede eliminar <strong>{obj.name}</strong></p>
        <p style={{color:"red"}}>{res.detail}</p>
        </>),      
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
      title: "¿Eliminar el registro de la institución?",
      message: `Confirmar que desea eliminar  ${obj.name}`,
      cancel: setOpenModal.bind(this, false),
      confirm: deleteObj.bind(this, obj),
    });
    setOpenModal(true);
  };

  const showDetail = (id) => {
    const obj = results.find((obj) => obj.id === id);
    setModal({
      title: "Institucion",
      message: (
        <p>
          Institución: {obj.name} <br />
          Responsable: {obj.responsable} <br />
          Celular o teléfono: {obj.phone} <br />
          Dirección: {obj.address} <br />
          Creado en {new Date(obj.created_at).toLocaleDateString("es-ES")}
        </p>
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
                Instituciones
                <small>
                  Los proyectos academicos trabajas con instituciones que
                  respaldan su investigacion y trabajo que realizan{" "}
                </small>
              </h2>
              <ul className="header-dropdown m-r--5">
                <li>
                  <Link
                    className="btn btn-primary"
                    to={Config.aInstitutionsNewUrl}
                  >
                    Nuevo +
                  </Link>
                </li>
              </ul>
            </div>

            <div className="body">
              {loading ? (
                <div className="align-center">
                  {" "}
                  <Spinner />
                </div>
              ) : (
                <div className="table-responsive">
                  {results.length === 0 ? (
                    <h3> No hay registros </h3>
                  ) : (
                    <>
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Institución</th>
                            <th>Responsable</th>
                            <th>Celular/Telf:</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((obj) => (
                            <tr key={obj.id}>
                              <td>{obj.name}</td>
                              <td>{obj.responsable}</td>
                              <td>{obj.phone} </td>
                              <td>
                                <button
                                  className="btn btn-default btn-xs btn-circle"
                                  title="Detalle"
                                  onClick={showDetail.bind(this, obj.id)}
                                >
                                  <i className="material-icons">info</i>
                                </button>

                                <Link
                                  to={Config.aInstitutionsUrl + "/" + obj.id}
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
  results: state.institutions.results,
});

const mapDispatchToProps = {
  list,
  remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCard);
