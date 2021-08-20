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
import Spinner from "../../components/atoms/Spinner";
import AuthHandler from "../../utils/AuthHandler";

const initialValues = {
  // search: "",
  // modality: "",
  // academic_period:"",
  // ordering: null,
  page: 1,
  size: 10,
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
  const { student, projects } = props;
  const url = Config.ProjectsApiUrl + student.id + "/bystudents/";
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  // const [openModal, setOpenModal] = useState(false);
  // const [modal, setModal] = useState(modalValues);
  // const [isDeleting, setIsDeleting] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [filter, setFilter] = useState(false);

  const toggleFilter = () => setFilter(!filter);

  useEffect(() => {
    loadTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    await props.list(url);
    setLoadingTable(false);
  };
  const loadTable = async () => {
    props.listModalities();
    props.listAcademicPeriods();
    setLoadingTable(true);
    loadData();
  };

  // const deleteObj = async (obj) => {
  //   // setIsDeleting(true);
  //   const res = await props.remove(obj.id);
  //   // setIsDeleting(false);
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

  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="card">
            <div className="header">
              <h2>
                Proyectos académicos de {student.abbreviation}{" "}
                {student.last_name} {student.last_name2} {student.first_name}
                <small>
                  Los proyectos académicos son los trabajos que desarrollan
                  estudiantes en las modalidades de titulación.
                </small>
              </h2>
              <button
                type="button"
                className="btn btn-default pull-right m-t--25"
                onClick={toggleFilter}
              >
                Filtrar
              </button>
            </div>

            <div className="body">
              <div
                className="row"
                style={{ display: filter ? "block" : "none" }}
              >
                <form onSubmit={onSubmit}>
                  <div className="col-md-4 col-lg-3 m-0 p-0">
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

                  <div className="col-md-4 col-lg-3 m-0 p-0">
                    <InputForm
                      type="number"
                      name="size"
                      value={values.size}
                      // touched={touched.search}
                      error={errors.size}
                      // focus={focus.search}
                      // required={true}
                      placeholder="Cantidad"
                      onChange={onChange}
                      // onBlur={onBlur}
                      // onFocus={onFocus}
                      title="Cantidad"
                    />
                  </div>

                  <div className="col-md-4 col-lg-2 m-0 p-0">
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

                  <div className="col-md-4 col-lg-2 m-0 p-0">
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

                  <div className="col-md-4 col-lg-2 m-0 p-0">
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
                  <div className="table-responsive">
                    {loadingTable ? (
                      <div className="align-center">
                        <Spinner />
                      </div>
                    ) : projects.results.length === 0 ? 
                    
                    (

                    
                      <h4>
                        {" "}
                        El estudiante no tiene proyecto a elaborar {" "}
                        {AuthHandler.isAdmin()  && 
                          <Link
                            className="btn btn-xs btn-warning"
                            to={Config.aProjectsNewUrl + student.id}
                          >
                            Asignar proyecto
                          </Link>
                          }
                      </h4>
                    )  : (
                      <>
                        <table className="table table-hover">
                          <thead>
                            <tr>
                             
                              <th>Periodo académico</th>
                              <th>Nombre del proyecto</th>
                              <th>Estado</th>
                              <th>Modalidad</th>
                              <th>Avance</th>
                              <th>Asignado en</th>
                              <th>Sin revisi&oacute;n del tutor</th>
                              <th>Sin informe de avace</th>
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
                                    to={Config.aProjectsUrl + "/" + project.id}
                                  >
                                    {project.title_academic_project}
                                  </Link>
                                </td>

                                <td>{LabelStatus(project.state)}</td>
                                <td>{project.modality.title}</td>

                                <td>{project.progress}</td>
                                <td>{new Date(project.created_at).toLocaleDateString("es-ES")}</td>
                                <td>{project.without_review}</td>
                                <td>{project.without_report_institution > 0 && (
                                  <div className="col-red">{project.without_report_institution}</div>
                                )}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <NavPagination
                          context={projects.context}
                          loadList={props.list}
                        />
                      </>
                    )}
                  </div>
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
      </Modal>
     */}
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
