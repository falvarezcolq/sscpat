import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import InputForm from "../../components/atoms/InputForm";
import SelectForm from "../../components/atoms/SelectForm";
import { validateInput } from "../../utils/Validations";
import { useHistory } from "react-router-dom";
import { minimalListTutors } from "../../actions/tutors";
import { minimalList as minimalListExternalTutors } from "../../actions/externaltutors";
import { list as listModalities } from "../../actions/modalities";
import { list as listAcademicPeriods } from "../../actions/academicsperiod";
import { list as listInstitutions } from "../../actions/institutions";
import { add , update } from "../../actions/projects";
import { initialValues, validate } from "./states";
import ListNames from "../atoms/ListNames";
import Config from "../../utils/Config";
import AlertMessage from "../../components/atoms/AlertMessage";
import { getDate } from "../../actions/helper";

const Form = (props) => {

  let { project, student } = props
  let projectValues = {}

  if (project) {
    student = project.student
    projectValues = {
      ...initialValues,
      ...project,
      student:student.id,
      modality: project.modality ? project.modality.id :"",
      academic_period:project.academic_period? project.academic_period.id:"",
      institution: project.institution ? project.institution.id: null,
    }
    
  }else{
    projectValues=initialValues
  }



  const [values, setValues] = useState(projectValues);
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
    const { name, value  } = e.target;
    const a_period = props.academicperiods.find((ap) => ap.id+"" === value+"" )
    
    const date_init = a_period ? a_period.date_init :null;
    const date_end  = a_period ? a_period.date_end:null;
    
    setValues({
       ...values, 
       [name]: value ,
       date_init:date_init,
       date_end:date_end,
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
      let res
      if(!project){
        // ADD NEW PROJECT
       res = await props.add(values)
      }
      else
      { // UPDATE DATA
       res = await props.update(project.id,values)
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
    setValues({...values,student: student.id, });    
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

  const onChangeModality = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
    const mod = props.modalities.find((m) => m.id+"" === value+"");
    setModality(mod);
  };

 
  // show config modality when is it updating
  if ( props.modalities.length > 0 && !modality  && project ){  
    const id = project.modality ? project.modality.id : ""
    const mod = props.modalities.find((m) => m.id === id);
    setModality(mod);
  }



  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-md-12 col-lg-12">
          <div className="align-center bg-primary">
            <div className="color-name">Información del postulante</div>
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className="form-group">
            <label>Apellidos y nombres</label>
            <div className="form-line">
              <input
                type="text"
                className="form-control"
                value={
                  student.last_name +
                  " " +
                  student.last_name2 +
                  " " +
                  student.first_name
                }
                disabled={true}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="form-group">
            <label> C.I. </label>
            <div className="form-line">
              <input
                type="text"
                className="form-control"
                value={student.CI}
                disabled={true}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="form-group">
            <label>R.U.</label>
            <div className="form-line">
              <input
                type="text"
                className="form-control"
                value={student.RU}
                disabled={true}
              />
            </div>
          </div>
        </div>

        <div className="col-md-12 col-lg-12">
          <div className="align-center bg-primary">
            <div className="color-name">
              Información del proyecto académico de titulación
            </div>
          </div>
        </div>

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
          
          
          { values.date_init &&
          <h5>Fecha de inicio: { getDate(values.date_init)} 
            {/* {new Date(values.date_init).toLocaleDateString("es-ES")} */}
            {/* {" "}  */}
          </h5>
          }
          {values.date_end && 
          <h5>Fecha de finalizacion:  { getDate(values.date_end)} 
          {/* {new Date(values.date_end).toLocaleDateString("es-ES")} */}
          </h5>
          }
        </div>
        { values.date_init &&
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
        }

        { values.date_end &&
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
        }
        <div className="col-lg-12 col-md-12">
          <SelectForm
            name="modality"
            value={values.modality}
            touched={touched.modality}
            error={errors.modality}
            required={true}
            placeholder="Ingrese titulo del proyecto académico"
            onChange={onChangeModality}
            title="Modalidad de titulación"
            addUrl={Config.aModalitiesNewUrl}
            reload={props.listModalities}
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
          </SelectForm>
        </div>

       

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
              <SelectForm
                name="tutors"
                onChange={onChangeTutors}
                required={true}
                title="Tutores internos"
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
            
            {modality.config.has_institution && (
              <div className="col-lg-offset-2 col-lg-8  col-md-12">
                <SelectForm
                  name="institution"
                  onChange={onChange}
                  title="Institución del proyecto"
                  required={true} 
                  value={values.institution }
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
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "><AlertMessage/></div>
        

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
            {project?
            loading ? "Actualizando..." : "Actualizar"
          :  
          loading ? "Registrando..." : "Registrar"
          }
          </button>
        </div>
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
