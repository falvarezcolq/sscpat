import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { validateInput } from "../../utils/Validations";
import { get,update} from "../../actions/institutions";
import { useHistory } from "react-router-dom";
import InputForm from "../atoms/InputForm";
import {validate } from "./states";
import Spinner from "../atoms/Spinner";


const UpdateForm = (props) => {
  const obj = props.results.find((obj) => obj.id === props.id) 
  const [values, setValues] = useState(obj);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focus, setFocus] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onChange = (e) => {
    const { name, value: newValue, type } = e.target;
    const value = type === "number" ? +newValue : newValue;
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
    const id = props.id;
    if (formValidation()) {
      const res = await props.update(id,values);
      if (res) {
        loadErrorForm(res);
      }
    }
    setLoading(false);
  };

  const loadingData = async () =>{
    const id = props.id;
    const object = await props.get(id)
    setValues(object)
  }

  useEffect(() => {
    if(!values){
      loadingData()
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps 

  
  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="card">
          <div className="header">
            <h2>
              Institución
              <small> Actualizar información de la institución</small>
            </h2>
          </div>

          <div className="body">
            { values ?

            
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="align-center bg-primary">
                    <div className="color-name">Actualizar</div>
                  </div>
                </div>
                <div className="col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
                  <InputForm
                    name="name"
                    required={true}
                    focus={focus.name}
                    placeholder="Ingrese nombre de la institución"
                    value={values.name}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    touched={touched.name}
                    error={errors.name}
                    title="Nombre de la institución"
                  />
                </div>

                <div className="col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
                  <InputForm
                    name="responsable"
                    required={true}
                    focus={focus.responsable}
                    placeholder="Ingrese nombre completo del responsable"
                    value={values.responsable}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    touched={touched.responsable}
                    error={errors.responsable}
                    title="Responsable (Nombre completo)"
                  />
                </div>

                <div className="col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
                  <InputForm
                    name="phone"
                    required={true}
                    focus={focus.phone}
                    placeholder="Ingrese celular o teléfono de contacto"
                    value={values.phone}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    touched={touched.phone}
                    error={errors.phone}
                    title="Celular o teléfono"
                  />
                </div>


                <div className="col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
                  <InputForm
                    name="address"
                    required={true}
                    focus={focus.address}
                    placeholder="Ingrese dirección de la institucion"
                    value={values.address}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    touched={touched.address}
                    error={errors.address}
                    title="Dirección"
                  />
                </div>

                <div className="col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
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
                    {loading ? "Actualizand..." : "Actualizar"}
                  </button>
                </div>
              </div>
            </form>
          :  
              <Spinner/>
          }
         </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  results: state.institutions.results,
  // object: state.documents.object
});

const mapDispatchToProps = {
  get,
  update,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);
