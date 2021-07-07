
import React, { useState } from "react";

const Test = (props) => {
  const [showTest, setShowTest] = useState(true);
  const hideTest = () => setShowTest(false)
  
  const color = props.color ? props.color:'green';  
  const classNameTest = "alert alert-dismissible  bg-"+color
  return showTest ?(
    <div className={classNameTest} role="alert">
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={hideTest}
      >
        <span aria-hidden="true">×</span>
      </button>

        {props.file ? props.file.name : "archivo"}
        {props.message}
    </div>
  ) : '' ;
};

export default Test;
