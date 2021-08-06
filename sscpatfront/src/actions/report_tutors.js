import axios from "axios";
import {
  
  MESSAGE_DEFAULT,
  FORM_FAILED,

  GET_TUTORS_REPORT,
} from "./types";

import { acceptErrors } from '../actions/messages';
import Config from '../utils/Config';
import {getAuthHeader } from  './headers';



// LIST USERS 
export const report = (url=Config.ReportTutorApiUrl,params=null) => async (dispatch)=>{
    
  dispatch({type:MESSAGE_DEFAULT})
  let config = await getAuthHeader()

  if (params){
      config={
          ...config,
          params:params
      }
  }
  console.log(url);

  try{
      await axios
      .get(url,config)
      .then((res) => {
        dispatch({
            type:GET_TUTORS_REPORT,
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
