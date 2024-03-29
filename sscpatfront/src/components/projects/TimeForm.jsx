import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import { getNameMonth } from "../../actions/helper";
// import SelectedName from "../../components/atoms/SelectedName";
import {
  // formGeneralValidation,
  validateInput,
  // loadGeneralErrorForm,
} from "../../utils/Validations";
import { get, updateDates } from "../../actions/projects";
import Spinner from "../atoms/Spinner";
// import { ACCEPTED_FILES } from "../../actions/types";
// import SelectForm from "../atoms/SelectForm";
import AlertMessage from "../atoms/AlertMessage";
import InputForm from "../atoms/InputForm";

// var today = new Date();
const initialValues = {
  date_init: null,
  date_end: null,
  extended: null,
  note:"",
};  

const validate = {};

const TimeForm = (props) => {
  const { project_id, object, get,updateDates } = props;

  let project = {
    ...initialValues,
    date_init: object ? object.date_init : "",
    date_end: object ? object.date_end : "",
    extended: true,
  };
  const [values, setValues] = useState(project);
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // const onChangeSelect = (e) => {
  //   const { name, value } = e.target;
  //   setValues({ ...values, [name]: value });
  // };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
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

  //   const formValidation = () => {
  //     const generalValidate = formGeneralValidation(values, validate, setErrors);
  //     return generalValidate;
  //   };

  const onSubmit = async (e) => {

    e.preventDefault();
    console.log(values)
    setLoading(true);
    formSubmit();
  };

  const formSubmit = async () => {
    // if (formValidation()) {
    await updateDates(project_id, values);
    //   if (res) {
    //     loadGeneralErrorForm(res, setErrors);
    //   }
    // }
    setLoading(false);
  };

  useEffect(() => {
    setShowForm(false);
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    if (!(object && object.id === project_id)) {
      const new_values = await get(project_id);
      setValues({ 
        date_init: new_values.date_init ,
        date_end: new_values.date_end ,
        note:"",
      });
    }
    setShowForm(true);
  };

  return (
    <>
      {showForm && object ?  (
        <div className="card animated fadeIn">
          <div className="header">
            <h2>Extender tiempo de desarrollo del proyecto académico:</h2>
            <h2>Título: {object.title_academic_project}</h2>
          </div>

          <div className="body">
            <div className="row">
              <form onSubmit={onSubmit}>
                <div className="col-lg-12">
                  <InputForm
                    name="date_init"
                    type="date"
                    value={values.date_init}
                    touched={touched.date_init}
                    error={errors.date_init}
                    focus={focus.date_init}
                    required={true}
                    placeholder="Fecha de inicio"
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    title="Fecha de inicio:"
                    disable={true}
                  />
                </div>

                <div className="col-lg-12">
                  <InputForm
                    name="date_end"
                    type="date"
                    value={values.date_end}
                    touched={touched.date_end}
                    error={errors.date_end}
                    focus={focus.date_end}
                    required={true}
                    placeholder="Fecha de finalización"
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    title="Fecha de finalización:"
                  />
                </div>

                <div className="col-lg-12">
                  <InputForm
                    name="note"
                    type="text"
                    value={values.note}
                    touched={touched.note}
                    error={errors.note}
                    focus={focus.note}
                    required={true}
                    placeholder="Ingrese hoja de ruta"
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    title="Hoja de ruta de autorizacion"
                  />
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
      ):(
        <div className="align-center">
          <Spinner />
        </div>
      ) }
    </>
  );
};

const mapStateToProps = (state) => ({
  object: state.projects.object,
});

const mapDispatchToProps = {
  get,
  updateDates,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeForm);
