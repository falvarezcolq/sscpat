import axios from 'axios';
import Config from '../utils/Config';
import { 
    FORM_FAILED,
    FORM_LOADING,
    FORM_NOT_LOADING,
    FORM_SUCCESS,
    GET_USERS,
    // MESSAGE_DANGER,
    MESSAGE_DEFAULT,
    MESSAGE_SUCCESS } from './types';
import { acceptErrors } from './messages';

import {getAuthHeader } from  './headers';



export const addUser = (user) => async (dispatch)=>{
    
    dispatch({type:FORM_LOADING})
    dispatch({type:MESSAGE_DEFAULT})

    const config = await getAuthHeader()
    try{
        await axios
        .post(Config.userSignUp, user,config)
        .then((res) => {
          const username = res.data.username
          dispatch({type:FORM_SUCCESS})
          dispatch({
              type:MESSAGE_SUCCESS,
              payload:{detail:`El usuario ${username} fue creado con éxito`}
          });
        })
        return null
    }catch(err) {
          
          dispatch({ type:FORM_NOT_LOADING})
          return acceptErrors({
              err:err,
              dispatch:dispatch,
              type:FORM_FAILED,
          })
      }
  
}

// LIST USERS 
export const listUsers = (url=Config.UserApiUrl,params=null) => async (dispatch)=>{
    
    // dispatch({type:FORM_LOADING})
    dispatch({type:MESSAGE_DEFAULT})
    
    let config = await getAuthHeader()

    if (params){
        config={
            ...config,
            params:params
        }
    }
    
    // const body = user;
    console.log(url)
    try{
        await axios
        .get(url,config)
        .then((res) => {
        
        //   dispatch({type:FORM_SUCCESS})
          dispatch({
              type:GET_USERS,
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



// GET USER 
export const getUser = (id) => async (dispatch)=>{
    
    dispatch({type:MESSAGE_DEFAULT})
    let config = await getAuthHeader()

    try{
        const res = await axios
        .get(Config.UserApiUrl+id+"/",config)
        return res.data
    
    }catch(err) {
          return acceptErrors({
              err:err,
              dispatch:dispatch,
              type:FORM_FAILED,
          })
      }
}


// UPDATE USER 
export const updateUser = (id,user) => async (dispatch)=>{

    dispatch({type:FORM_LOADING})    
    dispatch({type:MESSAGE_DEFAULT})

    let config = await getAuthHeader()
    const {res , error } = await axios
        .put(Config.UserApiUrl+id+"/",user,config)
        .then((res) => {
            const username = res.data.username
            dispatch({type:FORM_SUCCESS})
            dispatch({
                type:MESSAGE_SUCCESS,
                payload:{detail:`La informacion del usuario ${username} fue actualizado correctamente`}
            });
            return {res: res.data , error:null}
          }).catch((err) =>{
            dispatch({ type:FORM_NOT_LOADING})
            return {res: null, error : acceptErrors({
                err:err,
                dispatch:dispatch,
                type:FORM_FAILED,
            })}
        })
    return {res,error}
}



// UPDATE USER 
export const updatePassword = (credentials) => async (dispatch)=>{  
    dispatch({type:MESSAGE_DEFAULT})
    let config = await getAuthHeader()
    const res = await axios
        .post(Config.UpdatePasswordApiUrl,credentials,config)
        .then((res) => {
            dispatch({
                type:MESSAGE_SUCCESS,
                payload:{detail:res.data.message}
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

// UPDATE USER 
export const updateUserPassword = (credentials) => async (dispatch)=>{  
    dispatch({type:MESSAGE_DEFAULT})
    let config = await getAuthHeader()
    const res = await axios
        .post(Config.UpdateUserPasswordApiUrl,credentials,config)
        .then((res) => {
            dispatch({
                type:MESSAGE_SUCCESS,
                payload:{detail:res.data.message}
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