import axios from "axios";
import {
  MESSAGE_DEFAULT,
  // FORM_LOADING,
  FORM_FAILED,
  // FORM_SUCCESS,

  DELETE_INSTITUTION,
  LIST_INSTITUTION,
  ADD_INSTITUTION,
  UPDATE_INSTITUTION,
  GET_INSTITUTION,

// MESSAGE_DANGER,
MESSAGE_SUCCESS,

} from "./types";

import {acceptErrors,acceptErrorsWhenIsDelete } from '../actions/messages';
import Config from '../utils/Config';
import {getAuthHeader } from  './headers';



const ConfigUrl = Config.InstitutionsApiUrl;

// CREATE
export const add = (obj) => async (dispatch) =>{

    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()
    const res = await axios
        .post(ConfigUrl, obj ,config)
        .then((res) => {
         
          dispatch({
              type:MESSAGE_SUCCESS,
              payload:{detail: <p>La institución <strong>{res.data.name}</strong> fue registrado con éxito</p> }
          })

          dispatch({
            type:ADD_INSTITUTION,
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
            type:DELETE_INSTITUTION,
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
            type:LIST_INSTITUTION,
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
            type:GET_INSTITUTION,
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
            payload:{detail:`Fue actualizado con éxito`}
           })
          dispatch({
              type:UPDATE_INSTITUTION,
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