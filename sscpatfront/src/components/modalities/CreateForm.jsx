import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { validateInput } from "../../utils/Validations";
import { add } from "../../actions/modalities";
import { list as listDocuments } from "../../actions/documents";
import { useHistory } from "react-router-dom";
import RadioButton from "../../components/atoms/RadioButton";
import SelectForm from "../../components/atoms/SelectForm";
import Config from "../../utils/Config";
import SelectedName from "../../components/atoms/SelectedName";
import AlertMessage from "../atoms/AlertMessage";
import DocSelected  from "../atoms/DocSelected";
import SelectFormRight from "../atoms/SelectFormRight";
import {Modality,ModalityValidate} from "../../models/modalities";

const initialValues = Modality
const validate = ModalityValidate


const CreateForm = (props) => {
  const { resultsDocuments } = props;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focus, setFocus] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorFormMessage, setErrorFormMessage] = useState(false);
  const history = useHistory();
  const [uploadError, setUploadError] = useState(null);
  const [normatives, setNormatives] = useState([]);
  // const [modalityDocuments, setModalityDocuments] = useState([]);
  // const [inscriptionDocuments, setInscriptionDocuments] = useState([]);

  const onChange = (e) => {
    const { name, value: newValue, type } = e.target;
    const value = type === "number" ? +newValue : newValue;
    setValues({ ...values, [name]: value });
    const error = validateInput(name, value, validate[name]);
    if (!error) {
      setErrorFormMessage(false);
    }
    setErrors({ ...errors, [name]: error });
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
    setFocus({ ...focus, [name]: false });
  };

  const onChangeRadioButton = (e) => {
    const { name } = e.target;
    setValues({ ...values, [name]: !values[name] });
  };

  const onFocus = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
    setTouched({ ...touched, [e.target.name]: true });
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      if ("application/pdf" === file.type) {
        setNormatives([...normatives, file]);
        setUploadError(null);
      } else {
        setUploadError("El archivo debe ser en formato PDF");
      }
    }

  };
  /** Remove files on list files */
  const removeFile = (name) => {
    setNormatives(normatives.filter((f) => f.name !== name));
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
    const hasNotError = Object.values(formValidate.errors).every(
      (t) => t === null
    );
    setErrorFormMessage(!hasNotError);
    return hasNotError;
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
      const requestValues = insertFiles();
      res = await props.add(requestValues);
      if (res) {
        setErrorFormMessage(true);
        loadErrorForm(res);
      }
    }
    setLoading(false);
  };


  const insertFiles = () => {
    const f = new FormData();

    f.append('title',values.title);
    f.append('description',values.description);
    f.append('documents',JSON.stringify(values.documents));
    f.append('document_inscription',JSON.stringify(values.document_inscription));
    f.append('document_student',JSON.stringify(values.document_student));
    f.append('general_modality',values.general_modality);
    f.append('max_author',values.max_author);
    f.append('month_duration',values.month_duration);
    f.append('month_max_duration',values.month_max_duration);
    f.append('has_time_extension',values.has_time_extension);
    f.append('month_extension',values.month_extension);
    f.append('has_tutors',values.has_tutors);
    f.append("has_review_commission",values.has_review_commission);
    f.append("has_evaluating_court",values.has_evaluating_court);
    f.append('has_institution',values.has_institution);
    f.append('mandatory_month_report_progress_student',values.mandatory_month_report_progress_student);
    f.append('frequency_report_student',values.frequency_report_student);
    f.append('mandatory_month_report_tutor',values.mandatory_month_report_tutor);
    f.append('frequency_report_tutor',values.frequency_report_tutor);
    f.append('mandatory_month_report_external_tutor',values.mandatory_month_report_external_tutor);
    f.append('frequency_report_external_tutor',values.frequency_report_external_tutor);
    f.append('mandatory_month_report_institution',values.mandatory_month_report_institution);
    f.append('frequency_report_institution',values.frequency_report_institution);
    f.append('send_final_document',values.send_final_document);
    f.append('send_abstract_final_document',values.send_abstract_final_document);
    f.append('send_resolution_commission_aproval',values.send_resolution_commission_aproval);
    
    for (let index = 0; index < normatives.length; index++) {
      f.append(`normatives[${index}]`, normatives[index]);
    }
    console.log(f)
    return f;
  };



  const onChangeDocumentOfModality = (e) => {
    const selectId = e.target.value;
    if (selectId !== "") {
      if (values.documents.every((d) => d.id !== Number(selectId))) {
        const document = resultsDocuments.find(
          (doc) => doc.id === Number(selectId)
        );
        setValues({
          ...values,
          documents: [...values.documents, document],
        });
      }
    }
  };

  const removeDocOnModality = (id) => {
    setValues({
      ...values,
      documents: values.documents.filter((doc) => doc.id !== id),
    });
  };

  const onChangeDocumentOfInscription = (e) => {
    const selectId = e.target.value;
    if (selectId !== "") {
      if (values.document_inscription.every((d) => d.id !== Number(selectId))) {
        const document = resultsDocuments.find(
          (doc) => doc.id === Number(selectId)
        );
        setValues({
          ...values,
          document_inscription: [...values.document_inscription, document],
        });
      }
    }
  };

  

  const removeDocOnInscription = (id) => {
    setValues({
      ...values,
      document_inscription: values.document_inscription.filter(
        (doc) => doc.id !== id
      ),
    });
  };

  const onChangeDocumentOfStudent = (e) => {
    const selectId = e.target.value;
    if (selectId !== "") {
      if (values.document_student.every((d) => d.id !== Number(selectId))) {
        const document = resultsDocuments.find(
          (doc) => doc.id === Number(selectId)
        );
        setValues({
          ...values,
          document_student: [...values.document_student, document],
        });
      }
    }
  };

  const removeDocOnStudent = (id) => {
    setValues({
      ...values,
      document_student: values.document_student.filter(
        (doc) => doc.id !== id
      ),
    });
  };


  const onChangeGeneralModality = (e)=>{
    const selected = e.target.value;
    setValues({
      ...values,
      general_modality : selected,
    })  
  }
  useEffect(() => {
    props.listDocuments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="card">
          <div className="header">
            <h2 className="pull-left">
              Nueva Modalidad de titulación: {" "}
              <small> </small>
            </h2>
            <div className="pull-left" style={{ marginTop: "-20px" }}>
                <SelectFormRight
                  name="general_modality"
                  value={values.general_modality}
                  onChange={onChangeGeneralModality}
                >
                    <option value="">-- Seleccione --</option>
                    <option key="0" value="0">Tesis</option>
                    <option key="1" value="1">Proyecto de grado</option>
                    <option key="2" value="2">Examen de grado</option>
                    <option key="3" value="3">Trabajo dirigido</option>
                    <option key="4" value="4">Por excelencia</option>
                    <option key="6" value="6">Modalidad Especial</option>

                </SelectFormRight>
            </div>
          </div>
          { values.general_modality != "" &&
          <div className="body">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="align-center bg-primary">
                    <div className="color-name">
                      Nueva modalidad de titulación:
                    </div>
                   
                  </div>
                </div>
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <div className="form-group">
                    <label style={{ width: "80%" }} htmlFor="title">
                      Nombre de la modalidad de titulación{" "}
                      <strong style={{ color: "red" }}>*</strong>
                    </label>

                    <div
                      className={
                        focus.title ? "form-line focused" : "form-line"
                      }
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej: Proyecto de grado (Plan de negocio)"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      />
                    </div>
                    {touched.title && errors.title ? (
                      <label id="title-error" className="error" htmlFor="title">
                        {errors.title}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <div className="form-group">
                    <label style={{ width: "80%" }} htmlFor="description">
                      Descripción
                    </label>
                    <div
                      className={
                        focus.description ? "form-line focused" : "form-line"
                      }
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese descripción de la modalidad de titulación"
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      />
                    </div>
                    {touched.description && errors.description ? (
                      <label
                        id="description-error"
                        className="error"
                        htmlFor="description"
                      >
                        {errors.description}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="col-md-12 col-lg-12">
                  <div className="align-center bg-primary">
                    <div className="color-name">
                      Documentos relacionados a la modalidad de titulación
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <div className="form-group">
                    <div
                      className= "form-line"
                
                    >
                      <label htmlFor="files" >
                        Reglamento de la modalidad:{" "}
                        <span className="btn-link" style={{color:"#aa0000",cursor:"pointer"}}>
                          <i className="material-icons">attach_file</i>  Subir archivo
                        </span>
                      </label>
                      <br />
                      {uploadError && (  <span className="col-red"> {uploadError}</span>)}
                    </div>

                    {normatives.map((file, index) => (
                      <>
                        <SelectedName
                          key={index}
                          name={file.name}
                          file={file}
                          remove={removeFile}
                        />
                      </>
                    ))}
                  </div>
                  <input
                    id="files"
                    type="file"
                    name="files"
                    onChange={uploadFile}
                    className="input-file"
                  />
                </div>
                
                {/* document for modality */}
                <div className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10">
                  <SelectForm
                    name="documents"
                    onChange={onChangeDocumentOfModality}
                    title="Documentos académicos a elaborar en esta modalidad:"
                    addUrl={Config.aDocumentsNewUrl}
                    reload={props.listDocuments}
                  >
                    {resultsDocuments.length > 0 ? (
                      <>
                        <option value="">--Seleccione--</option>
                        {resultsDocuments.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {doc.title}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option value="">Cargando..</option>
                    )}
                  </SelectForm>
                  <div>
                    {values.documents.length > 0 &&
                      values.documents.map((doc, index) => (
                        <DocSelected
                         key={index}
                          index={index+"_a"}
                          doc={doc}
                          remove={removeDocOnModality}
                        />
                      ))}
                  </div>
                </div>

                {/* document for initial modality */}
                <div className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10">
                  <SelectForm
                    name="documents_of_inscription"
                    onChange={onChangeDocumentOfInscription}
                    title=" Documentos solicitados para la inscripción del
                    estudiante a la modalidad:"
                    addUrl={Config.aDocumentsNewUrl}
                    reload={props.listDocuments}
                  >
                    {resultsDocuments.length > 0 ? (
                      <>
                        <option value="">--Seleccione--</option>
                        {resultsDocuments.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {doc.title}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option value="">Cargando..</option>
                    )}
                  </SelectForm>
                  <div>
                    {values.document_inscription.length > 0 &&
                      values.document_inscription.map((doc, index) => (
                        <DocSelected
                          key={index}
                          index={index+"_b"}
                          doc={doc}
                          remove={removeDocOnInscription}
                        />
                      ))}
                  </div>
                </div>

                {/* Document for student */}
                <div className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10">
                  <SelectForm
                    name="documents_of_student"
                    onChange={onChangeDocumentOfStudent}
                    title="Documentos personales del estudiante para la modalidad:"
                    addUrl={Config.aDocumentsNewUrl}
                    reload={props.listDocuments}
                  >
                    {resultsDocuments.length > 0 ? (
                      <>
                        <option value="">--Seleccione--</option>
                        {resultsDocuments.map((doc) => (
                          <option key={doc.id} value={doc.id}>
                            {doc.title}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option value="">Cargando...</option>
                    )}
                  </SelectForm>
                  <div>
                    {values.document_student.length > 0 &&
                      values.document_student.map((doc, index) => (
                        <DocSelected
                          key={index}
                          index={index+"_c"}
                          doc={doc}
                          remove={removeDocOnStudent}
                        />
                      ))}
                  </div>
                </div>

               
                <div className="col-md-12 col-lg-12">
                  <div className="align-center bg-primary">
                    <div className="color-name">Configuración</div>
                  </div>
                </div>
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <h2 className="card-inside-title">Estudiantes</h2>
                </div>
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <div className="form-group demo-radio-button ">
                    <div
                      className={
                        focus.max_author ? "form-line focused" : "form-line"
                      }
                    >
                      <label style={{ width: "80%" }} htmlFor="max_author">
                        Cantidad máxima de estudiantes:
                      </label>
                     
                      <input
                        type="number"
                        className="form-control-line pull-right"
                        size="4"
                        placeholder="autors"
                        id="max_author"
                        name="max_author"
                        value={values.max_author}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      />
                    </div>
                    {touched.max_author && errors.max_author ? (
                      <label
                        id="max_author-error"
                        className="error"
                        htmlFor="max_author"
                      >
                        {errors.max_author}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <h2 className="card-inside-title">Tiempo</h2>
                </div>
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <div className="form-group">
                    <div
                      className={
                        focus.month_duration ? "form-line focused" : "form-line"
                      }
                    >
                      <label style={{ width: "80%" }} htmlFor="month_duration">
                        Tiempo de desarrollo en meses:
                      </label>

                      <input
                        type="number"
                        className="form-control-line pull-right"
                        placeholder="Ingrese descripción de la modalidad de titulación"
                        id="month_duration"
                        name="month_duration"
                        value={values.month_duration}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      />
                    </div>
                    {touched.month_duration && errors.month_duration ? (
                      <label
                        id="month_duration-error"
                        className="error"
                        htmlFor="month_duration"
                      >
                        {errors.month_duration}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <div className="form-group">
                    <div
                      className={
                        focus.month_max_duration
                          ? "form-line focused"
                          : "form-line"
                      }
                    >
                      <label
                        style={{ width: "80%" }}
                        htmlFor="month_max_duration"
                      >
                        Tiempo maximo de desarrollo en meses:
                      </label>
                      <input
                        type="number"
                        className="form-control-line pull-right"
                        placeholder="Ingrese descripción de la modalidad de titulación"
                        id="month_max_duration"
                        name="month_max_duration"
                        value={values.month_max_duration}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      />
                    </div>
                    {touched.month_max_duration && errors.month_max_duration ? (
                      <label
                        id="month_max_duration-error"
                        className="error"
                        htmlFor="month_max_duration"
                      >
                        {errors.month_max_duration}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="has_time_extension"
                    value={values.has_time_extension}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    Solicitud de extensión del tiempo:
                  </RadioButton>
                </div>

                {values.has_time_extension && (
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <div className="form-group">
                    <div
                      className={
                        focus.month_extension
                          ? "form-line focused"
                          : "form-line"
                      }
                    >
                      <label style={{ width: "80%" }} htmlFor="month_extension">
                        Extensión de tiempo en meses
                      </label>
                      <input
                        type="number"
                        className="form-control-line pull-right"
                        placeholder="Ingrese descripción de la modalidad de titulación"
                        id="month_extension"
                        name="month_extension"
                        value={values.month_extension}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      />
                    </div>
                    {touched.month_extension && errors.month_extension ? (
                      <label
                        id="month_extension-error"
                        className="error"
                        htmlFor="month_extension"
                      >
                        {errors.month_extension}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                )}

                <div className="col-md-12 col-lg-12">
                  <div className="align-center bg-primary">
                    <div className="color-name">Tutores e institución</div>
                  </div>
                </div>

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <h2 className="card-inside-title">
                    Requerimientos del la modalidad
                  </h2>
                </div>

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="has_tutors"
                    value={values.has_tutors}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    La modalidad posee tutores:
                  </RadioButton>
                </div>


                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="has_review_commission"
                    value={values.has_review_commission}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    La modalidad posee comisi&oacute;n revisora:
                  </RadioButton>
                </div>

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="has_evaluating_court"
                    value={values.has_evaluating_court}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    La modalidad tribunal de evaluaci&oacute;n:
                  </RadioButton>
                </div>

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="has_institution"
                    value={values.has_institution}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    La modalidad requiere una institución
                  </RadioButton>
                </div>

                <div className="col-md-12 col-lg-12">
                  <div className="align-center bg-primary">
                    <div className="color-name">
                      Configuración de seguimiento y control de la modalidad
                      titulación
                    </div>
                  </div>
                </div>
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <h2 className="card-inside-title">
                    Configuración de seguimiento y control de la modalidad
                  </h2>
                </div>

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="mandatory_month_report_progress_student"
                    value={values.mandatory_month_report_progress_student}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    Es obligatorio el envío del avance del proyecto por el estudiante
                  </RadioButton>
                </div>
                
                {values.mandatory_month_report_progress_student && ( 
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <div className="form-group">
                    <div
                      className={
                        focus.frequency_report_student
                          ? "form-line focused"
                          : "form-line"
                      }
                    >
                      <label htmlFor="frequency_report_student">
                        Frencuencia de envío de avance del estudiante:
                      </label>

                      <select
                        name="frequency_report_student"
                        className="form-control show-tick"
                        tabIndex="-98"
                        onChange={onChange}
                      >
                        <option value="1">Mensual </option>
                        <option value="2">Cada 2 meses</option>
                        <option value="3">Cada 3 meses</option>
                      </select>
                    </div>
                    {touched.frequency_report_student &&
                    errors.frequency_report_student ? (
                      <label
                        id="frequency_report_student-error"
                        className="error"
                        htmlFor="frequency_report_student"
                      >
                        {errors.frequency_report_student}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                )}


                {values.has_tutors && (
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="mandatory_month_report_tutor"
                    value={values.mandatory_month_report_tutor}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    Revisión obligatoria del avance por el tutor
                  </RadioButton>
                </div>
                )}
              
                {values.has_tutors && values.mandatory_month_report_tutor && (
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <div className="form-group">
                    <div
                      className={
                        focus.frequency_report_tutor
                          ? "form-line focused"
                          : "form-line"
                      }
                    >
                      <label htmlFor="frequency_report_tutor">
                        Frencuencia de revisión del tutor
                      </label>

                      <select
                        name="frequency_report_institution"
                        className="form-control show-tick"
                        tabIndex="-98"
                        onChange={onChange}
                      >
                        <option value="1">Mensual </option>
                        <option value="2">Cada 2 meses</option>
                        <option value="3">Cada 3 meses</option>
                      </select>
                    </div>
                    {touched.frequency_report_tutor &&
                    errors.frequency_report_tutor ? (
                      <label
                        id="frequency_report_tutor-error"
                        className="error"
                        htmlFor="frequency_report_tutor"
                      >
                        {errors.frequency_report_tutor}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                )}


                {values.has_tutors && (

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="mandatory_month_report_external_tutor"
                    value={values.mandatory_month_report_external_tutor}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    Revisión obligatoria del avance por el tutor externo
                  </RadioButton>
                </div>
                )}

                {values.has_tutors && values.mandatory_month_report_external_tutor && (
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <div className="form-group">
                    <div
                      className={
                        focus.frequency_report_external_tutor
                          ? "form-line focused"
                          : "form-line"
                      }
                    >
                      <label htmlFor="frequency_report_external_tutor">
                        Frecuencia de revisión por el tutor externo
                      </label>

                      <select
                        name="frequency_report_external_tutor"
                        className="form-control show-tick"
                        tabIndex="-98"
                        onChange={onChange}
                      >
                        <option value="1">Mensual </option>
                        <option value="2">Cada 2 meses</option>
                        <option value="3">Cada 3 meses</option>
                      </select>
                    </div>
                    {touched.frequency_report_external_tutor &&
                    errors.frequency_report_external_tutor ? (
                      <label
                        id="frequency_report_external_tutor-error"
                        className="error"
                        htmlFor="frequency_report_external_tutor"
                      >
                        {errors.frequency_report_external_tutor}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                )}


                {values.has_institution && (
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="mandatory_month_report_institution"
                    value={values.mandatory_month_report_institution}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    Envío de reporte obligatorio por parte de la institución
                  </RadioButton>
                </div>
                )}

                {values.has_institution &&  values.mandatory_month_report_institution && (
                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <div className="form-group">
                    <div
                      className={
                        focus.frequency_report_institution
                          ? "form-line focused"
                          : "form-line"
                      }
                    >
                      <label htmlFor="frequency_report_institution">
                        Frecuencia de envío de reporte de la institución
                      </label>

                      <select
                        name="frequency_report_institution"
                        className="form-control show-tick"
                        tabIndex="-98"
                        onChange={onChange}
                      >
                        <option value="1">Mensual </option>
                        <option value="2">Cada 2 meses</option>
                        <option value="3">Cada 3 meses</option>
                      </select>
                    </div>
                    {touched.frequency_report_institution &&
                    errors.frequency_report_institution ? (
                      <label
                        id="frequency_report_institution-error"
                        className="error"
                        htmlFor="frequency_report_institution"
                      >
                        {errors.frequency_report_institution}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                )}

                {/* <div className="col-md-12 col-lg-12">
                  <div className="align-center bg-primary">
                    <div className="color-name">
                      Configuración de finalización de modalidad
                    </div>
                  </div>
                </div> */}

                {/* <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="send_final_document"
                    value={values.send_final_document}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    La modalidad requiere el envío de documento final
                  </RadioButton>
                </div> */}

                {/* <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="send_abstract_final_document"
                    value={values.send_abstract_final_document}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    La modalidad requiere un resumen del documento final
                  </RadioButton>
                </div> */}

                {/* <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="send_resolution_commission_aproval"
                    value={values.send_resolution_commission_aproval}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    La modalidad requiere una resolución de aprobación por la
                    comision encargada
                  </RadioButton>
                </div> */}
                <div className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10">
                  <AlertMessage/> 
                </div>

                <div className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10">
                  {errorFormMessage && (
                    <>
                      <label className="bg-red">
                        Error: Revise el formulario
                      </label>
                      <br />
                    </>
                  )}

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
                    {loading ? "Registrando..." : "Registrar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: state.messages,
  resultsDocuments: state.documents.results,
  // object: state.documents.object
});

const mapDispatchToProps = {
  listDocuments,
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
