import React from "react";
import { getSizeByte } from "../../actions/helper";

const SelectedName = (props) => {
  const { name, remove, file, id } = props;
  return (
    <h4 key={name}>
      {file && (
        <span className="selected-name" style={{ color: "#a4a" }}>
          {getSizeByte(file.size)}{" "}
        </span>
      )}
      <span className="selected-name">
        {name}
        <button
          type="button"
          onClick={() => remove(id ? id : name)}
          className="btn-link"
          title="Borrar"
        >
          <span style={{ fontSize: "18x", color: "blue", fontWeight: "bold" }}>
            {" "}
            x
          </span>
        </button>
      </span>
    </h4>
  );
};

export default SelectedName;
