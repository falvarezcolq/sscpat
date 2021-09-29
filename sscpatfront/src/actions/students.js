import axios from "axios";
import {
  MESSAGE_DEFAULT,
  FORM_FAILED,
  GET_STUDENTS,
  GET_STUDENT,
  STUDENT_ADDED,
  STUDENT_SEARCH,
  MESSAGE_SUCCESS,
  
} from "./types";

import { acceptErrors } from "./messages";
import Config from "../utils/Config";
import { getAuthHeader } from "./headers";



// LIST STUDENTS
export const listStudents =
  (url = Config.StudentApiUrl, params = null) =>
  async (dispatch) => {
    // dispatch({type:FORM_LOADING})
    dispatch({ type: MESSAGE_DEFAULT });
    let config = await getAuthHeader();

    if (params) {
      config = {
        ...config,
        params: params,
      };
    }
  
    try {
      await axios.get(url, config).then((res) => {
      
        //   dispatch({type:FORM_SUCCESS})
        dispatch({
          type: GET_STUDENTS,
          payload: res.data,
        });
      });
      return null;
    } catch (err) {
      //   dispatch({ type:FORM_NOT_LOADING})
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    }
  };

// GET STUDENT
export const getStudent = (id) => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  let config = await getAuthHeader();
  const res = await axios
    .get(Config.StudentApiUrl + id, config)
    .then((res) => {
      dispatch({
        type: GET_STUDENT,
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

// LIST STUDENTS BY TUTOR
export const listStudentsByTutors =
  (url = Config.StudentApiUrl, params = null) =>
  async (dispatch) => {
    dispatch({ type: MESSAGE_DEFAULT });
    let config = await getAuthHeader();

    if (params) {
      config = {
        ...config,
        params: params,
      };
    }
    
 
    try {
      await axios.get(url, config).then((res) => {
       
        dispatch({
          type: GET_STUDENTS,
          payload: res.data,
        });
      });
      return null;
    } catch (err) {
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    }
  };




// GET FROM API GENERAL SERVER
export const getStudentServer = (obj) => async (dispatch)=>{
  dispatch({type:MESSAGE_DEFAULT})
  let config = await getAuthHeader()
  const res = await axios
      .post(Config.SearchStudentApiUrl,obj,config)
      .then((res) => {
        dispatch({
            type:STUDENT_SEARCH,
            payload:res.data
        });
        return res.data
      }).catch((err) =>{
        return acceptErrors({
            err:err,
            dispatch:dispatch,
            type:FORM_FAILED,
        })
    })
  return res
}


// ADD  NEW USER FROM SERVER 
export const addStudent = (key) => async (dispatch, getState) =>{
  const studentSearch = getState().students.studentSearch;
  dispatch({type:MESSAGE_DEFAULT})
  const obj = {key : key}
  let config = await getAuthHeader()
  const res = await axios
      .post(Config.SearchStudentApiUrl+"add/",obj,config)
      .then((res) => {
        dispatch({
          type:MESSAGE_SUCCESS,
          payload:{detail: <p>El estudiante  <strong> </strong>  fue agregado con éxito </p> }
        })
        dispatch({
          type: STUDENT_ADDED,  
          payload: res.data.user,
        }); 
        return res.data
      }).catch((err) =>{
        return acceptErrors({
            err:err,
            dispatch:dispatch,
            type:FORM_FAILED,
        })
    })
  return res
}