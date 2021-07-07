  import React from "react";

const RadioButton = (props) => {

  const {name,value,children,onChangeRadioButton}  = props
  return (
    <div className="form-group">
      <div
        className="form-line"
      >
        <label htmlFor={name}>
         {children}
        </label>
        <input
          name={name}
          type="radio"
          id={name+"_no"}
          className="with-gap pull-right"
          checked={!value}
          onChange={onChangeRadioButton}
        />
        <label
          htmlFor={name+"_no"}
          className="pull-right"
        >
          No
        </label>

        <input
          name={name}
          type="radio"
          id={name+"_yes"}
          className="with-gap pull-right"
          checked={value}
          onChange={onChangeRadioButton}
        />
        <label
          htmlFor={name+"_yes"}
          className="pull-right"
        >
          Si
        </label>
      </div>
    </div>
  );
};


export default RadioButton;