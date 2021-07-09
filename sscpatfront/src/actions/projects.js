import axios from "axios";
import {
  ADD_PROJECT,
  LIST_PROJECT,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  MINIMAL_LIST_PROJECT,
  MESSAGE_DEFAULT,
  MESSAGE_SUCCESS,
  FORM_FAILED,
  // GET_ACADEMIC_PERIOD,
  GET_DOCUMENT_PROJECT,
} from "./types";

import { acceptErrors, acceptErrorsWhenIsDelete } from "../actions/messages";
import Config from "../utils/Config";
import { getAuthHeader } from "./headers";

const ConfigUrl = Config.ProjectsApiUrl;

// CREATE
export const add = (obj) => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  const config = await getAuthHeader();
  const res = await axios
    .post(ConfigUrl, obj, config)
    .then((res) => {
      dispatch({
        type: MESSAGE_SUCCESS,
        payload: { detail: <p>El proyecto fue registrado</p> },
      });

      dispatch({
        type: ADD_PROJECT,
        payload: res.data,
      });
    })
    .catch((err) => {
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });
  return res;
};

// Remove tutor
export const remove = (id) => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  const config = await getAuthHeader();
  const res = await axios
    .delete(ConfigUrl + id + "/", config)
    .then((res) => {
      dispatch({
        type: MESSAGE_SUCCESS,
        payload: { detail: `El proyecto fue borrado con exito` },
      });
      dispatch({
        type: DELETE_PROJECT,
        payload: id,
      });
    })
    .catch((err) => {
      return acceptErrorsWhenIsDelete({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });
  return res;
};

// LIST
export const list = (url=ConfigUrl,params=null) => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  let config = await getAuthHeader();
  if (params){
      config={
          ...config,  
          params:params
      }
  }
  const res = await axios
    .get(url, config)
    .then((res) => {
      dispatch({
        type: LIST_PROJECT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
      // return acceptErrors({
      //   err: err,
      //   dispatch: dispatch,
      //   type: FORM_FAILED,
      // });
    });
  return res;
};

// GET USERS
export const get = (id) => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  const config = await getAuthHeader();
  const res = await axios
    .get(ConfigUrl + id + "/", config)
    .then((res) => {
      dispatch({
        type: GET_PROJECT,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });
  return res;
};

// UPDATE
export const update = (id, obj) => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  const config = await getAuthHeader();
  const res = await axios
    .put(ConfigUrl + id + "/", obj, config)
    .then((res) => {
      dispatch({
        type: MESSAGE_SUCCESS,
        payload: { detail: `El proyecto fue actualizado con éxito` },
      });
      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data,
      });
    })
    .catch((err) => {
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });
  return res;
};

// LIST FOR DROPDOWN
export const minimalList = (params = null) => async (dispatch) => {
  let config = await getAuthHeader();
  if (params) {
    config = {
      ...config,
      params: params,
    };
  }
  const res = await axios
    .get(Config.ExternalTutorListApiUrl, config)
    .then((res) => {
      dispatch({
        type: MINIMAL_LIST_PROJECT,
        payload: res.data,
      });
    })
    .catch((err) => {
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });
    return res
};


export const patch = (id, obj) => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  const config = await getAuthHeader();
  const res = await axios
    .patch(ConfigUrl + id + "/", obj, config)
    .then((res) => {
      dispatch({
        type: MESSAGE_SUCCESS,
        payload: { detail: `El proyecto fue actualizado con éxito` },
      });
      dispatch({
        type: UPDATE_PROJECT,
        payload: res.data,
      });
    })
    .catch((err) => {
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });
  return res;
};




// GET DOCUMENTS PROJECT
export const getDocuments = (id) => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  const config = await getAuthHeader();
  const res = await axios
    .get(ConfigUrl + id + "/documents/", config)
    .then((res) => {
      dispatch({
        type: GET_DOCUMENT_PROJECT,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });
  return res;
};