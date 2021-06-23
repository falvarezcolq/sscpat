import {
    FORM_LOADING,
    FORM_NOT_LOADING,
    FORM_FAILED,
    FORM_SUCCESS,
  } from "../../actions/types";
  
  const initialState = {
    isLoading:false,
    errors:{},
  };
  
  export default function form(state = initialState, action) {
    switch (action.type) {
      case FORM_LOADING:
        return {
          isLoading:true,
          errors:{},
        };
  
      case FORM_NOT_LOADING:
        return {
            isLoading: false,
            errors: {},
        };
      case FORM_FAILED:
        return {
            isLoading: false,
            errors: action.payload,
        };
  
      case FORM_SUCCESS:
        return{
            isLoading:false,
            errors:{},
         };
     
      default:
        return state;
    }
  }
  