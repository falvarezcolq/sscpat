import {
  DELETE_TRACINGPROGRESS,
  LIST_TRACINGPROGRESS,
  ADD_TRACINGPROGRESS,
  UPDATE_TRACINGPROGRESS,
  GET_TRACINGPROGRESS,
  LIST_TRACINGPROGRESS_REPORT
} from "../../actions/types";

const initialState = {
  count: null,
  results: [],
  resultsReport:[],
  object: null,
};

export default function tracingprogress(state = initialState, action) {
  switch (action.type) {
    case GET_TRACINGPROGRESS:
      return {
        ...state,
        object: action.payload,
      };


    case LIST_TRACINGPROGRESS:
      return {
        ...state,
        results: action.payload,
      };
    
      case LIST_TRACINGPROGRESS_REPORT:
        return {
          ...state,
          resultsReport: action.payload,
        };

    case ADD_TRACINGPROGRESS:
      return {
        ...state,
        results: [action.payload, ...state.results],
      };

    case UPDATE_TRACINGPROGRESS:
      return {
        ...state,
        results: state.results.map((obj) => {
          return obj.id === action.payload.id ? action.payload : obj;
        }),
        object: action.payload,
      };

    case DELETE_TRACINGPROGRESS:
      return {
        ...state,
        results: state.results.filter((obj) => obj.id !== action.payload),
      };

    default:
      return state;
  }
}
