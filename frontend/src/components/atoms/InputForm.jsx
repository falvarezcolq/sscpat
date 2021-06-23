import React ,{ useState }from "react";

const InputForm = (props) => {

    const {
        type,
        name,
        required,
        focus,
        placeholder,
        value,
        onBlur,
        onChange,
        onFocus,
        touched,
        error,
        title
    } = props

  const [password,setPassword] = useState( type === "password" )
  const [typeInput,setTypeInput]= useState( type ? type:"text" )
  const toggleShow=()=>{

    setPassword(!password)
    setTypeInput( !password ? "password":"text")
  }

  return (
    <div className="form-group">
      <label htmlFor={name} >
        {title} 
        {required && <strong style={{ color: "red" }}>*</strong>}
        {type === "password" &&
        <button className="btn btn-link btn-sm" type="button" onClick={toggleShow}> { password ? "Mostrar" : "Ocultar" }</button>
        }
      </label>
        
      <div className={focus ? "form-line focused" : "form-line"}>
        <input
          type={typeInput}
          className="form-control"
          placeholder={placeholder}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
      {touched && error ? (
        <label id="title-error" className="error" htmlFor={name}>
          {error}
        </label>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputForm;
