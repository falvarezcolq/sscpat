import axios from "axios";
import {
    MESSAGE_DEFAULT,
    FORM_FAILED,
    MESSAGE_SUCCESS,
    UPDATE_DOCUMENT_LIST,
    UPDATE_DOCUMENT_INSCRIPTION_LIST,
  } from "./types";


import { acceptErrors } from '../actions/messages';
import Config from '../utils/Config';
import {getAuthHeader } from  './headers';

const ConfigUrl = Config.ProjectDocumentApiUrl;
const ConfigInitUrl = Config.ProjectInitialDocumentApiUrl;


// Add file to inscription document
export const addFile = (id,obj) => async (dispatch) =>{

    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()
    const url =ConfigUrl+id+"/uploadfile/"
    const res = await axios
        .post(url, obj ,config)
        .then((res) => {
    
          dispatch({
              type:MESSAGE_SUCCESS,
              payload:{detail: <p>El archivo <strong>{res.data.file.title} </strong>  se agrego al documento <strong>{res.data.document.title} </strong> </p> }
          })
          dispatch({
            type:UPDATE_DOCUMENT_LIST,
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


// Add file to inscription initial document
export const addFileInit = (id,obj) => async (dispatch) =>{

    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()
    const url =ConfigInitUrl+id+"/uploadfile/"
    const res = await axios
        .post(url, obj ,config)
        .then((res) => {
          
          dispatch({
              type:MESSAGE_SUCCESS,
              payload:{detail: <p>El archivo <strong>{res.data.file.title} </strong>  se agrego al documento <strong>{res.data.document.title} </strong> </p> }
          })
          dispatch({
            type:UPDATE_DOCUMENT_INSCRIPTION_LIST,
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