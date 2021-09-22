import axios from "axios";
import {
  GET_TUTORS,
  TUTOR_ADDED,
  // TUTOR_ALREADY_ADDED,
  TUTOR_REMOVED,
  TUTOR_SEARCH,

  MESSAGE_DEFAULT,
  MESSAGE_SUCCESS,
  FORM_FAILED,
  GET_TUTOR,
  MINIMAL_LIST_TUTOR

} from "./types";

import { acceptErrors } from '../actions/messages';
import Config from '../utils/Config';
import {getAuthHeader } from  './headers';





// Remove tutor
export const removeTutor = (id) => (dispatch) =>{
    dispatch({
      type: TUTOR_REMOVED,
      payload: id,
    }); 
}



// LIST USERS 
export const listTutors = (url=Config.TutorApiUrl,params=null) => async (dispatch)=>{
    
  // dispatch({type:FORM_LOADING})
  dispatch({type:MESSAGE_DEFAULT})
  let config = await getAuthHeader()

  if (params){
      config={
          ...config,
          params:params
      }
  }

  try{
      await axios
      .get(url,config)
      .then((res) => {
      
      //   dispatch({type:FORM_SUCCESS})
        dispatch({
            type:GET_TUTORS,
            payload:res.data
        });
      })
      return null
  }catch(err) {
      //   dispatch({ type:FORM_NOT_LOADING})
        return acceptErrors({
            err:err,
            dispatch:dispatch,
            type:FORM_FAILED,
        })
    }
}



// LIST TUTORS  FOR DROPDOWN
export const minimalListTutors = (url=Config.TutorListApiUrl,params=null) => async (dispatch)=>{
    
  let config = await getAuthHeader()
  if (params){
      config={
          ...config,
          params:params
      }
  }
  try{
      await axios
      .get(url,config)
      .then((res) => {
        dispatch({
            type:MINIMAL_LIST_TUTOR,
            payload:res.data
        });
      })
      return null
  }catch(err) {
        return acceptErrors({
            err:err,
            dispatch:dispatch,
            type:FORM_FAILED,
        })
    }
}


// GET USERS 
export const getTutor = (id) => async (dispatch)=>{
  dispatch({type:MESSAGE_DEFAULT})
  let config = await getAuthHeader()
  const res = await axios
      .get(Config.TutorApiUrl+id,config)
      .then((res) => {
        dispatch({
            type:GET_TUTOR,
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


// GET FROM API GENERAL SERVER
export const getTutorServer = (obj) => async (dispatch)=>{
  dispatch({type:MESSAGE_DEFAULT})
  let config = await getAuthHeader()
  const res = await axios
      .post(Config.SearchTutorApiUrl,obj,config)
      .then((res) => {
       
        dispatch({
            type:TUTOR_SEARCH,
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
export const addTutor = (key) => async (dispatch, getState) =>{
  const tutorSearch = getState().tutors.tutorSearch;
  dispatch({type:MESSAGE_DEFAULT})
  const obj = {key : key}
  let config = await getAuthHeader()
  const res = await axios
      .post(Config.SearchTutorApiUrl+"add/",obj,config)
      .then((res) => {
        dispatch({
          type:MESSAGE_SUCCESS,
          payload:{detail: <p>El tutor  <strong> </strong>  fue agregado con éxito </p> }
        })
        dispatch({
          type: TUTOR_ADDED,  
          payload: res.data,
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