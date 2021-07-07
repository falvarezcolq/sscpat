import React,{useState} from "react";

const Modal = (props) => {
  const {open} = props
  
  return (
    <>
      <div
        key="modal"
        className={open ? "modal fade in":"modal fade"}
        style={{ display:  open ? "block" : "none" }}
      >
        <div className="modal-dialog" >
          <div className="modal-content">
              {props.children}
          </div>
        </div>
      </div>
      { open ? <div className="modal-backdrop fade in"></div>:"" }
      
    </>

  );
};

export default Modal;
