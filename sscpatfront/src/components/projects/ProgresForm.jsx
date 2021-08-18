import React, { useState ,useEffect } from "react";
import { connect } from "react-redux";
import { getNameDateMonth } from "../../actions/helper";
import SelectedName from "../../components/atoms/SelectedName";
import {
  formGeneralValidation,
  validateInput,
  loadGeneralErrorForm,
} from "../../utils/Validations";
import { add, get, update } from "../../actions/tracingstudent";
import Spinner from "../atoms/Spinner";
import { ACCEPTED_FILES } from "../../actions/types";
import {getMonths} from "../../actions/projects";

var today = new Date();
const initialValues = {
  inscription: 0,
  description:  "",
  date_month: today.getFullYear()+"-"+((today.getMonth() + 1)<10? "0":"")+(today.getMonth() + 1)+"-01",
  is_final_document: false,
};

const validate = {
  description: {
    is_required: true,
    min_length: 5,
  },
  month: {},  
};

const ProgresForm = (props) => {
  const { project_id, add, date_months } = props;

  let progressValues = {
    ...initialValues,
    inscription: project_id,
  };
  const [values, setValues] = useState(progressValues);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  // const [touched, setTouched] = useState({});
  const [focus, setFocus] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);


  // for (let index = 1; index <= 12; index++) {
  //   months.push(
  //     <option key={index} value={index}>
  //       {" "}
  //       {getNameMonth(index)}
  //     </option>
  //   );
  // }

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

    // if file.mime
  };
  /** Remove files on list files */
  const removeFile = (name) => {
    setFiles(files.filter((f) => f.name !== name));
  };

  const onChangeSelect = (e) => {
    console.log(e.target.value)
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
    // setTouched({ ...touched, [e.target.name]: true });
  };

  const formValidation = () => {
    const generalValidate = formGeneralValidation(values, validate, setErrors);
    if (files.length === 0) {
      setUploadError(
        "Debe enviar al menos un archivo, el formato aceptado es PDF"
      );
    } else {
      setUploadError(null);
    }
    return generalValidate && files.length !== 0;
  };

  const insertFiles = () => {
    
    // validate date month
    var month = null
    if (values.date_month in date_months){
      month = values.date_month
    }else{
      if ( date_months.length > 0 ){
        month = date_months[0]
      }else{
        month = values.date_month
      }
    }
    
    const f = new FormData();
    f.append("inscription", values.inscription);
    f.append("description", values.description);
    f.append("date_month", month);
    f.append("is_final_document", values.is_final_document);
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
      res = await add(project_id, requestValues);
      if (res) {
        loadGeneralErrorForm(res, setErrors);
      } else {
        setValues(progressValues);
        setFiles([]);
        setShowForm(false);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    loadingData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadingData = () => {
    props.getMonths(project_id)    
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
              {" "}
              + Subir avance
            </button>
          </div>
        </div>
      ) : ( 
        <div className="card animated fadeIn">
          <div className="header">
            Entrega de avance correspondiente al mes de:
            <select
              id="date_month"
              name="date_month"
              title="Mes de avance"
              className="select-month"
              value={values.date_month}
              onChange={onChangeSelect}
            >
              {date_months.map((date,index)=>(
                <option key={index} value={date}>
                       {" "}
                       {getNameDateMonth(date)}
                       
                </option>
              ))}
            </select>
          </div>

          <div className="body">
            <div className="row">
              <div className="col-lg-12 m-b-0">
                <div className="form-group">
                  <div className="content-text-area">
                    <textarea
                      name="description"
                      id="description"
                      cols="30"
                      rows="10"
                      className="form-control text-area-style"
                      placeholder="Ingresar descripción de avance... "
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
                  {loading ? "Registrando.." : "+ Subir avance"}
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
  results: state.tracingstudent.results,
  date_months: state.projects.date_months
});

const mapDispatchToProps = {
  add,
  get,
  update,
  getMonths,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgresForm);
