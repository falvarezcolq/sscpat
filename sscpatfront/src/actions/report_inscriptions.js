import axios from "axios";
import {
  
  MESSAGE_DEFAULT,
  FORM_FAILED,
  GET_INSCRIPTIONS_REPORT,
} from "./types";

import { acceptErrors } from '../actions/messages';
import Config from '../utils/Config';
import {getAuthHeader } from  './headers';



// LIST PROJECTS
export const report = (url=Config.ReportInscriptionApiUrl,params=null) => async (dispatch)=>{
    
  dispatch({type:MESSAGE_DEFAULT})
  let config = await getAuthHeader()
  if (params){
      config={
          ...config,
          params:params
      }
  }
  try{
      await axios
      .get(url,config)
      .then((res) => {
        dispatch({
            type:GET_INSCRIPTIONS_REPORT,
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
