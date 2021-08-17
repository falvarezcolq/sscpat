import axios from "axios";
import {
  MESSAGE_DEFAULT,
  FORM_LOADING,
  FORM_FAILED,
  FORM_SUCCESS,

DELETE_ACADEMIC_PERIOD,
LIST_ACADEMIC_PERIOD,
ADD_ACADEMIC_PERIOD,
UPDATE_ACADEMIC_PERIOD,
GET_ACADEMIC_PERIOD,
// MESSAGE_DANGER,
MESSAGE_SUCCESS,

} from "./types";

import {acceptErrors,acceptErrorsWhenIsDelete } from '../actions/messages';
import Config from '../utils/Config';
import {getAuthHeader } from  './headers';



const ConfigUrl = Config.AcademicPeriodApiUrl;

// CREATE
export const add = (obj) => async (dispatch) =>{
    dispatch({type:FORM_LOADING})
    dispatch({type:MESSAGE_DEFAULT})

    const config = await getAuthHeader()
    const res = await axios
        .post(ConfigUrl, obj ,config)
        .then((res) => {
          const title = res.data.title
          dispatch({type:FORM_SUCCESS})
          dispatch({
              type:MESSAGE_SUCCESS,
              payload:{detail:`El periodo ${title} fue creado con éxito`}
          })
          dispatch({
            type:ADD_ACADEMIC_PERIOD,
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
            type:DELETE_ACADEMIC_PERIOD,
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
            type:LIST_ACADEMIC_PERIOD,
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
            type:GET_ACADEMIC_PERIOD,
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
            payload:{detail:`El periodo académico ${res.data.title} fue actualizado con éxito`}
           })
          dispatch({
              type:UPDATE_ACADEMIC_PERIOD,
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