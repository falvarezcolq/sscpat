import React, { useEffect, useState } from "react";
import { connect,} from "react-redux";
import { list, remove } from "../../actions/academicsperiod";
import { Link } from "react-router-dom";
import Config from "../../utils/Config";
import Modal from "../../components/atoms/Modal";
import Spinner from "../atoms/Spinner";

const initial_modal_data = {
  title: "",
  message: "",
  cancel: null,
  confirm: null,
  accept: null,
}

const ListCard = (props) => {
  const { results } = props;
  
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState(initial_modal_data);

  const loadTable = async () => {
    await props.list();
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    loadTable() ;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps 

  const deleteObj = async (obj) => {
    setIsDeleting(true);
    const res = await props.remove(obj.id);
    if (res) {
      setModal({
        title: "Restricción",
        message: (<>
        <p>No se puede eliminar <strong>{obj.title}</strong></p>
        <p style={{color:"red"}}>{res.detail}</p>
        </>),
        cancel: null,
        confirm: null,
        accept: setOpenModal.bind(this, false),
      });
    } else {
      setOpenModal(false);
    }
    setIsDeleting(false);
  };

  const removeObject = (id) => {
    const obj = results.find((obj) => obj.id === id);
    setModal({
      title: "¿Eliminar Periodo académico?",
      message: `Confirmar que desea eliminar el Periodo Académico ${obj.title}`,
      cancel: setOpenModal.bind(this, false),
      confirm: deleteObj.bind(this, obj),
    });
    setOpenModal(true);
  };

  const showDetail = (id) => {
    const obj = results.find((obj) => obj.id === id);
    setModal({
      title: "Peroiodo académico",
      message: (
        <p>
          Periodo: {obj.title} <br />
          Año: {obj.year} <br />
          Semestre: {obj.semester} <br />
          Fecha de inicio: {new Date(obj.date_init).toLocaleDateString(
            "es-ES"
          )}{" "}
          <br />
          Fecha de finalizacion:{" "}
          {new Date(obj.date_end).toLocaleDateString("es-ES")} <br />
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
                Periodo académico
                <small>Indica el periodo que se esta trabajando</small>
              </h2>
            </div>

            <div className="body">
              {loading ? (
                <div className="align-center"><Spinner /></div>
              ) : (
                <div className="table-responsive">
                  {results.length === 0 ? (
                    <h2> No hay registros </h2>
                  ) : (
                    <><table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Periodo</th>
                            <th>Año</th>
                            <th>Semestre</th>
                            <th>Fecha de inicio</th>
                            <th>Fecha de finalización</th>
                            <th>Registrado</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((obj) => (
                            <tr key={obj.id}>
                              <td>{obj.title}</td>
                              <td>{obj.year}</td>
                              <td>{obj.semester}</td>
                              <td>
                                {new Date(obj.date_init).toLocaleDateString(
                                  "es-ES"
                                )}{" "}
                              </td>
                              <td>
                                {new Date(obj.date_end).toLocaleDateString(
                                  "es-ES"
                                )}{" "}
                              </td>
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
                                  to={Config.aPeriodsUrl + "/" + obj.id}
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
              { isDeleting ? "Borrando..." : "Confirmar"}
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
  results: state.academicperiods.results,
});

const mapDispatchToProps = {
  list,
  remove,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCard);
