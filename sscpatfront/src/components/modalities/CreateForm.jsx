import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { validateInput } from "../../utils/Validations";
import { add } from "../../actions/modalities";
import { list as listDocuments } from "../../actions/documents";
import { useHistory } from "react-router-dom";
import RadioButton from "../../components/atoms/RadioButton";
import SelectForm from "../../components/atoms/SelectForm";
import Config from "../../utils/Config";
import { getTimeSendDocument } from "../../actions/helper";
import SelectedName from "../../components/atoms/SelectedName";
import AlertMessage from "../atoms/AlertMessage";

const initialValues = {
  // data will be for ever strings
  title: "",
  description: "",
  documents: [],
  document_inscription: [],

  max_author: "1",
  month_duration: "6",
  month_max_duration: "6",
  has_time_extension: false,
  month_extension: "0",

  has_tutors: true,
  has_institution: false,

  mandatory_month_report_progress_student: false,
  frequency_report_student: "1",
  mandatory_month_report_tutor: false,
  frequency_report_tutor: "1",
  mandatory_month_report_external_tutor: false,
  frequency_report_external_tutor: "1",
  mandatory_month_report_institution: false,
  frequency_report_institution: "1",

  send_final_document: true,
  send_abstract_final_document: true,
  send_resolution_commission_aproval: false,
};

const validate = {
  title: {
    is_required: true,
    max_length: 255,
    min_lenght: 2,
  },
  description: {
    is_required: false,
    max_length: 255,
  },
};

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
    f.append('max_author',values.max_author);
    f.append('month_duration',values.month_duration);
    f.append('month_max_duration',values.month_max_duration);
    f.append('has_time_extension',values.has_time_extension);
    f.append('month_extension',values.month_extension);
    f.append('has_tutors',values.has_tutors);
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
    return f;
  };


  // const loadingData = async () =>{
  //   const id = props.id;
  //   const object = await props.get(id)
  //   setValues(object)
  // }

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

  useEffect(() => {
    props.listDocuments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="card">
          <div className="header">
            <h2>
              Nueva Modalidad de titulación
              <small> </small>
            </h2>
          </div>

          <div className="body">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <div className="align-center bg-primary">
                    <div className="color-name">
                      Nueva modalidad de titulación
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
                        placeholder="Ingrese descripcion de la modalidad de titulación"
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

                <div className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10">
                  <SelectForm
                    name="documents"
                    onChange={onChangeDocumentOfModality}
                    title="Documentos academicos a elaborar en esta modalidad:"
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
                        <h4 key={index}>
                          <span
                            className="label bg-light-blue"
                            style={{ margin: "0px 5px" }}
                          >
                            {doc.title}
                            <button
                              type="button"
                              onClick={removeDocOnModality.bind(this, doc.id)}
                              className="btn-link"
                              title="Borrar"
                            >
                              x
                            </button>
                          </span>
                          <span style={{ fontSize: "1.2rem" }}>
                            Entrega: {getTimeSendDocument(doc.time_send)}
                          </span>
                        </h4>
                      ))}
                  </div>
                </div>


                <div className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10">
                  <SelectForm
                    name="documents_of_inscription"
                    onChange={onChangeDocumentOfInscription}
                    title=" Documentos solicitados para la inscripcion del
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
                        <h4 key={index}>
                          <span
                            className="label bg-blue"
                            style={{ margin: "0px 5px" }}
                          >
                            {doc.title}
                            <button
                              type="button"
                              onClick={removeDocOnInscription.bind(this, doc.id)}
                              className="btn-link"
                              title="Borrar"
                            >
                              x
                            </button>
                          </span>
                          <span style={{ fontSize: "1.2rem" }}>
                            Entrega: {getTimeSendDocument(doc.time_send)}
                          </span>
                        </h4>
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
                  <h2 className="card-inside-title">Autores</h2>
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
                        Cantida máxima de autores:
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
                        placeholder="Ingrese descripcion de la modalidad de titulación"
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
                        placeholder="Ingrese descripcion de la modalidad de titulación"
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
                    Solicitud de extension del tiempo:
                  </RadioButton>
                </div>

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
                        placeholder="Ingrese descripcion de la modalidad de titulación"
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
                    Configuracion de seguimiento y control de la modalidad
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
                    Es obligatorio el envio del avance del proyecto por el
                    estudiante
                  </RadioButton>
                </div>

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
                        Frencuencia de envio de avance del estudiante:
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

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="mandatory_month_report_tutor"
                    value={values.mandatory_month_report_tutor}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    Revision obligatoria del avance por el tutor
                  </RadioButton>
                </div>

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
                        Frencuencia de revision del tutor
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

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="mandatory_month_report_external_tutor"
                    value={values.mandatory_month_report_external_tutor}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    Revision obligatoria del avance por el tutor externo
                  </RadioButton>
                </div>

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
                        Frecuencia de revision por el tutor externo
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

                <div className="col-md-12 col-lg-12">
                  <div className="align-center bg-primary">
                    <div className="color-name">
                      Configuracion de finalizacion de modalidad
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="send_final_document"
                    value={values.send_final_document}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    La modalidad requiere el envio de documento final
                  </RadioButton>
                </div>

                <div
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
                </div>

                <div
                  className="col-lg-offset-3 col-lg-6 col-md-offset-1 col-md-10"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="send_resolution_commission_aproval"
                    value={values.send_resolution_commission_aproval}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                    La modalidad requiere una resolucion de aprobacion por la
                    comision encargada
                  </RadioButton>
                </div>
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
