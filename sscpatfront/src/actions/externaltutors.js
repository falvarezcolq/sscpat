import axios from "axios";
import {
  ADD_EXTERNAL_TUTOR,
  LIST_EXTERNAL_TUTOR,
  GET_EXTERNAL_TUTOR,
  UPDATE_EXTERNAL_TUTOR,
  DELETE_EXTERNAL_TUTOR,
  MINIMAL_LIST_EXTERNAL_TUTOR,
  MESSAGE_DEFAULT,
  MESSAGE_SUCCESS,
  FORM_FAILED,
} from "./types";

import { acceptErrors, acceptErrorsWhenIsDelete } from "../actions/messages";
import Config from "../utils/Config";
import { getAuthHeader } from "./headers";

const ConfigUrl = Config.ExternalTutorApiUrl;

// CREATE
export const add = (obj) => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  const config = await getAuthHeader();
  const res = await axios
    .post(ConfigUrl, obj, config)
    .then((res) => {
      dispatch({
        type: MESSAGE_SUCCESS,
        payload: { detail: <p>El tutor externo fue registrado</p> },
      });

      dispatch({
        type: ADD_EXTERNAL_TUTOR,
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
        payload: { detail: `El registro fue borrado con exito` },
      });
      dispatch({
        type: DELETE_EXTERNAL_TUTOR,
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
export const list = () => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  let config = await getAuthHeader();
  const res = await axios
    .get(ConfigUrl, config)
    .then((res) => {
      dispatch({
        type: LIST_EXTERNAL_TUTOR,
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

// GET USERS
export const get = (id) => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  const config = await getAuthHeader();
  const res = await axios
    .get(ConfigUrl + id + "/", config)
    .then((res) => {
      dispatch({
        type: GET_EXTERNAL_TUTOR,
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
        payload: { detail: `El tutor externo fue actualizado con éxito` },
      });
      dispatch({
        type: UPDATE_EXTERNAL_TUTOR,
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
        type: MINIMAL_LIST_EXTERNAL_TUTOR,
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
