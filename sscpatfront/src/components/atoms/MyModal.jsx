import React, { useState } from "react";

const data_confirm = {
  title: "Confirmar",
  message: "",
  cancel: null,
  confirm: null,
  accept: null,
};

const MyModal = (props) => {
  const { data } = props;
  const [modal,setModal] = useState(data)
  const [accepting,setAccepting] = useState(false)
  const close = () => setOpen(false);
  
  const ok = () =>{
    setAccepting(true)
    btnSuccess();
    setAccepting(false)
    close()
  }

  if (type == "confirm") {
    return (
      <>
        <div
          key="modal"
          className={modal.open ? "modal fade in" : "modal fade"}
          style={{ display: modal.open ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="defaultModalLabel">
                  {modal.title}
                </h4>
                <button className="btn btn-default align-right" onClick={close}>X</button>
              </div>

              <div className="modal-body">{message}</div>
              <div className="modal-footer">
                
                  <button
                    type="button"
                    className="btn btn-link waves-effect pull-left"
                    onClick={close}
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    className="btn btn-success waves-effect"
                    onClick={ok}
                  >
                    {accepting ? "Confirmando..." : "Confirmar"}
                  </button>
              
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  else
  {
    return ""
  }
};

export default MyModal;
