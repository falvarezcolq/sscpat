import axios from "axios";
import {
  MESSAGE_DEFAULT,
  FORM_FAILED,
  DELETE_MODALITY,
  LIST_MODALITY,
  ADD_MODALITY,
  UPDATE_MODALITY,
  GET_MODALITY,
  MESSAGE_SUCCESS,
} from "./types";

import {acceptErrors,acceptErrorsWhenIsDelete } from '../actions/messages';
import Config from '../utils/Config';
import {getAuthHeader } from  './headers';



const ConfigUrl = Config.ModalitiesApiUrl;

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
              payload:{detail: <p>La modalidad de graduación <strong> {title} </strong>  fue creado con éxito</p> }
          })

          dispatch({
            type:ADD_MODALITY,
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
            type:DELETE_MODALITY,
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
            type:LIST_MODALITY,
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
            type:GET_MODALITY,
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
            payload:{detail:<p>La modalidad de graduación <strong>{res.data.title} </strong>  fue actualizado con éxito</p>}
           })
          dispatch({
              type:UPDATE_MODALITY,
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