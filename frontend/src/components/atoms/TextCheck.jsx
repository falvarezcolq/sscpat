import React from 'react'


const iconDone = (bool) => {
    return bool ? (
      <i className="material-icons col-green" title="completado">
        done
      </i>
    ) : (
      <i className="material-icons col-orange" title="No realizado">
        error_outline
      </i>
    );
};

const TextCheck = (props) => {
    const { children, check } = props
    return (
        <>
        {iconDone(check)}
        <span
          className="icon-name"
          style={{ position: "relative", top: "-6px" }}
        >
          {children}
        </span>
        <br />
      </>
    )
}

export default TextCheck
