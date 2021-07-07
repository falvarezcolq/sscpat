import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { messageDefault } from "../../actions/messages";

const AlertMessage = (props) => {
  const { messages, messageDefault } = props;

  const color = messages.color ? messages.color:'green';  
  const classNameAlert = "alert alert-dismissible  bg-"+color
  
  if (!messages.payload ){
      return ""
  }

  return (
    <>
      <div className={classNameAlert} role="alert">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={messageDefault}
        >
          <span aria-hidden="true">×</span>
        </button>
        {messages.payload.detail}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {
  messageDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertMessage);
