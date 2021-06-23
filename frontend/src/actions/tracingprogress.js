import axios from "axios";
import {
  MESSAGE_DEFAULT,
  FORM_FAILED,
  DELETE_TRACINGPROGRESS,
  LIST_TRACINGPROGRESS,
  ADD_TRACINGPROGRESS,
  UPDATE_TRACINGPROGRESS,
  GET_TRACINGPROGRESS,
  MESSAGE_SUCCESS,
} from "./types";

import {acceptErrors,acceptErrorsWhenIsDelete } from './messages';
import Config from '../utils/Config';
import {getAuthHeader } from  './headers';



const ConfigUrl = Config.TracingStudentApiUrl;


// CREATE
export const add = (tracingstudent_id,obj) => async (dispatch) =>{
    const url = ConfigUrl+tracingstudent_id+"/tracingprogress/";
    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()
    const res = await axios
        .post(url, obj , config)
        .then((res) => {
          dispatch({
              type:MESSAGE_SUCCESS,
              payload:{detail: <p>EL seguimiento fue registrado correctamente</p> }
          })

          dispatch({
            type:ADD_TRACINGPROGRESS,
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
export const remove = (tracingstudent_id,id) => async(dispatch) =>{
    const url = ConfigUrl+tracingstudent_id+"/tracingprogress/";
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
            type:DELETE_TRACINGPROGRESS,
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
export const list = (tracingstudent_id) => async (dispatch)=>{
  const url = ConfigUrl+tracingstudent_id+"/tracingprogress/";
  dispatch({type:MESSAGE_DEFAULT})
  let config = await getAuthHeader()
  const res = await axios
      .get(url,config)
      .then((res) => {
        dispatch({
            type:LIST_TRACINGPROGRESS,
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
export const get = (tracingstudent_id,id) => async (dispatch)=>{
  const url = ConfigUrl+tracingstudent_id+"/tracingprogress/";
  dispatch({type:MESSAGE_DEFAULT})
  const config = await getAuthHeader()
  const res = await axios
      .get(url+id+"/",config)
      .then((res) => {
        dispatch({
            type:GET_TRACINGPROGRESS,
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
  const url = Config.ProgressApiUrl+id+"/";
  dispatch({type:MESSAGE_DEFAULT})
  const config = await getAuthHeader()
  const res = await axios
      .get(url,config)
      .then((res) => {
        dispatch({
            type:GET_TRACINGPROGRESS,
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
export const update = (tracingstudent_id,id,obj) => async (dispatch)=>{

    const url = ConfigUrl+tracingstudent_id+"/tracingprogress/";
    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()

    const res = await axios
        .put(url+id+"/",obj,config)
        .then((res) => {
          dispatch({
            type:MESSAGE_SUCCESS,
            payload:{detail:<p>La seguimiento fue actualizado correctamente</p>}
           })
          dispatch({
              type:UPDATE_TRACINGPROGRESS,
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