import React from "react";
import { getTimeSendDocument } from "../../actions/helper";

const DocSelected = (props) => {

    const {
        doc,
        remove,
    } = props
  return (
    <h4>
    <span
      className="label bg-blue"
      style={{ margin: "0px 5px" }}
    >
      {doc.title}
      <button
        type="button"
        onClick={remove.bind(this, doc.id)}
        className="btn-link"
        title="Borrar"
      >
        x
      </button>
    </span>
    <span style={{ fontSize: "1.2rem" }}>
      Entrega: {getTimeSendDocument(doc.time_send)}
    </span>
  </h4>
  );
};

export default DocSelected;
