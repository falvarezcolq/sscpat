import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { addTutor, removeTutor, searchTutor } from "../../actions/tutors";
import { validateInput } from "../../utils/Validations";
import { getUser, updateUser } from "../../actions/users";
import { Link } from "react-router-dom";
import Config from "../../utils/Config";
import InputForm from "../atoms/InputForm";
import Spinner from "../../components/atoms/Spinner";
import { getNameType } from "../../actions/helper";
// import AuthHandler  from "../../utils/AuthHandler";
import AlertMessage from "../atoms/AlertMessage";


const validate = {
  username: {
    is_required: true,
    max_length: 30,
    min_lenght: 2,
  },
  password: {
    // is_required: false,
    // max_length: 30,
    // min_lenght: 5,
  },
  type: {
    select: true,
  },
  email: {
    email: true,
  },

  first_name: {
    is_required: true,
    max_length: 30,
    min_lenght: 5,
  },
  last_name: {
    max_length: 30,
  },
  last_name2: {
    max_length: 30,
  },
  CI: {
    is_required: true,
    max_length: 30,
  },
  RU: {},

  position: {},
  academic_degree: {},
  abbreviation: {},
  phone: {},
  telf: {},
};

const UserEditResctrictForm = ({
  id,
  isLoading,
  getUser,
  updateUser,
  results,
}) => {
  let user = results.find((user) => user.id === id);
  const [values, setValues] = useState(user);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focus, setFocus] = useState({});

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
    // validate the field if the value has been touched
    setErrors({ ...errors, [name]: error });
    setFocus({ ...focus, [name]: false });
  };

  const onFocus = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
    setTouched({ ...touched, [e.target.name]: true });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formValidation = Object.keys(values).reduce(
      (acc, key) => {
        // const newError = validate[key](values[key]);
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
    setErrors(formValidation.errors);
    setTouched(formValidation.touched);

    if (Object.values(formValidation.errors).every((t) => t === null)) {
      const res = await updateUser(id, values);

      if (res.error) {
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
      }
    }
  };

  useEffect(() => {
    if (!values) {
      loadUser(id);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadUser = async (id) => {
    const user = await getUser(id);
    setValues({ ...values, ...user });
  };

  if (!values) {
    return (
      <div className="align-center">
        <Spinner />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>

      <div className="row">
        <div className="col-lg-12">
          <div className="align-center bg-indigo">
            <div className="color-name">Información de usuario</div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="first_name">
              Nombres <strong style={{ color: "red" }}>*</strong>
            </label>
            <div
              className={focus.first_name ? "form-line focused" : "form-line"}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese nombres"
                id="first_name"
                name="first_name"
                value={values.first_name}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={true}
              />
            </div>
            {touched.first_name && errors.first_name ? (
              <label
                id="first_name-error"
                className="error"
                htmlFor="first_name"
              >
                {errors.first_name}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="last_name">Apellido Paterno</label>
            <div
              className={focus.last_name ? "form-line focused" : "form-line"}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese apellido paterno"
                id="last_name"
                name="last_name"
                value={values.last_name}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={true}
              />
            </div>
            {touched.last_name && errors.last_name ? (
              <label id="last_name-error" className="error" htmlFor="last_name">
                {errors.last_name}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="last_name2">Apellido Materno</label>
            <div
              className={focus.last_name2 ? "form-line focused" : "form-line"}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese apellido materno"
                id="last_name2"
                name="last_name2"
                value={values.last_name2}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={true}
              />
            </div>
            {touched.last_name2 && errors.last_name2 ? (
              <label
                id="last_name2-error"
                className="error"
                htmlFor="last_name2"
              >
                {errors.last_name2}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="CI">
              Cedula de identidad C.I.
              <strong style={{ color: "red" }}>*</strong>
            </label>
            <div className={focus.CI ? "form-line focused" : "form-line"}>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese cedula de identidad"
                id="CI"
                name="CI"
                value={values.CI}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={true}
              />
            </div>
            {touched.CI && errors.CI ? (
              <label id="CI-error" className="error" htmlFor="CI">
                {errors.CI}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="RU">Registro universitario R.U.</label>
            <div className={focus.RU ? "form-line focused" : "form-line"}>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese número de registro universitario"
                id="RU"
                name="RU"
                value={values.RU}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={true}
              />
            </div>
            {touched.RU && errors.RU ? (
              <label id="RU-error" className="error" htmlFor="RU">
                {errors.RU}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="email">
              email<strong style={{ color: "red" }}>*</strong>
            </label>
            <div className={focus.email ? "form-line focused" : "form-line"}>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese correo electrónico"
                id="email"
                name="email"
                value={values.email}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
              />
            </div>
            {touched.email && errors.email ? (
              <label id="email-error" className="error" htmlFor="email">
                {errors.email}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        
        
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="position">Posición</label>
            <div className={focus.position ? "form-line focused" : "form-line"}>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese posición en el organigrama (opcional)"
                id="position"
                name="position"
                value={values.position}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
              />
            </div>
            {touched.position && errors.position ? (
              <label id="position-error" className="error" htmlFor="position">
                {errors.position}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="academic_degree">Grado académico</label>
            <div
              className={
                focus.academic_degree ? "form-line focused" : "form-line"
              }
            >
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese grado académico"
                id="academic_degree"
                name="academic_degree"
                value={values.academic_degree}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
              />
            </div>
            {touched.academic_degree && errors.academic_degree ? (
              <label
                id="academic_degree-error"
                className="error"
                htmlFor="academic_degree"
              >
                {errors.academic_degree}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="abbreviation">
              Abreviación del grado académico
            </label>
            <div
              className={focus.abbreviation ? "form-line focused" : "form-line"}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese abreviación del grado académico ( opcional )"
                id="abbreviation"
                name="abbreviation"
                value={values.abbreviation}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
              />
            </div>
            {touched.abbreviation && errors.abbreviation ? (
              <label
                id="abbreviation-error"
                className="error"
                htmlFor="abbreviation"
              >
                {errors.abbreviation}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="phone">celular</label>
            <div className={focus.phone ? "form-line focused" : "form-line"}>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese número de celular"
                id="phone"
                name="phone"
                value={values.phone}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
              />
            </div>
            {touched.phone && errors.phone ? (
              <label id="phone-error" className="error" htmlFor="phone">
                {errors.phone}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="telf">Telefono</label>
            <div className={focus.telf ? "form-line focused" : "form-line"}>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese número de teléfono"
                id="telf"
                name="telf"
                value={values.telf}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
              />
            </div>
            {touched.telf && errors.telf ? (
              <label id="telf-error" className="error" htmlFor="telf">
                {errors.telf}
              </label>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <InputForm
            name="address"
            focus={focus.address}
            placeholder="Ingrese dirección del usuario"
            value={values.address}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            touched={touched.address}
            error={errors.address}
            title="Dirección"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="align-center bg-indigo">
            <div className="color-name">Credenciales</div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>

            <div className="form-line">
              <label className="form-control">{values.username}</label>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="form-line">
              <label className="form-control">*****</label>
            </div>
            <Link to={Config.updateMyPasswordUrl}>Actualizar contraseña</Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label htmlFor="type">Tipo de usuario</label>
            <div className="form-line">
              <label className="form-control">{getNameType(values.type)}</label>
            </div>
          </div>
        </div>
        <div className="col-lg-12 align-center">
          <AlertMessage/>
        </div>  
        <div className="col-lg-12 align-center">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
      </div>

    </form>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.form.isLoading,
  results: state.users.results,
});

const mapDispatchToProps = {
  getUser,
  updateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserEditResctrictForm);
