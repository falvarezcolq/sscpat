import {
  DELETE_DOCUMENT,
  LIST_DOCUMENT,
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  GET_DOCUMENT,
} from "../../actions/types";

const initialState = {
  count: null,
  results: [],
  object: null,
};

export default function documents(state = initialState, action) {
  switch (action.type) {
    case GET_DOCUMENT:
      return {
        ...state,
        object: action.payload,
      };

    case LIST_DOCUMENT:
      return {
        ...state,
        results: action.payload,
      };
    
    case ADD_DOCUMENT:
        return {
            ...state,
            results: [  action.payload, ...state.results,]
            };

    case UPDATE_DOCUMENT:

        let obj = state.results.find((obj) => obj.id === action.payload.id);
        if (obj) {
            obj=action.payload;
        }
        return {
            ...state,
            object:action.payload
        }


    case DELETE_DOCUMENT:
      return {
        ...state,
        results: state.results.filter((lead) => lead.id !== action.payload),
      };
 
    default:
      return state;
  }
}
