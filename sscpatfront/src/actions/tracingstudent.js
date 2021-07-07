import axios from "axios";
import {
  MESSAGE_DEFAULT,
  FORM_FAILED,
  DELETE_TRACINGSTUDENT,
  LIST_TRACINGSTUDENT,
  ADD_TRACINGSTUDENT,
  UPDATE_TRACINGSTUDENT,
  GET_TRACINGSTUDENT,
  MESSAGE_SUCCESS,
  LIST_TRACINGSTUDENT_REPORT,
} from "./types";

import {acceptErrors,acceptErrorsWhenIsDelete } from '../actions/messages';
import Config from '../utils/Config';
import {getAuthHeader } from  './headers';



const ConfigUrl = Config.ProjectsApiUrl;


// CREATE
export const add = (project_id,obj) => async (dispatch) =>{
    const url = ConfigUrl+project_id+"/tracing/";
    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()
    const res = await axios
        .post(url, obj , config)
        .then((res) => {
          dispatch({
              type:MESSAGE_SUCCESS,
              payload:{detail: <p>EL avance de proyecto fue registrado correctamente</p> }
          })

          dispatch({
            type:ADD_TRACINGSTUDENT,
            payload:res.data
          })
        }).catch((err)=>{
          return acceptErrors({
              err:err,
              dispatch:dispatch,
              type:FORM_FAILED,
          })
        })
    return res
}


// REMOVE
export const remove = (project_id,id) => async(dispatch) =>{
    const url = ConfigUrl+project_id+"/tracing/";
    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()
    const res = await axios
        .delete(url+id+"/",config)
        .then((res) => {
          dispatch({
              type:MESSAGE_SUCCESS,
              payload:{ detail: `El registro fue borrado con exito` }
          })
          dispatch({
            type:DELETE_TRACINGSTUDENT,
            payload:id
          })
        }).catch((err)=>{
            return acceptErrorsWhenIsDelete({
              err:err,
              dispatch:dispatch,
              type:FORM_FAILED,
            })
        })
    return res
    }



// LIST  
export const list = (project_id) => async (dispatch)=>{
  const url = ConfigUrl+project_id+"/tracing/";
  dispatch({type:MESSAGE_DEFAULT})
  let config = await getAuthHeader()
  const res = await axios
      .get(url,config)
      .then((res) => {
        dispatch({
            type:LIST_TRACINGSTUDENT,
            payload:res.data
        });
      }).catch((err)=>{
        return acceptErrors({
            err:err,
            dispatch:dispatch,
            type:FORM_FAILED,
        })
    })
    return res
}

// LIST  
export const listReport = (project_id) => async (dispatch)=>{
  const url = ConfigUrl+project_id+"/report/";
  dispatch({type:MESSAGE_DEFAULT})
  let config = await getAuthHeader()
  const res = await axios
      .get(url,config)
      .then((res) => {
        dispatch({
            type:LIST_TRACINGSTUDENT_REPORT,
            payload:res.data
        });
      }).catch((err)=>{
        return acceptErrors({
            err:err,
            dispatch:dispatch,
            type:FORM_FAILED,
        })
    })
    return res
}



// GET USERS 
export const get = (project_id,id) => async (dispatch)=>{
  const url = ConfigUrl+project_id+"/tracing/";
  dispatch({type:MESSAGE_DEFAULT})
  const config = await getAuthHeader()
  const res = await axios
      .get(url+id+"/",config)
      .then((res) => {
        dispatch({
            type:GET_TRACINGSTUDENT,
            payload:res.data
        });
        return res.data
      }).catch((err)=>{
        return acceptErrors({
            err:err,
            dispatch:dispatch,
            type:FORM_FAILED,
        })
    })
    return res
}

//  get complete with project
export const getDetails = (id) => async (dispatch)=>{
  const url = Config.TracingStudentApiUrl+id+"/";
  dispatch({type:MESSAGE_DEFAULT})
  const config = await getAuthHeader()
  const res = await axios
      .get(url,config)
      .then((res) => {
        dispatch({
            type:GET_TRACINGSTUDENT,
            payload:res.data
        });
        return res.data
      }).catch((err)=>{
        return acceptErrors({
            err:err,
            dispatch:dispatch,
            type:FORM_FAILED,
        })
    })
    return res
}


// UPDATE 
export const update = (project_id,id,obj) => async (dispatch)=>{

    const url = ConfigUrl+project_id+"/tracing/";
    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()

    const res = await axios
        .put(url+id+"/",obj,config)
        .then((res) => {
          dispatch({
            type:MESSAGE_SUCCESS,
            payload:{detail:<p>La avance del proyecto fue actualizado correctamente</p>}
           })
          dispatch({
              type:UPDATE_TRACINGSTUDENT,
              payload:res.data
          });
        }).catch((err)=>{
          return acceptErrors({
              err:err,
              dispatch:dispatch,
              type:FORM_FAILED,
          })
      })
      return res
  }