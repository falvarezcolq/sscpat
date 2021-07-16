import React, { useState } from "react";
import { connect } from "react-redux";
import { validateInput } from "../../utils/Validations";
import { updatePassword } from "../../actions/users";
import { useHistory } from "react-router-dom";
import InputForm from "../atoms/InputForm";

const initialValues = {
  // data will be for ever strings
  password: "",
  new_password: "",
};

const validate = {
  password: {
    is_required: true,
    max_length: 60,
    min_length: 5,
  },
  new_password: {
    is_required: true,
    max_length: 60,
    min_length: 5,
  },
};

const UpdatePasswordForm = (props) => {
  const [values, setValues] = useState(initialValues);
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
    if (formValidation()) {
      const res = await props.updatePassword(values);
      if (res) {
        if (!res.message){
          loadErrorForm(res);
        }        
      }
    }
    setLoading(false);
  };

  // const loadingData = async () =>{
  //   const id = props.id;

  //   const object = await props.get(id)
  //   setValues(object)
  // }

  // useEffect(() => {
  //   if(!values){
  //     loadingData()
  //   }
  // }, [])

  // if (!values){
  //   return <h4>Cargando .. </h4>
  // }

  return (
    <div className="row clearfix">
      <div className="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2  col-md-8 col-lg-offset-3 col-lg-6">
        <div className="card">
          <div className="header">
            <h2>Actualizar contraseña</h2>
          </div>

          <div className="body">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="align-center bg-primary">
                    <div className="color-name">Actualizar</div>
                  </div>
                </div>

                <div className="col-md-12 col-lg-12">
                  <InputForm
                    type="password"
                    name="password"
                    required={true}
                    focus={focus.password}
                    placeholder="Contraseña actual"
                    value={values.password}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    touched={touched.password}
                    error={errors.password}
                    title="Contraseña"
                  />
                </div>

                <div className="col-md-12 col-lg-12">
                  <InputForm
                    type="password"
                    name="new_password"
                    required={true}
                    focus={focus.new_password}
                    placeholder="Contraseña nueva..."
                    value={values.new_password}
                    onBlur={onBlur}
                    onChange={onChange}
                    onFocus={onFocus}
                    touched={touched.new_password}
                    error={errors.new_password}
                    title="Contraseña  nueva"
                  />
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
  // results: state.documents.results,
  // object: state.documents.object
});

const mapDispatchToProps = {
  updatePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePasswordForm);
