import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { list } from "../../actions/projects";
import { Link } from "react-router-dom";
import Config from "../../utils/Config";
import { validateInput } from "../../utils/Validations";
// import Modal from "../../components/atoms/Modal";
import { LabelStatus } from "../../components/atoms/LabelStatus";
import InputForm from "../atoms/InputForm";
import SelectForm from "../atoms/SelectForm";
import { list as listModalities } from "../../actions/modalities";
import { list as listAcademicPeriods } from "../../actions/academicsperiod";
import NavPagination from "../tables/NavPagination";
import Spinner from "../atoms/Spinner";

const initialValues = {
  page: 1,
  size: 10,
  state: "UNDER_DEVELOPMENT",
};

const validate = {
  search: {
    max_length: 50,
  },
  size: {
    integer: true,
    max_integer: 100,
    min_integer: 1,
  },
};

// const modalValues = {
//   title: "",
//   message: "",
//   cancel: null,
//   confirm: null,
//   accept: null,
// };

const ListCard = (props) => {
  const url = Config.ProjectsApiUrl;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  // const [openModal, setOpenModal] = useState(false);
  // const [modal, setModal] = useState(modalValues);
  // const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadTable = async () => {
   
    await props.list(url, values);

    setLoading(false);
    props.listModalities();
    props.listAcademicPeriods();
  };

  // const deleteObj = async (obj) => {
  //   setIsDeleting(true);
  //   const res = await props.remove(obj.id);
  //   setIsDeleting(false);
  //   if (res) {
  //     setModal({
  //       title: "Restricción",
  //       message: `No se puede eliminar  ${obj.title}`,
  //       cancel: null,
  //       confirm: null,
  //       accept: setOpenModal.bind(this, false),
  //     });
  //   } else {
  //     setOpenModal(false);
  //   }
  // };

  // const removeObject = (id) => {
  //   const obj = projects.results.find((obj) => obj.id === id);
  //   setModal({
  //     title: "¿Eliminar la Modalidad de Titulación?",
  //     message: `Confirmar que desea eliminar ${obj.title}`,
  //     cancel: setOpenModal.bind(this, false),
  //     confirm: deleteObj.bind(this, obj),
  //   });
  //   setOpenModal(true);
  // };

  // const showDetail = (id) => {
  //   const obj = results.find((obj) => obj.id === id);
  //   setModal({
  //     title: "Modalidad de Titulación",
  //     message: (
  //       <p>
  //         Modalidad de titulación: {obj.title} <br />
  //         Descripción: {obj.description} <br />
  //         Creado en {new Date(obj.created_at).toLocaleDateString("es-ES")}
  //       </p>
  //     ),
  //     cancel: null,
  //     confirm: null,
  //     accept: setOpenModal.bind(this, false),
  //   });
  //   setOpenModal(true);
  // };

  // search form functions
  const onChange = (e) => {
    const { name, value: newValue, type } = e.target;
    const value = type === "number" ? +newValue : newValue;
    setValues({ ...values, [name]: value });
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every((t) => t === null)) {
      props.list(url, values);
    }
  };

  const percentBar = (progress) => {
    const percentage = progress > 12 ? 100 : progress === 0 ? 10 : (progress / 12) * 100;

    return (
      <>
        <div
          className="progress"
          style={{ margin: "0", width: "100%", display: "inline-block" }}
        >
          <div
            className={
              progress === 0 ? "progress-bar bg-orange" : "progress-bar bg-green"
            }
            style={{ width: percentage + "%" }}
          >
            {progress}
          </div>
        </div>
      </>
    );
  };

  const { projects } = props;

  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="card">
            <div className="header">
              <h2>
                Proyectos académicos de titulación
                <small>
                  Los proyectos académicos son los trabajos que desarrollan
                  estudiantes en las modalidades de titulaciónLa modalidades de
                  titulación define las reglas de titulación
                </small>
              </h2>
            </div>

            <div className="body">
              <div className="row">
                <form onSubmit={onSubmit}>
                  <div className="col-lg-3">
                    <InputForm
                      name="search"
                      value={values.search}
                      error={errors.search}
                      placeholder="Buscar proyecto..."
                      onChange={onChange}
                      // onBlur={onBlur}
                      // onFocus={onFocus}
                      title="Buscar:"
                    />
                  </div>

                  <div className="col-lg-1">
                    <InputForm
                      type="number"
                      name="size"
                      value={values.size}
                      error={errors.size}
                      placeholder="Cantidad"
                      onChange={onChange}
                      title="Cantidad"
                    />
                  </div>

                  <div className="col-lg-3">
                    <SelectForm
                      name="academic_period"
                      value={values.academic_period}
                      error={errors.academic_period}
                      onChange={onChange}
                      title="Periodo académico"
                      reload={props.listAcademicPeriods}
                    >
                      {props.academicperiods.length > 0 ? (
                        <>
                          <option value="">Todos</option>
                          {props.academicperiods.map((obj) => (
                            <option key={obj.id} value={obj.id}>
                              {obj.title}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option value="">Cargando..</option>
                      )}
                    </SelectForm>
                  </div>

                  <div className="col-lg-3">
                    <SelectForm
                      name="modality"
                      value={values.modality}
                      error={errors.modality}
                      onChange={onChange}
                      title="Modalidad"
                      reload={props.listModalities}
                    >
                      {props.modalities.length > 0 ? (
                        <>
                          <option value="">Todos</option>
                          {props.modalities.map((obj) => (
                            <option key={obj.id} value={obj.id}>
                              {obj.title}
                            </option>
                          ))}
                        </>
                      ) : (
                        <option value="">Cargando..</option>
                      )}
                    </SelectForm>
                  </div>

                  <div className="col-md-4 col-lg-2 m-0 p-0">
                    <SelectForm
                      name="state"
                      value={values.state}
                      error={errors.state}
                      onChange={onChange}
                      title="Estado del proyecto"
                    >
                      <option value="">Todos</option>
                      <option value="UNDER_DEVELOPMENT">En desarrollo</option>
                      <option value="CONCLUDED_SUCCESSFULLY">
                        Concluidos con exito
                      </option>
                      <option value="ABANDONED">Cerrado</option>
                    </SelectForm>
                  </div>

                  <div className="col-lg-2">
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary pt-20">
                        Buscar
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="row">
                <div className="col-lg-12">
                  {loading ? (
                    <div className="align-center">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="table-responsive">
                      {projects.results.length === 0 ? (
                        <h4> No existe proyectos registrados</h4>
                      ) : (
                        <>
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Periodo académico</th>
                                <th>Nombre del proyecto</th>
                                <th>Estado</th>
                                <th>Modalidad</th>
                                <th>Avance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {projects.results.map((project) => (
                                <tr key={project.id}>
                                  <td>
                                    {project.academic_period
                                      ? project.academic_period.title
                                      : ""}
                                  </td>
                                  <td>
                                    <Link
                                      to={
                                        Config.aProjectsUrl + "/" + project.id
                                      }
                                    >
                                      {project.title_academic_project}
                                    </Link>
                                  </td>

                                  <td>{LabelStatus(project.state)}</td>
                                  <td>{project.modality.title}</td>

                                  <td>{percentBar(project.progress)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {projects.results.length > 0 && (
                            <NavPagination
                              context={projects.context}
                              loadList={props.list}
                            />
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal open={openModal}>
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
              Confirmar
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
      </Modal> */}
    </> 
  );
};

const mapStateToProps = (state) => ({
  modalities: state.modalities.results,
  academicperiods: state.academicperiods.results,
  projects: state.projects,
});

const mapDispatchToProps = {
  list,
  listModalities,
  listAcademicPeriods,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCard);
