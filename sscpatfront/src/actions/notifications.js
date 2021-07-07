import axios from "axios";
import {
  LIST_NOTIFICATIONS,
  LIST_ADD_NOTIFICATIONS,
  FORM_FAILED,
  MESSAGE_DEFAULT,
  NUMBER_NOTIFICATIONS,
  SET_ZERO,
    
} from "./types";

import { acceptErrors, acceptErrorsWhenIsDelete } from "../actions/messages";
import Config from "../utils/Config";
import { getAuthHeader } from "./headers";

const ConfigUrl = Config.NotificationApiUrl;

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
        type: LIST_NOTIFICATIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });
  return res;
};




// Add more items to initial array

export const listAdd = (url=ConfigUrl,params=null) => async (dispatch) => {
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
        type: LIST_ADD_NOTIFICATIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });
  return res;
};



export const getNumberNotifications = () => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  let config = await getAuthHeader();
  const url = ConfigUrl+"was_not_read/"
  const res = await axios
    .get(url, config)
    .then((res) => {
      dispatch({
        type: NUMBER_NOTIFICATIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });
  return res;
};

// notifications were read
export const notificationsWereRead = () => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  let config = await getAuthHeader();
  console.log(config)
  const url = ConfigUrl+"was_read/"
  const res = await axios
    .post(url, null,config)
    .then((res) => {
      dispatch({
        type: SET_ZERO,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err)
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });
  return res;
};