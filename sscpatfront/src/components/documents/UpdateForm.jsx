import React, { useState, useEffect } from "react";
import { connect , } from "react-redux";
import { validateInput } from "../../utils/Validations";
import { get,update} from "../../actions/documents";
import { useHistory } from "react-router-dom";
import SelectForm from "../../components/atoms/SelectForm";
 


const initialValues = {  // data will be for ever strings
  title: "",
  description: "",
};

const validate = {
  title: {
    is_required: true,
    max_length: 60,
    min_lenght: 2,
  },
  description: {
    is_required: false,
    max_length: 1024
  },

};

const UpdateForm = (props) => {

  const obj = props.results.find((obj) => obj.id === props.id) 
  const [values, setValues] = useState(obj);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focus, setFocus] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const onChange = (e) => {
    const { name, value: newValue, type } = e.target;
    const value = type === "number" ? +newValue : newValue;
    setValues({ ... values, [name]: value });
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
    if (formValidation()) {
      const res = await props.update(values.id,values);
      if (res) { loadErrorForm(res)}
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
  }, [])

  
  if (!values){
    return <h3>Cargando .. </h3>
  }
  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="card">
          <div className="header">
            <h2>
              Actualizar Documento
              <small> </small>
            </h2>
          </div>

          <div className="body">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="align-center bg-primary">
                    <div className="color-name">Actualizar Documento</div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12">
                  <div className="form-group">
                    <label htmlFor="title">
                      Nombre del documento <strong style={{ color: "red" }}>*</strong>
                    </label>

                    <div
                      className={
                        focus.title ? "form-line focused" : "form-line"
                      }
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej: Tesis de grado.."
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
                <div className="col-md-12 col-lg-12">
                  <div className="form-group">
                    <label htmlFor="description">
                      Description 
                    </label>
                    <div
                      className={focus.description ? "form-line focused" : "form-line"}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese descripcion del documento"
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      />
                    </div>
                    {touched.description && errors.description ? (
                      <label id="description-error" className="error" htmlFor="description">
                        {errors.description}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="col-md-12 col-lg-12">
                  <SelectForm
                    name="time_send"
                    value={values.time_send}
                    touched={touched.time_send}
                    error={errors.time_send}
                    focus={focus.time_send}
                    required={true}
                    onChange={onChange}
                    title="Tiempo de entrega del documento"
                  >
                    
                        <option value="-2">Cualquier moment</option>
                        <option value="-1">Al finalizar</option>
                        <option value="0">Al inicio</option>
                        <option value="15">A los 15 días</option>
                        <option value="30">A los 30 días</option>
                        <option value="45">A los 45 días</option>
                        <option value="60">A los 60 días</option>
                        <option value="90">A los 90 días</option>
                  
                  </SelectForm>

                </div>

                <div className="col-md-12 col-lg-12 aling-center">
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
                    {loading ? "Actualizando..." : "Actualizar"}
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
  results: state.documents.results,
  object: state.documents.object
});

const mapDispatchToProps = {
  get,
  update,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);
