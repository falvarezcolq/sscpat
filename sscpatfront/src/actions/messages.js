import { 
  MESSAGE_INFO,
   MESSAGE_DANGER,
    GET_ERRORS,
  MESSAGE_DEFAULT,
  MESSAGE_ALERT
 } from "./types";

// INFORMATION
export const messageInfo = (msg) => {
  return {
    type: MESSAGE_INFO,
    payload: msg,
  };
};


// warning
export const messageWarning = (msg) => {
  return {
    type: MESSAGE_ALERT,
    payload: msg,
  };
};
// DANGER

export const messageDanger = (msg) => {
  return {
    type: MESSAGE_DANGER,
    payload: msg,
  };
};

// RETURN ERRORS
export const returnErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status },
  };
};

export const acceptErrors = ({err, dispatch, type}) => {
  if (err.response) {
    if (err.response.status === 400) {
      dispatch({
        type: type,
        payload: err.response.data,
      });
      return err.response.data
    }

    if (err.response.status === 401) {
        // Not authenticated
        dispatch({
            type: MESSAGE_DANGER,
            payload: err.response.data ,
        });
    }
  
    if (err.response.status === 403) {
        // User have not permissions
        dispatch({
            type: MESSAGE_DANGER,
            payload: err.response.data ,
        });
    }

    if (err.response.status === 404) {
      // User have not permissions
      window.location="/notFound"
  }
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
    // return err.response.data
  } else if (err.request) {
    // The request was made but no response was received
    dispatch({
      type: MESSAGE_DANGER,
      payload: {
        detail: `Error: Revise su conexion a internet e intente nuevamente`,
      },
    });
  } else {
    // Something happened in setting up the request that triggered an err
    dispatch({
      type: MESSAGE_DANGER,
      payload: { detail: `Ha ocurrido un error inesperado intente nuevamente... Error: ${err.message}` },
    });
  }
  return null
};



export const acceptErrorsWhenIsDelete = ({err, dispatch, type}) => {
  if (err.response) {
    if (err.response.status === 400) {
      dispatch({
        type: type,
        payload: err.response.data,
      });
      return err.response.data
    }

    if (err.response.status === 401) {
        // Not authenticated
        dispatch({
            type: MESSAGE_DANGER,
            payload: err.response.data ,
        });
    }
  
    if (err.response.status === 403) {
        // User have not permissions
        dispatch({
            type: MESSAGE_DANGER,
            payload: err.response.data ,
        });
    }

    if (err.response.status === 404) {
        // not found url with object
        dispatch({
          type: MESSAGE_DANGER,
          payload: { 
            detail: "Registro no encontrado!"
          } ,
      });
    }
    console.log(err.response.data);
    console.log(err.response.status);
    console.log(err.response.headers);
    // return err.response.data
  } else if (err.request) {
    // The request was made but no response was received
    dispatch({
      type: MESSAGE_DANGER,
      payload: {
        detail: `Error: Revise su conexion a internet e intente nuevamente`,
      },
    });
  } else {
    // Something happened in setting up the request that triggered an err
    dispatch({
      type: MESSAGE_DANGER,
      payload: { detail: `Ha ocurrido un error inesperado intente nuevamente... Error: ${err.message}` },
    });
  }
  return null
};


// DEFAULT MESSAGE
export const messageDefault = () => async (dispatch) => { 
  dispatch({type:MESSAGE_DEFAULT})
}