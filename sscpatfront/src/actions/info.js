import axios from "axios";
import { GET_INFO ,MESSAGE_DEFAULT,FORM_FAILED} from "./types";
import {acceptErrors,
    // acceptErrorsWhenIsDeletes
 } from '../actions/messages';

import {getAuthHeader } from  './headers';

import Config from "../utils/Config";


// GET info
export const getInfo = (id) => async (dispatch)=>{
    
    dispatch({type:MESSAGE_DEFAULT})
    const config = await getAuthHeader()
    const res = await axios
        .get(Config.InfoApiUrl,config)
        .then((res) => {
          dispatch({
              type:GET_INFO,
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