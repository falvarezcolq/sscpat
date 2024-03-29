import {
  DELETE_TRACINGSTUDENT,
  LIST_TRACINGSTUDENT,
  ADD_TRACINGSTUDENT,
  UPDATE_TRACINGSTUDENT,
  GET_TRACINGSTUDENT,
  LIST_TRACINGSTUDENT_REPORT,
  TRACINGSTUDENT_ADD_LISTTRACINGPROGRESS,
  TRACINGSTUDENT_ADD_LISTTRACINGPROGRESS_LOADING,
  TRACINGSTUDENT_ADD_LISTTRACINGPROGRESS_RESULTS,
} from "../../actions/types";

const initialState = {
  count: null,
  results: [],
  resultsReport : [],
  object: null,
};

export default function tracingstudent(state = initialState, action) {
  switch (action.type) {
    case GET_TRACINGSTUDENT:
      return {
        ...state,
        object: action.payload,
      };


    case LIST_TRACINGSTUDENT:
      return {
        ...state,
        results: action.payload,
      };
    
    case LIST_TRACINGSTUDENT_REPORT:
      return {
        ...state,
        resultsReport: action.payload,
      };

    case ADD_TRACINGSTUDENT:
      return {
        ...state,
        results: [action.payload, ...state.results],
      };

    case UPDATE_TRACINGSTUDENT:
      return {
        ...state,
        results: state.results.map((obj) => {
          return obj.id === action.payload.id ? action.payload : obj;
        }),
        object: action.payload,
      };



    case TRACINGSTUDENT_ADD_LISTTRACINGPROGRESS:
      return {
        ...state,
        results: state.results.map((obj) => {
          return obj.id === action.payload.id ? 
          {
            ...obj,
            list_tracing_progress:{
              loading:false,
              results:[]
            }
          } 
          : obj;
        }),
        
      };

    case TRACINGSTUDENT_ADD_LISTTRACINGPROGRESS_LOADING:
      return {
        ...state,
        results: state.results.map((obj) => {
          return obj.id === action.payload.id ? 
          {
            ...obj,
            list_tracing_progress:{
              loading: action.payload.loading,
              results:[]
            }
          } 
          : obj;
        }),
       
      };

      case TRACINGSTUDENT_ADD_LISTTRACINGPROGRESS_RESULTS:
        return {
          ...state,
          results: state.results.map((obj) => {
            return obj.id === action.payload.id ? 
            {
              ...obj,
              list_tracing_progress:{
                loading:false,
                results:action.payload.results
              }
            } 
            : obj;
          }),
        };


    case DELETE_TRACINGSTUDENT:
      return {
        ...state,
        results: state.results.filter((obj) => obj.id !== action.payload),
      };

    default:
      return state;
  }
}
