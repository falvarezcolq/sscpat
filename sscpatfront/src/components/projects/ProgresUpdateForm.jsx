import React, { useState, useEffect } from "react";
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
import { getMonths } from "../../actions/projects";

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

const ProgresUpdateForm = (props) => {
  const { project_id, progress_id, get, update,cancel,date_months} = props;

  let progressValues = {
    ...initialValues,   
    inscription: project_id,
  };
  const [values, setValues] = useState(progressValues);
  const [files, setFiles] = useState([]);
  const [serverFiles , setServerFiles]= useState([])
  const [deleted,setDeleted] = useState([])
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const loadData= async ()=>{
    let res =  await get(project_id,progress_id)
  
    setValues({
      ...values,
      description: res.description,
      is_final_document:res.is_final_document,
      date_month:res.date_month,
    })
    setServerFiles(res.files)
    setFiles([]);
    setLoading(false) 
  }

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

  const removeServerFile = (id) => {
    setServerFiles(serverFiles.filter((f) => f.id !== id ));
    setDeleted([...deleted,id])
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
    return generalValidate;
  };

  const insertFiles = () => {
    const f = new FormData();
    f.append("inscription", values.inscription);
    f.append("description", values.description);
    f.append("date_month", values.date_month);
    f.append("is_final_document", values.is_final_document);
    f.append("deleted",JSON.stringify(deleted)) ;

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
      res = await update(project_id, progress_id, requestValues);
      if (res) {
        loadGeneralErrorForm(res, setErrors); 
      } else {
        cancel();
        setFiles([]);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true)
    loadData()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

 

  return (
    <>
      { loading ? (
       <div className="align-center"><Spinner/></div>
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

                {serverFiles.map((file, index) => (
                  <>
                    <SelectedName
                      key={index}
                      name={file.title}
                      id={file.id}
                      remove={removeServerFile}
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
                  {loading ? "Actualizar.." : "Actualizar"}
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
  results: state.tracingstudent.results,
  date_months: state.projects.date_months,
});

const mapDispatchToProps = {
  add,
  get,
  update,
  getMonths,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgresUpdateForm);
