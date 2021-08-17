import React, { useState } from "react";
import { connect } from "react-redux";
// import { getNameMonth } from "../../actions/helper";
import SelectedName from "../../components/atoms/SelectedName";
import {
  // formGeneralValidation,
  validateInput,
  loadGeneralErrorForm,
} from "../../utils/Validations";
import { add, get, update } from "../../actions/tracingprogress";
import Spinner from "../atoms/Spinner";
import { ADMIN, EXTERNAL_TUTOR, STUDENT, TUTOR } from "../../actions/types";
import { ACCEPTED_FILES } from "../../actions/types";
// import InputForm from "../../components/atoms/InputForm";
// import { compose } from "redux";




const initialValues = {
  tracingstudent: 0,
  description: "",
  typetracing: "COMMENT",
};

const validate = {
  description: {
    is_required: false,
    max_length: 4096,
  },
};


const initialFormValues = [
  {
    id:"q1",
    title:"1. Pertinencia Relevancia y Originalidad del tema",
    name:"q1",
    placeholder:"Acerca del tema",
    value:"",
  },
  {
    id:"q2",
    title:"2. Problematización y plantamiento de preguntas-objetivos",
    name:"q2",
    placeholder:"Acerca de la problematica del tema y todos sus elementos",
    value:"",
  },
  {
    id:"q3",
    title:"3. Manejo Teórico/ Antecedentes / recursos bibliográficos",
    name:"q3",
    placeholder:"Revisión de los conceptos, redacción , desarrollo la estructura conceptual del tema.",
    value:"",
  },
  {
    id:"q4",
    title:"4. Estrategia Metodológica y eventuales avances de Investigación",
    name:"q4",
    placeholder:"Acerca de la metodología empleada",
    value:"",
  },
  {
    id:"q5",
    title:"5. Coherencia e Integralidad",
    name:"q5",
    placeholder:"Coherencia e integridad acerca de las ideas desarrolladas",
    value:"",
  },
  {
    id:"q6",
    title:"6. Otros",
    name:"q6",
    placeholder:"Si existe otros puntos mencióne.",
    value:"",
  },
]

const optionValues = {
  comment: "COMMENT",
  institutionReport: "INSTITUTION_REPORT",
  tutor: "INTERNAL_TUTOR",
  tutor_form: "INTERNAL_TUTOR_FORM",
  externalTutor: "EXTERNAL_TUTOR",
  admin: "ADMIN",
};

