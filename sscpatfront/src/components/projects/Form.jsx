import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InputForm from "../../components/atoms/InputForm";
import SelectForm from "../../components/atoms/SelectForm";
import SelectFormRight from "../../components/atoms/SelectFormRight";
import { validateInput } from "../../utils/Validations";
import { useHistory } from "react-router-dom";
import { minimalListTutors } from "../../actions/tutors";
import { minimalList as minimalListExternalTutors } from "../../actions/externaltutors";
import { list as listModalities } from "../../actions/modalities";
import { list as listAcademicPeriods } from "../../actions/academicsperiod";
import { list as listInstitutions } from "../../actions/institutions";
import { add, update } from "../../actions/projects";
import { initialValues, validate } from "./states";
import ListNames from "../atoms/ListNames";
import Config from "../../utils/Config";
import AlertMessage from "../../components/atoms/AlertMessage";
import { getDate } from "../../actions/helper";

const Form = (props) => {
  let { project, student } = props;
  let projectValues = {};
  let configValues = {
    has_tutor: false,
    has_external_tutor: false,
    has_review_commission: false,
    has_evaluating_court: false,
    has_institution: false,
  };

  if (project) {
    student = project.student;
    projectValues = {
      ...initialValues,
      ...project,
      student: student.id,
      modality: project.modality ? project.modality.id : "",
      academic_period: project.academic_period
        ? project.academic_period.id
        : "",
      institution: project.institution ? project.institution.id : null,
    };
  } else {
    projectValues = initialValues;
  }

  const [values, setValues] = useState(projectValues);
  const [config, setConfig] = useState(configValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focus, setFocus] = useState({});
  const [loading, setLoading] = useState(false);
  const [modality, setModality] = useState(null);
  const history = useHistory();

  const onChange = (e) => {
    const { name, value: newValue, type } = e.target;
    const value = type === "number" ? +newValue : newValue;
    setValues({ ...values, [name]: value });
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
  };

  const onChangePeriod = (e) => {
    const { name, value } = e.target;
    const a_period = props.academicperiods.find(
      (ap) => ap.id + "" === value + ""
    );

    const date_init = a_period ? a_period.date_init : null;
    const date_end = a_period ? a_period.date_end : null;

    setValues({
      ...values,
      [name]: value,
      date_init: date_init,
      date_end: date_end,
    });
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
  };
  const onBlur = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
    setFocus({ ...focus, [name]: false });
  };

  const onFocus = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
    setTouched({ ...touched, [e.target.name]: true });
  };

  const formValidation = () => {
    const formValidate = Object.keys(values).reduce(
      (acc, key) => {
        const newError = validateInput(key, values[key], validate[key]);
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            ...(newError && { [key]: newError }),
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched },
      }
    );
    setErrors(formValidate.errors);
    setTouched(formValidate.touched);

    // return if has an error in form
    return Object.values(formValidate.errors).every((t) => t === null);
  };

  const loadErrorForm = (res) => {
    const serverErrorValidate = Object.keys(res).reduce(
      (acc, key) => {
        const textError = res[key].join();
        const newTouched = { [key]: true };
        return {
          errors: {
            ...acc.errors,
            [key]: textError,
          },
          touched: {
            ...acc.touched,
            ...newTouched,
          },
        };
      },
      {
        errors: { ...errors },
        touched: { ...touched },
      }
    );
    setErrors(serverErrorValidate.errors);
    setTouched(serverErrorValidate.touched);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    formSubmit();
  };

  const formSubmit = async () => {
    if (formValidation()) {
      let res;
      if (!project) {
        // ADD NEW PROJECT

        console.log(values)
        res = await props.add(values);
      } else {
        // UPDATE DATA
        res = await props.update(project.id, values);
      }

      if (res) {
        loadErrorForm(res);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadingData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadingData = () => {
    props.minimalListTutors();
    props.listModalities();
    props.listAcademicPeriods();
    props.minimalListExternalTutors();
    props.listInstitutions();
    setValues({ ...values, student: student.id });
  };

  const onChangeTutors = (e) => {
    const selectId = e.target.value;
    if (
      selectId !== "" &&
      values.tutors.every((d) => d.id !== Number(selectId))
    ) {
      const tutor = props.tutors.find((t) => t.id === Number(selectId));
      setValues({ ...values, tutors: [...values.tutors, tutor] });
    }
  };

  const onChangeExternalTutors = (e) => {
    const selectId = e.target.value;
    if (
      selectId !== "" &&
      values.external_tutors.every((d) => d.id !== Number(selectId))
    ) {
      const external_tutor = props.externaltutors.find(
        (t) => t.id === Number(selectId)
      );
      setValues({
        ...values,
        external_tutors: [...values.external_tutors, external_tutor],
      });
    }
  };

  const removeTutors = (id) => {
    setValues({
      ...values,
      tutors: values.tutors.filter((t) => t.id !== id),
    });
  };

  const removeExternalTutors = (id) => {
    setValues({
      ...values,
      external_tutors: values.external_tutors.filter((t) => t.id !== id),
    });
  };

  const onChangeTutorsReview = (e) => {
    const selectId = e.target.value;
    if (
      selectId !== "" &&
      values.tutors_review_commission.every((d) => d.id !== Number(selectId))
    ) {
      const tutor = props.tutors.find((t) => t.id === Number(selectId));
      setValues({
        ...values,
        tutors_review_commission: [...values.tutors_review_commission, tutor],
      });
    }
  };

  const removeTutorsReview = (id) => {
    setValues({
      ...values,
      tutors_review_commission: values.tutors_review_commission.filter(
        (t) => t.id !== id
      ),
    });
  };

  const onChangeTutorsCourt = (e) => {
    const selectId = e.target.value;
    if (
      selectId !== "" &&
      values.tutors_evaluating_court.every((d) => d.id !== Number(selectId))
    ) {
      const tutor = props.tutors.find((t) => t.id === Number(selectId));
      setValues({
        ...values,
        tutors_evaluating_court: [...values.tutors_evaluating_court, tutor],
      });
    }
  };

  const removeTutorsCourt = (id) => {
    setValues({
      ...values,
      tutors_evaluating_court: values.tutors_evaluating_court.filter(
        (t) => t.id !== id
      ),
    });
  };

  const onChangeModality = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
    const mod = props.modalities.find((m) => m.id + "" === value + "");
    setModality(mod);
  };

  // show config modality when is it updating
  if (props.modalities.length > 0 && !modality && project) {
    const id = project.modality ? project.modality.id : "";
    const mod = props.modalities.find((m) => m.id === id);
    setModality(mod);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        {/* <div className="col-md-12 col-lg-12">
          <div className="align-center bg-primary">
            <div className="color-name">Información del estudiante</div>
          </div>
        </div> */}
        <div
          className="col-lg-12 col-md-12 col-sm-12"
          style={{ margin: "0px" }}
        >
          <h2 className="pull-left" style={{ fontSize: "1.6rem" }}>
            Registra nuevo proyecto bajo la modalidad:{" "}
          </h2>
          <div className="pull-left">
            <SelectFormRight
              name="modality"
              value={values.modality}
              touched={touched.modality}
              error={errors.modality}
              placeholder="Ingrese titulo del proyecto académico"
              onChange={onChangeModality}
              // required={true}
              // title="Modalidad de titulación"
              // addUrl={Config.aModalitiesNewUrl}
              // reload={props.listModalities}
            >
              {props.modalities.length > 0 ? (
                <>
                  <option value="">--Seleccione--</option>
                  {props.modalities.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.title}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">Cargando..</option>
              )}
            </SelectFormRight>
          </div>
        </div>
        {project && (
          <div className="col-lg-12">
            <>
              <label>Apellidos y nombres de los estudiantes</label>
              {project.authors.map((author, index) => (
                <div
                  className="author-name col-blue-grey"
                  style={{ fontSize: "1.6rem", marginLeft: "20px" }}
                >
                  {" "}
                  <strong>
                    {author.last_name +
                      " " +
                      author.last_name2 +
                      " " +
                      author.first_name}
                  </strong>
                </div>
              ))}
            </>
          </div>
        )}

        {!project && (
          <>
            <div className="col-md-12 col-lg-6">
              <div className="form-group">
                <div>
                  Asignado al estudiante:{" "}
                  {student.last_name +
                    " " +
                    student.last_name2 +
                    " " +
                    student.first_name}
                </div>
              </div>
            </div>
          </>
        )}

        {modality && (
          <div className="col-md-12 col-lg-12">
            <div className="align-center bg-primary">
              <div className="color-name">
                Información del proyecto académico de titulación
              </div>
            </div>
          </div>
        )}

        {modality && (
          <div className="col-lg-12">
            <InputForm
              name="title_academic_project"
              value={values.title_academic_project}
              touched={touched.title_academic_project}
              error={errors.title_academic_project}
              focus={focus.title_academic_project}
              required={true}
              placeholder="Ingrese titulo del proyecto académico"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              title="Título del proyecto académico:"
            />
          </div>
        )}

        {/* {modality && (
          <div className="col-lg-12">
            <InputForm
              name="description_project"
              value={values.description_project}
              touched={touched.description_project}
              error={errors.description_project}
              focus={focus.description_project}
              required={false}
              placeholder="Ingrese descripción del proyecto"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              title="Descripción general del proyecto"
            />
          </div>
        )} */}

        {modality && (
          <div className="col-lg-4 col-md-4">
            <SelectForm
              name="academic_period"
              value={values.academic_period}
              touched={touched.academic_period}
              error={errors.academic_period}
              focus={focus.academic_period}
              required={true}
              onChange={onChangePeriod}
              title="Periodo académico"
              addUrl={Config.aPeriodsNewUrl}
              reload={props.listAcademicPeriods}
            >
              {props.academicperiods.length > 0 ? (
                <>
                  <option value="">--Seleccione--</option>
                  {props.academicperiods.map((ap) => (
                    <option key={ap.id} value={ap.id}>
                      {ap.title}
                    </option>
                  ))}
                </>
              ) : (
                <option value="">Cargando..</option>
              )}
            </SelectForm>

            {values.date_init && (
              <h5>
                Fecha de inicio: {getDate(values.date_init)}
                {/* {new Date(values.date_init).toLocaleDateString("es-ES")} */}
                {/* {" "}  */}
              </h5>
            )}
            {values.date_end && (
              <h5>
                Fecha de finalizacion: {getDate(values.date_end)}
                {/* {new Date(values.date_end).toLocaleDateString("es-ES")} */}
              </h5>
            )}
          </div>
        )}

        {values.date_init && (
          <div className="col-lg-4">
            <InputForm
              name="date_init"
              value={values.date_init}
              touched={touched.date_init}
              error={errors.date_init}
              focus={focus.date_init}
              required={true}
              type="date"
              placeholder="Fecha de inicio"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              title="Fecha de inicio "
            />
          </div>
        )}

        {values.date_end && (
          <div className="col-lg-4">
            <InputForm
              name="date_end"
              value={values.date_end}
              touched={touched.date_end}
              error={errors.date_end}
              focus={focus.date_end}
              required={true}
              type="date"
              placeholder="Fecha de finalización"
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              title="Fecha de finalización "
            />
          </div>
        )}

        {modality && (
          <>
            <div className="col-md-12 col-lg-12">
              <div className="align-center bg-primary">
                <div className="color-name">
                  Información requerida por la modalidad
                </div>
              </div>
            </div>

            <div className="col-lg-offset-2 col-lg-8  col-md-12">
              {!(modality.config.has_tutors || config.has_tutor || values.tutors.length > 0 ) && (
                <button
                  className="btn btn-sm btn-link col-blue-grey"
                  style={{ marginRight: "5px" }}
                  onClick={() => setConfig({ ...config, has_tutor: true })}
                >
                  Agregar tutores
                </button>
              )}
              {!(config.has_external_tutor || values.external_tutors.length>0 )&& (
                <button
                  className="btn btn-sm btn-link col-blue-grey"
                  style={{ marginRight: "5px" }}
                  onClick={() =>
                    setConfig({ ...config, has_external_tutor: true })
                  }
                >
                  Agregar Tutores externos
                </button>
              )}

              {!(
                modality.config.has_review_commission ||
                config.has_review_commission ||
                values.tutors_review_commission.length>0
              ) && (
                <button
                  className="btn btn-sm btn-link col-blue-grey"
                  style={{ marginRight: "5px" }}
                  onClick={() =>
                    setConfig({ ...config, has_review_commission: true })
                  }
                >
                  Agregar comision revisora
                </button>
              )}

              {!(
                modality.config.has_evaluating_court ||
                config.has_evaluating_court ||
                values.tutors_evaluating_court.length > 0
              ) && (
                <button
                  className="btn btn-sm btn-link col-blue-grey"
                  style={{ marginRight: "5px" }}
                  onClick={() =>
                    setConfig({ ...config, has_evaluating_court: true })
                  }
                >
                  Agregar Tribunal
                </button>
              )}
              {!(modality.config.has_institution || config.has_institution || values.institution ) && (
                <button
                  className="btn btn-sm btn-link col-blue-grey"
                  style={{ marginRight: "5px" }}
                  onClick={() =>
                    setConfig({ ...config, has_institution: true })
                  }
                >
                  Agregar Instituci&oacute;n
                </button>
              )}
            </div>

            {(modality.config.has_tutors ||
              config.has_tutor || values.tutors.length > 0 ) && (
                <div className="col-lg-offset-2 col-lg-8  col-md-12">
                  <SelectForm
                    name="tutors"
                    onChange={onChangeTutors}
                    required={true}
                    title="Tutores"
                    addUrl={Config.aTutorNewUrl}
                    reload={props.minimalListTutors}
                  >
                    {props.tutors.length > 0 ? (
                      <>
                        <option value="">--Seleccione--</option>
                        {props.tutors.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.abbreviation +
                              " " +
                              t.last_name +
                              " " +
                              t.last_name2 +
                              " " +
                              t.first_name}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option value="">Cargando..</option>
                    )}
                  </SelectForm>
                  <ListNames list={values.tutors} remove={removeTutors} />
                </div>
              )}

            {(config.has_external_tutor || values.external_tutors.length > 0) && (
              <div className="col-lg-offset-2 col-lg-8  col-md-12">
                <SelectForm
                  name="tutors"
                  onChange={onChangeExternalTutors}
                  title="Tutores externos"
                  addUrl={Config.aUserNewUrl}
                  reload={props.minimalListExternalTutors}
                >
                  {props.externaltutors.length > 0 ? (
                    <>
                      <option value="">--Seleccione--</option>
                      {props.externaltutors.map((et) => (
                        <option key={et.id} value={et.id}>
                          {et.abbreviation +
                            " " +
                            et.last_name +
                            " " +
                            et.last_name +
                            " " +
                            et.first_name}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value="">Cargando..</option>
                  )}
                </SelectForm>

                <ListNames
                  list={values.external_tutors}
                  remove={removeExternalTutors}
                />
              </div>
            )}

            {(modality.config.has_review_commission ||
            config.has_review_commission || values.tutors_review_commission.length > 0 ) && (
              <div className="col-lg-offset-2 col-lg-8  col-md-12">
                <SelectForm
                  name="tutors_review_commission"
                  onChange={onChangeTutorsReview}
                  required={true}
                  title="Comisión de revisión"
                  addUrl={Config.aTutorNewUrl}
                  reload={props.minimalListTutors}
                >
                  {props.tutors.length > 0 ? (
                    <>
                      <option value="">--Seleccione--</option>
                      {props.tutors.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.abbreviation +
                            " " +
                            t.last_name +
                            " " +
                            t.last_name2 +
                            " " +
                            t.first_name}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value="">Cargando..</option>
                  )}
                </SelectForm>

                <ListNames
                  list={values.tutors_review_commission}
                  remove={removeTutorsReview}
                />
              </div>
            )}

            {(modality.config.has_evaluating_court ||
            config.has_evaluating_court || values.tutors_evaluating_court.length > 0) && (
              <div className="col-lg-offset-2 col-lg-8  col-md-12">
                <SelectForm
                  name="tutors_evaluating_court"
                  onChange={onChangeTutorsCourt}
                  required={true}
                  title="Tribunal de evaluación"
                  addUrl={Config.aTutorNewUrl}
                  reload={props.minimalListTutors}
                >
                  {props.tutors.length > 0 ? (
                    <>
                      <option value="">--Seleccione--</option>
                      {props.tutors.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.abbreviation +
                            " " +
                            t.last_name +
                            " " +
                            t.last_name2 +
                            " " +
                            t.first_name}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value="">Cargando..</option>
                  )}
                </SelectForm>

                <ListNames
                  list={values.tutors_evaluating_court}
                  remove={removeTutorsCourt}
                />
              </div>
            )}

            {(modality.config.has_institution || config.has_institution || values.institution ) && (
              <div className="col-lg-offset-2 col-lg-8  col-md-12">
                <SelectForm
                  name="institution"
                  onChange={onChange}
                  title="Institución del proyecto"
                  required={true}
                  value={values.institution}
                  addUrl={Config.aInstitutionsNewUrl}
                  reload={props.listInstitutions}
                >
                  {props.institutions.length > 0 ? (
                    <>
                      <option value="">--Seleccione--</option>
                      {props.institutions.map((institution) => (
                        <option key={institution.id} value={institution.id}>
                          {institution.name}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value="">Cargando..</option>
                  )}
                </SelectForm>
              </div>
            )}
          </>
        )}

        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
          <AlertMessage />
        </div>

        {modality && (
          <div className="col-lg-offset-2 col-lg-8  col-md-12">
            <button
              type="button"
              className="btn btn-default "
              onClick={history.goBack}
            >
              Regresar
            </button>

            <button
              type="submit"
              className="btn btn-primary pull-right"
              disabled={loading}
            >
              {project
                ? loading
                  ? "Actualizando..."
                  : "Actualizar"
                : loading
                ? "Registrando..."
                : "Registrar"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  modalities: state.modalities.results,
  tutors: state.tutors.list,
  externaltutors: state.externaltutors.list,
  academicperiods: state.academicperiods.results,
  institutions: state.institutions.results,

  // object: state.documents.object
});

const mapDispatchToProps = {
  add,
  update,
  minimalListTutors,
  listModalities,
  listAcademicPeriods,
  minimalListExternalTutors,
  listInstitutions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
