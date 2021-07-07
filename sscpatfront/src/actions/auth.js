import axios from "axios";
import { LOGIN_SUCCESS, LOGOUT_SUCCESS ,LOGIN_PROGRESS,LOGIN_FAIL,MESSAGE_DEFAULT} from "./types";
import Config from "../utils/Config";
import {messageDanger } from './messages';
import {getHeader} from  './headers';



// LOGIN
export const login = (username, password) => (dispatch) => {

  dispatch({type:LOGIN_PROGRESS})
  dispatch({type:MESSAGE_DEFAULT})
  
  //simular  la conexion de internet

  const config = getHeader()
  const body = { username, password ,};
  
  axios
    .post(Config.loginUrl, body,config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(messageDanger(err.response.data));
      dispatch({
        type: LOGIN_FAIL,
      });
    });

};



export const logout = () => dispatch =>{
    dispatch({
        type: LOGOUT_SUCCESS,
    });
}