const TracingProgressForm = (props) => {
  const { progress_id, add, auth, tracingstudent } = props;
  let tracingProgressValues = {
    ...initialValues,
    tracingstudent: progress_id,
  };
  const [values, setValues] = useState(tracingProgressValues);
  const [formValues, setFormValues] = useState(initialFormValues)
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  // const [touched, setTouched] = useState({});
  const [focus, setFocus] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  let titleBtn = "";

  const typeTracingValues = [];

  typeTracingValues.push(
    <option key={"comment"} value={optionValues.comment}>
      Comentario
    </option>
  );

  if (titleBtn === "") {
    if (auth.type === ADMIN) {
      if (tracingstudent && tracingstudent.inscription.institution) {
        typeTracingValues.push(
          <option key={"inst_report"} value={optionValues.institutionReport}>
            Informe de institución
          </option>
        );
      }

      typeTracingValues.push(
        <option key={"tutor_report"} value={optionValues.tutor}>
          Revisión del tutor
        </option>
      );
      titleBtn = "Revisar de documentos y comentar.. ";
    } else if (auth.type === STUDENT) {
      if (tracingstudent && tracingstudent.inscription.institution) {
        typeTracingValues.push(
          <option key={"inst_report"} value={optionValues.institutionReport}>
            Informe de institución
          </option>
        );
        titleBtn = "Comentar o subir informe de la institución";
      } else {
        titleBtn = "Comentar";
      }
    } else if (auth.type === TUTOR) {
      typeTracingValues.push(
        <option key={"tutor_report"} value={optionValues.tutor}>
          Revisión del tutor
        </option>
      );

      typeTracingValues.push(
        <option key={"tutor_report_form"} value={optionValues.tutor_form}>
          Revisión del tutor ( Formulario) .
        </option>
      );
      titleBtn = "Redactar revisión del avance estudiante o dejar comentario ";
    } else if (auth.type === EXTERNAL_TUTOR) {
      typeTracingValues.push(
        <option key={"inst_report"} value={optionValues.externalTutor}>
          Revisión del tutor
        </option>
      );
      titleBtn = "Redactar revisión del avance estudiante o dejar comentario ";
    }
  }

  const [showForm, setShowForm] = useState(false);

  //** actions for upload files */
  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (ACCEPTED_FILES.includes(file.type)) {
        setFiles([...files, file]);
        setUploadError(null);
      } else {
        setUploadError("El archivo debe ser en formato PDF o una imagen");
      }
    }
  };

  /** Remove files on list files */
  const removeFile = (name) => {
    setFiles(files.filter((f) => f.name !== name));
  };

  const onChangeSelect = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
  };


  const onChangeFormTutor= (e) => {
    const { name, value } = e.target;
    let input = formValues.find((input) => input.name === name )
    input.value=value
    setFormValues(formValues.map((obj) => obj.id === input.id? input:obj))
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
    setFocus({ ...focus, [name]: false });
  };

  const onFocus = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
    // setTouched({ ...touched, [e.target.name]: true });
  };

  const formValidation = () => {
    let validFile = true;
    let validForm = true;
    let message = "";
    let messageFile = "";

   
    switch (values.typetracing) {
      case optionValues.admin:
        validForm = values.description !== "";
        message = "Este campo es requerido";
        break;

      case optionValues.comment:
        validForm = values.description !== "";
        message = "Este campo es requerido";
        break;

      case optionValues.tutor:
        validForm = values.description !== "";
        message = "Este campo es requerido";
        break;      
      
      case optionValues.tutor_form:
        validForm = !formValues.every(input => input.value === "")
        message = "Ingresa al menos un punto de evaluación"
        break;

      case optionValues.externalTutor:
        validForm = values.description !== "";
        message = "Este campo es requerido";
        break;

      case optionValues.institutionReport:
        validFile = files.length > 0;
        messageFile = "Debe enviar un informe en pdf o fotografía";

        break;
      default:
        break;
    }

    validFile ? setUploadError(null) : setUploadError(messageFile);
    validForm
      ? setErrors({ description: null })
      : setErrors({ description: message });
    return validFile && validForm;
  };

  const createDescription = () =>{
     let text =""
     formValues.map(input => {
       if(input.value !== ""){
         text +=  input.title + ": \n" + "  - " + input.value + "\n\n" ;  // eslint-disable-line
       }
       return text
     })
     return text
  }

  const insertFiles = () => {
    const f = new FormData();
    f.append("tracingstudent", values.tracingstudent);
    f.append("description",  values.typetracing === optionValues.tutor_form ? createDescription(): values.description);
    f.append("typetracing", values.typetracing === optionValues.tutor_form ? optionValues.tutor : values.typetracing );
    for (let index = 0; index < files.length; index++) {
      f.append(`files[${index}]`, files[index]);
    }
    return f;
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
      res = await add(progress_id, requestValues);

      if (res) {
        loadGeneralErrorForm(res, setErrors);
      } else {
        setValues(tracingProgressValues);
        setFiles([]);
        setShowForm(false);
      }
    }
    setLoading(false);
  };

  return (
    <>
      {!showForm ? (
        <div className="card animated fadeIn">
          <div className="header">
            <button
              className="btn-upload-progress"
              onClick={() => setShowForm(true)}
            >
              {titleBtn}
            </button>
          </div>
        </div>
      ) : (
        <div className="card animated fadeIn">
          <div className="header">
            <select
              id="typetracing"
              name="typetracing"
              title="Mes de avance"
              className="select-month pull-right"
              value={values.typetracing}
              onChange={onChangeSelect}
            >
              {typeTracingValues}
            </select>
          </div>

          <div className="body">
            <div className="row">
              {values.typetracing === optionValues.tutor_form ? (
                <>
                  { formValues.map((input,index) =>(
                    <div className="col-lg-12"  key={index}>
                    <label htmlFor="">
                      {input.title}
                    </label>
                    <div className="form-group">
                      <div className="content-text-area">
                        <textarea
                          id={input.id}
                          name={input.name}
                          cols="30" 
                          rows="1"
                          className="form-control text-area-style"
                          placeholder={input.placeholder}
                          value={input.value}
                          onChange={onChangeFormTutor}
                          // onBlur={onBlur}
                          // onFocus={onFocus}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  ))}
                  
                </>
              ) : (
                <div className="col-lg-12 m-b-0">
                  <div className="form-group">
                    <div className="content-text-area">
                      <textarea
                        id="description"
                        name="description"
                        cols="30"
                        rows="5"
                        className="form-control text-area-style"
                        placeholder="Comenta o realiza una acción como revisión del avance... "
                        value={values.description}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      ></textarea>
                    </div>

                  </div>
                </div>
              )}

             <div className="col-lg-12">
               {errors.description && (
                  <label
                    id="title-error"
                    className="error col-red"
                    htmlFor="description"
                  >
                    {errors.description}
                  </label>
                )}
             </div>

              <div className="col-lg-12 m-b-0">
                {files.map((file, index) => (
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
              <div className="col-lg-12" style={{ margin: 0 }}>
                {loading && (
                  <div className="align-center">
                    <Spinner size={"md"} />
                  </div>
                )}
                <label htmlFor="files" className="btn btn-link">
                  <i className="material-icons">attach_file</i> Agregar
                </label>
                <input
                  id="files"
                  type="file"
                  name="files"
                  onChange={uploadFile}
                  className="input-file"
                />

                <button
                  className="btn m-r-10 pull-right"
                  onClick={onSubmit}
                  disabled={loading}
                >
                  {loading ? "Registrando.." : "Registrar"}
                </button>
                <button
                  className="btn btn-default m-r-10 pull-right"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>

                <div className="form-group">
                  {uploadError && (
                    <label className="error">{uploadError}</label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  results: state.tracingstudent.results,
  tracingstudent: state.tracingstudent.object,
});

const mapDispatchToProps = {
  add,
  get,
  update,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TracingProgressForm);
