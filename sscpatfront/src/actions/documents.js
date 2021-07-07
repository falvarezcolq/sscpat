import axios from "axios";
import {
  MESSAGE_DEFAULT,
  // FORM_LOADING,
  FORM_FAILED,
  // FORM_SUCCESS,
  DELETE_DOCUMENT,
  LIST_DOCUMENT,
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  GET_DOCUMENT,

  // MESSAGE_DANGER,
  MESSAGE_SUCCESS,

} from "./types";

import {acceptErrors,acceptErrorsWhenIsDelete } from '../actions/messages';
import Config from '../utils/Config';
import {getAuthHeader } from  './headers';



const ConfigUrl = Config.DocumentsApiUrl;

// CREATE
export const add = (obj) => async (dispatch) =>{

    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()
    const res = await axios
        .post(ConfigUrl, obj ,config)
        .then((res) => {
          const title = res.data.title
          dispatch({
              type:MESSAGE_SUCCESS,
              payload:{detail: <p>El documento <strong>{title} </strong>  fue creado con éxito</p> }
          })

          dispatch({
            type:ADD_DOCUMENT,
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


// Remove tutor
export const remove = (id) => async(dispatch) =>{
    
    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()
    const res = await axios
        .delete(ConfigUrl+id+"/",config)
        .then((res) => {
          dispatch({
              type:MESSAGE_SUCCESS,
              payload:{ detail: `El registro fue borrado con exito` }
          })
          dispatch({
            type:DELETE_DOCUMENT,
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
export const list = () => async (dispatch)=>{
    
  dispatch({type:MESSAGE_DEFAULT})
  let config = await getAuthHeader()
  const res = await axios
      .get(ConfigUrl,config)
      .then((res) => {
        dispatch({
            type:LIST_DOCUMENT,
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
export const get = (id) => async (dispatch)=>{
    
  dispatch({type:MESSAGE_DEFAULT})
  const config = await getAuthHeader()
  const res = await axios
      .get(ConfigUrl+id+"/",config)
      .then((res) => {
        dispatch({
            type:GET_DOCUMENT,
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
export const update = (id,obj) => async (dispatch)=>{
    
    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()
    const res = await axios
        .put(ConfigUrl+id+"/",obj,config)
        .then((res) => {
          dispatch({
            type:MESSAGE_SUCCESS,
            payload:{detail:`El documento ${res.data.title} fue actualizado con éxito`}
           })
          dispatch({
              type:UPDATE_DOCUMENT,
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