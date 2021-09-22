import React from "react";
// import { remove } from "../../actions/institutions";

const SelectFormRight = (props) => {
  const {
    name,
    required,
    focus,
    value,
    // onBlur,
    onChange,
    // onFocus,
    touched,
    error,
    title,
    addUrl,
    reload,
  } = props;

  const openNewWindowTab = () => {
    if (addUrl) {
      window.open(addUrl, "Data", "height=750,width=750");
    }
  };

  const reloadData = () => {
    if (reload) {
      reload();
    }
  };

  return (
    <div className="form-group" style={{ width: "100%" ,margin:"0px"}}>
      <div className={focus ? "focused" : ""} style={{position:"relative",top:"-9px"}}>
        <label style={{ width: "80%" }} htmlFor={name}>
          {title} {required && <strong style={{ color: "red" }}>*</strong>}
          {reload && (
            <button type="button" className="btn-link" onClick={reloadData}>
              <i className="material-icons" style={{ fontSize: "15px" }}>
                autorenew
              </i>
            </button>
          )}
          {addUrl && (
            <button
              type="button"
              className="btn-link"
              onClick={openNewWindowTab}
            >
              <i className="material-icons" style={{ fontSize: "15px" }}>
                add
              </i>
            </button>
          )}
        </label>

        <select
          id={name}
          name={name}
          className="form-control show-tick"
          tabIndex="-98"
          value={ value }
          onChange={onChange}
          style={{color:"red",fontSize:"1.8rem"}}
          // onBlur={onBlur}
          // onFocus={onFocus}
        >
          {props.children}
        </select>
      </div>

      {touched && error && (
        <label className="error" htmlFor={name}>
          {error}
        </label>
      )}
    </div>
  );
};

export default SelectFormRight;
