import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { validateInput } from "../../utils/Validations";
import { getUser , updateUserAccess } from "../../actions/users";
import { useHistory } from "react-router-dom";
// import InputForm from "../atoms/InputForm";
import Spinner from "../atoms/Spinner";
import RadioButton from "../atoms/RadioButton";

const initialValues = {
  // data will be for ever strings
  user:0,
  is_active: false,
};

const validate = {
  is_active: {
    is_boolean: true,
  },
};

const UpdateUserAccess = (props) => {
  let user = props.results.find((user)=>user.id==props.id)
  const [values, setValues] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [focus, setFocus] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();




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

  const onSubmitAccess = async (e) => {
    e.preventDefault();
    setLoading(true); 
    formSubmit();
  };

  const formSubmit = async () => {
    if (formValidation()) {
      console.log("hrllo")
      const res = await props.updateUserAccess(values);
      if (res) {
        if (!res.message){
          loadErrorForm(res);
        }        
      }
    }
    setLoading(false);
  };

  const loadingData = async () =>{
    const id = props.id;
    user = await props.getUser(id)
    setValues({
      user:user.id,
      is_active:user.is_active,
      object:user   
    })
  }

  useEffect(() => {
    if(user){
      setValues({
        user:user.id,
        is_active:user.is_active,
        object:user
      })  
    }else{
      loadingData()
    }
  }, [])

  const onChangeRadioButton = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: !values[name] });
  };


  return (
    <div className="row clearfix">
      <div className="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2  col-md-8 col-lg-offset-3 col-lg-6">
        <div className="card">
          <div className="header">
            <h2>Permiso de acceso al sistema: 
             
              { values ? " "+values.object.first_name +" "+values.object.last_name +" "+values.object.last_name2 : "" }
              <small> Otorga o restringe acceso al sistema de un usuario</small>
            </h2>
          </div>

          <div className="body">
            { !values ? <div className="align-center" ><Spinner/></div>:
            
            <form onSubmit={onSubmitAccess}>
              <div className="row">
                
                <div
                  className="col-lg-12 col-md-12"
                  style={{ marginBottom: "0" }}
                >
                  <RadioButton
                    name="is_active"
                    value={values.is_active}
                    onChangeRadioButton={onChangeRadioButton}
                  >
                   Acceso del usuario al sistema
                  </RadioButton>

                  {errors.is_active ?  errors.is_active :""}
                </div>
                  <div className="col-md-12 col-lg-12 aling-center">
                    <button
                      type="submit"
                      className="btn btn-primary pull-right"
                      disabled={loading}
                    >
                      {loading ? "Guardando..." : "Guardar"}
                    </button>
                  </div>
              </div>  
            </form>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  results: state.users.results ,
  // object: state.documents.object
});

const mapDispatchToProps = {
  updateUserAccess,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserAccess);
