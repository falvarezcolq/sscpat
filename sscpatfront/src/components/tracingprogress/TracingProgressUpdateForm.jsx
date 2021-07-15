import React, { useState , useEffect } from "react";
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

const optionValues = {
  comment: "COMMENT",
  institutionReport: "INSTITUTION_REPORT",
  tutor: "INTERNAL_TUTOR",
  externalTutor: "EXTERNAL_TUTOR",
  admin: "ADMIN",
};

const TracingProgressUpdateForm = (props) => {
  const { progress_id,tracing_progress_id, cancel, results, add, get, update, auth } = props;
  let tracingProgressValues = {
    ...initialValues,
    tracingstudent: progress_id,
  };

  const [values, setValues] = useState(tracingProgressValues);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [serverFiles, setServerFiles] = useState([])
  
  let titleBtn = "";
  const typeTracingValues = [];

  typeTracingValues.push(
    <option key={"comment"} value={optionValues.comment}>
      Comentario
    </option>
  );

  if (titleBtn === "") {
    if (auth.type === ADMIN) {
      typeTracingValues.push(
        <option key={"inst_report"} value={optionValues.institutionReport}>
          Informe de institución
        </option>
      );

      typeTracingValues.push(
        <option key={"tutor_report"} value={optionValues.tutor}>
          Revisión del tutor
        </option>
      );
      titleBtn = "Revisar de documentos y comentar.. ";

    } else if (auth.type === STUDENT) {
      typeTracingValues.push(
        <option key={"inst_report"} value={optionValues.institutionReport}>
          Informe de institución
        </option>
      );
    
      titleBtn = "Comentar o subir informe de la institución";

    } else if (auth.type === TUTOR) {
      typeTracingValues.push(
        <option key={"tutor_report"} value={optionValues.tutor}>
          Revisión del tutor
        </option>
      );
      titleBtn = "Redactar revision del avance estudiante o dejar comentario ";
    } else if (auth.type === EXTERNAL_TUTOR) {
      typeTracingValues.push(
        <option key={"inst_report"} value={optionValues.externalTutor}>
          Revisión del tutor
        </option>
      );
      titleBtn = "Redactar revision del avance estudiante o dejar comentario ";
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
    setFiles(files.filter((f) => f.name != name));
  };

  const removeServerFiles = (name) =>{
    setServerFiles(serverFiles.filter((file)=> file.title != name));
  }

  

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

  const onBlur = (e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
    setFocus({ ...focus, [name]: false });
  };

  const onFocus = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
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
    return true && validForm;
  };

  const insertFiles = () => {
    const f = new FormData();
    f.append("tracingstudent", values.tracingstudent);
    f.append("description", values.description);
    f.append("typetracing", values.typetracing);
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
      res = await update(progress_id, tracing_progress_id, requestValues);

      if (res) {
        loadGeneralErrorForm(res, setErrors);
      } else {
        setFiles([]);
        cancel();
        setUploadError(null)
      }
    }
    setLoading(false);
  };


  useEffect(() => {
   setShowForm(false)
   loadData()
  }, [tracing_progress_id])

  const loadData= async ()=>{
    let res =  await get(progress_id,tracing_progress_id)
    setValues({
      ...values,
      description: res.description,
      typetracing: res.typetracing,
    })
    setServerFiles(res.files)
    setFiles([]);
    setShowForm(true) 
    setUploadError(null)
  }  


  

  return (
    <>
      {!showForm ? (
        <div className="aling-center"> <Spinner/> </div>
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
              <div className="col-lg-12 m-b-0">
                <div className="form-group">
                  <div className="content-text-area">
                    <textarea
                      id="description"
                      name="description"
                      cols="30"
                      rows="5"
                      className="form-control text-area-style"
                      placeholder=" Comenta o realiza una accion como revision del avance... "
                      value={values.description}
                      onChange={onChange}
                      onBlur={onBlur}
                      onFocus={onFocus}
                    ></textarea>
                  </div>

                  {errors.description && (
                    <label
                      id="title-error"
                      className="error"
                      htmlFor="description"
                    >
                      {errors.description}
                    </label>
                  )}
                </div>

                {serverFiles.map((file, index) => (
                  <>
                    <SelectedName
                      key={index}
                      name={file.title}
                      remove={removeServerFiles}
                    />
                  </>
                ))}

               

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
                  onClick={cancel}
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
});

const mapDispatchToProps = {
  add,
  get,
  update,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TracingProgressUpdateForm);
