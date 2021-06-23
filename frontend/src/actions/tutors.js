import axios from "axios";
import {
  GET_TUTORS,
  TUTOR_ADDED,
  // TUTOR_ALREADY_ADDED,
  TUTOR_REMOVED,
  TUTOR_SEARCH,
  MESSAGE_DEFAULT,
  FORM_FAILED,
  GET_TUTOR,
  MINIMAL_LIST_TUTOR
} from "./types";

import { acceptErrors } from '../actions/messages';
import Config from '../utils/Config';
import {getAuthHeader } from  './headers';



// Search
export const searchTutor = (q) => (dispatch, getState) => {
  const tutorList = getState().tutors.tutorList;

  dispatch({
    type: TUTOR_SEARCH,
    payload: tutorList.filter((tutor) => (
        tutor.first_name.includes(q) ||
        tutor.last_name.includes(q) ||
        tutor.last_name2.includes(q) ||
        tutor.ci.includes(q))),
  });
};


  export const addTutor = (id) => (dispatch, getState) =>{
      const tutorList = getState().tutors.tutorList;
      console.log(tutorList.filter((tutor) => tutor.id === id))
      dispatch({
        type: TUTOR_ADDED,
        payload: tutorList.filter((tutor) => tutor.id === id)[0],
      }); 
  }


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