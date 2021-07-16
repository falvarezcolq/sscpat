import React, { useState, } from "react";
import { connect } from "react-redux";
import { getSizeByte } from "../../actions/helper";
// import {
//   validateInput,
//   loadGeneralErrorForm,
// } from "../../utils/Validations";

import { addFile,addFileInit } from "../../actions/projectsdocuments";
import FileComponent from "../../components/atoms/FileComponent";
import Spinner from "../atoms/Spinner";

const UploadFileForm = (props) => {
  const { projectdocument_id, addFile,addFileInit, file, type } = props;

  const [newFile, setNewFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [loading,setLoading] = useState(null);

  const uploadFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.type === "application/pdf") {
        setNewFile(file);
        setUploadError(null);
      } else {
        setUploadError("El archivo debe estar en formato PDF");
      }
    }
  };

  /** Remove files on list files */
  const removeFile = () => {
    setNewFile(null);
  };

  // const removeServerFile = (id) => {
  //   setServerFiles(serverFiles.filter((f) => f.id !== id ));
  //   setDeleted([...deleted,id])
  // };

  // const onChangeSelect = (e) => {
  //   const { name, value } = e.target;
  //   setValues({ ...values, [name]: value });
  // };

  // const onChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({ ...values, [name]: value });
  //   const error = validateInput(name, value, validate[name]);
  //   setErrors({ ...errors, [name]: error });
  // };

  // const onBlur = (e) => {
  //   const { name, value } = e.target;
  //   const error = validateInput(name, value, validate[name]);
  //   setErrors({ ...errors, [name]: error });
  //   setFocus({ ...focus, [name]: false });
  // };

  // const onFocus = (e) => {
  //   setFocus({ ...focus, [e.target.name]: true });
  //   // setTouched({ ...touched, [e.target.name]: true });
  // };

  const formValidation = () => {
    const generalValidate = newFile != null;
    return generalValidate;
  };

  const insertFiles = () => {
    const f = new FormData();
    f.append(`file`, newFile);
    return f;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    formSubmit();
  };

  const formSubmit = async () => {
    if (formValidation()) {
      // let res;
      const requestValues = insertFiles();
      if (type === "document"){
        // res =
        await addFile(projectdocument_id, requestValues);
      }else{
        // res =
        await addFileInit(projectdocument_id, requestValues);
      }
      
      // if (res) {
      //   loadGeneralErrorForm(res, setErrors);
      // } else {
        setNewFile(null);
      // }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="col-lg-12" style={{ margin: 0 }}>
        {/* {loading && (
          <div className="align-center">
            <Spinner size={"md"} />
          </div>
        )} */}

        {file ? (
          <>
            <FileComponent file={file} />
            {newFile && (
              <h4 className="col-blue-grey font-12">
                Nuevo archivo: {" "}
                <span className="selected-name" style={{ color: "#a4a" }}>
                  {getSizeByte(newFile.size)}{" "}
                </span>

                <span className="selected-name">
                  {newFile.name}
                  <button
                    type="button"
                    onClick={() => removeFile()}
                    className="btn-link"
                    title="Borrar"
                  >
                    <span
                      style={{
                        fontSize: "18x",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      x
                    </span>
                  </button>
                </span>
              </h4>
            )}

           

            { newFile ?
             <button className="btn btn-success pull-right" onClick={onSubmit} disabled={loading}>
               {loading? <Spinner size="xs" /> : "Guardar" }
             </button>
            :
            <label
              htmlFor={projectdocument_id + "files" + type}
              className="btn btn-link col-blue-grey font-10 pull-right"
            >
              <i className="material-icons">file_upload</i> Actualizar
            </label>
            }
          </>
        ) : (
          <>
            {newFile && (
              <h4>
                <span className="selected-name" style={{ color: "#a4a" }}>
                  {getSizeByte(newFile.size)}{" "}
                </span>

                <span className="selected-name">
                  {newFile.name}
                  <button
                    type="button"
                    onClick={() => removeFile()}
                    className="btn-link"
                    title="Borrar"
                  >
                    <span
                      style={{
                        fontSize: "18x",
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      x
                    </span>
                  </button>
                </span>
              </h4>

              
            )}

            { newFile ?
             <button className="btn btn-success" onClick={onSubmit} disabled={loading}>
               {loading? <Spinner size="xs" /> : "Guardar" }
             </button>
            :
            <label 
              htmlFor={projectdocument_id + "files" + type}
              className="btn btn-warning"
            >
              <i className="material-icons">file_upload</i> Subir archivo
            </label>
            }


            
          </>
        )}

        <input
          id={projectdocument_id + "files" + type}
          type="file"
          name={projectdocument_id + "files" + type}
          onChange={uploadFile}
          className="input-file"
        />

        <div className="form-group">
          {uploadError && <label className="error">{uploadError}</label>}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
  addFile,
  addFileInit,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFileForm);

