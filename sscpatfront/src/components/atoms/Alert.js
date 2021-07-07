import React, { useState } from "react";

const Alert = (props) => {
  const [showAlert, setShowAlert] = useState(true);
  const hideAlert = () => setShowAlert(false)
  
  const color = props.color ? props.color:'green';  
  const classNameAlert = "alert alert-dismissible  bg-"+color
  return showAlert ?(
    <div className={classNameAlert} role="alert">
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={hideAlert}
      >
        <span aria-hidden="true">×</span>
      </button>
        {props.message}
    </div>
  ) : '' ;
};

export default Alert;
