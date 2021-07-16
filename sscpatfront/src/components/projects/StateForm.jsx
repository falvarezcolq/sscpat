import React, { useState,useEffect } from "react";
import { connect } from "react-redux";

import { get, patch } from "../../actions/projects";
import Spinner from "../atoms/Spinner";
// import { ACCEPTED_FILES } from "../../actions/types";
import SelectForm from "../atoms/SelectForm";   
import AlertMessage from "../atoms/AlertMessage";

// var today = new Date();

const initialValues = {
  state: "CONCLUDED_SUCCESSFULLY",
};

const StateForm = (props) => {
  const { project_id, object ,get, patch } = props;

  let project = {
      ...initialValues,
      state: object ? object.state:"CONCLUDED_SUCCESSFULLY",
  }
  const [values, setValues] = useState(project);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const onChangeSelect = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    formSubmit();
  };

  const formSubmit = async () => {
    // if (formValidation()) {
      await patch(project_id, values);
    //   if (res) {
    //     loadGeneralErrorForm(res, setErrors);
    //   }
    // }
    setLoading(false);
  };

  useEffect(() => {
      setShowForm(false)
      loadData()
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async()=>{
      if ( !(object && object.id+"" === project_id+"")){
          const new_values = await get(project_id);
          setValues({state:new_values.state});
      }
      setShowForm(true)
  }


  

  return (
    <>
      { !showForm  && !object? (
        <div className="align-center">
          <Spinner />
        </div>
      ) : (
        <div className="card animated fadeIn">
          <div className="header">
            <h2>Actualizar estado del proyecto academico:</h2>
            <h2>Título: {object.title_academic_project}</h2>
          </div>

          <div className="body">
            <div className="row">
              <form onSubmit={onSubmit}>
                <div className="col-lg-12 m-b-0">
                  <SelectForm
                    name="state"
                    onChange={onChangeSelect}
                    title="Estado del proyecto"
                    required={true}
                    value={values.state}
                  >
                      
                      <option value="UNDER_DEVELOPMENT">En desarrollo</option>
                      <option value="CONCLUDED_SUCCESSFULLY">
                        Concluidos con exito
                      </option>
                      <option value="ABANDONED">Cerrado</option>
                  </SelectForm> 
                </div>
                {loading && 
                <div className="col-lg-12 align-center">
                    <Spinner/>
                </div>
                }

                <div className="col-lg-12 align-center">
                    <AlertMessage/>
                </div>

                <div className="col-lg-12 align-center">
                    <button 
                    className="btn btn-primary" 
                    type="submit"
                    disabled={loading}> {loading? "Guardando.. ": "Guardar"}</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  object: state.projects.object,
});

const mapDispatchToProps = {
  get,
  patch,
};

export default connect(mapStateToProps, mapDispatchToProps)(StateForm);
