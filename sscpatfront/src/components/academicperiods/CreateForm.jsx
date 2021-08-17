import React, { useState } from "react";
import { connect } from "react-redux";
import { validateInput } from "../../utils/Validations";
import { add } from "../../actions/academicsperiod";
import AlertMessage from "../atoms/AlertMessage";


const initialValues = {  // data will be for ever strings
  title: "",
  year: "",
  semester: "1",
  date_init: "" ,
  date_end: "" ,
};

const validate = {
  title: {
    is_required: true,
    max_length: 30,
    min_lenght: 2,
  },
  year: {
    is_required: true,
    integer: true,
    max_integer: 3000,
    min_interger: 1990,
  },
  semester: {
    is_required: true,
    integer: true,
    max_integer: 2,
    min_interger: 1,
  },
  date_init: {
    is_required: true,
  },
  date_end: {
    is_required: true,
  },
};

const CreateForm = (props) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focus, setFocus] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value: newValue, type } = e.target;
    const value = type === "number" ? +newValue : newValue;
    setValues({ ...values, [name]:value});
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
      // setLoading(false);
      const res = await props.add(values);
      if (res) { loadErrorForm(res)}
    }
    setLoading(false);
  };

  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="card">
          <div className="header">
            <h2>
              Periodo académico Nuevo
              <small> Registra nuevo periodo académico</small>
            </h2>
          </div>

          <div className="body">
            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="align-center bg-indigo">
                    <div className="color-name">Periodo académico  nuevo</div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-12">
                  <div className="form-group">
                    <label htmlFor="title">
                      Periodo <strong style={{ color: "red" }}>*</strong>
                    </label>

                    <div
                      className={
                        focus.title ? "form-line focused" : "form-line"
                      }
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ej I/2020 ... "
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
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <label htmlFor="year">
                      Año<strong style={{ color: "red" }}>*</strong>
                    </label>
                    <div
                      className={focus.year ? "form-line focused" : "form-line"}
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese año"
                        id="year"
                        name="year"
                        value={values.year}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      />
                    </div>
                    {touched.year && errors.year ? (
                      <label id="year-error" className="error" htmlFor="year">
                        {errors.year}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <label htmlFor="semester">
                      Semestre<strong style={{ color: "red" }}>*</strong>
                    </label>
                    <div
                      className={
                        focus.semester ? "form-line focused" : "form-line"
                      }
                    >
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingrese contraseña"
                        id="semester"
                        name="semester"
                        value={values.semester}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      />
                    </div>
                    {touched.semester && errors.semester ? (
                      <label
                        id="semester-error"
                        className="error"
                        htmlFor="semester"
                      >
                        {errors.semester}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <label htmlFor="date_init">
                      Fecha de inicio
                      <strong style={{ color: "red" }}>*</strong>
                    </label>
                    <div
                      className={
                        focus.date_init ? "form-line focused" : "form-line"
                      }
                    >
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Ingrese fecha de inicio de periodo"
                        id="date_init"
                        name="date_init"
                        value={values.date_init}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      />
                    </div>
                    {touched.date_init && errors.date_init ? (
                      <label
                        id="date_init-error"
                        className="error"
                        htmlFor="date_init"
                      >
                        {errors.date_init}
                      </label>
                      ) : (
                        ""
                      )}
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="form-group">
                    <label htmlFor="date_end">
                      Fecha de concluci&oacute;n
                      <strong style={{ color: "red" }}>*</strong>
                    </label>
                    <div
                      className={
                        focus.date_end ? "form-line focused" : "form-line"
                      }
                    >
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Ingrese fecha de finalización de periodo"
                        id="date_end"
                        name="date_end"
                        value={values.date_end}
                        onChange={onChange}
                        onBlur={onBlur}
                        onFocus={onFocus}
                      />
                    </div>
                    {touched.date_end && errors.date_end ? (
                      <label
                        id="date_end-error"
                        className="error"
                        htmlFor="date_end"
                      >
                        {errors.date_end}
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-md-12 col-lg-12 align-center">
                      <AlertMessage/>
                </div>
                <div className="col-md-12 col-lg-12 align-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Registrando..." : "Registrar"}
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
});

const mapDispatchToProps = {
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
