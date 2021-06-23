import {
  DELETE_INSTITUTION,
  LIST_INSTITUTION,
  ADD_INSTITUTION,
  UPDATE_INSTITUTION,
  GET_INSTITUTION,
} from "../../actions/types";

const initialState = {
  count: null,
  results: [],
  object: null,
};

export default function documents(state = initialState, action) {
  switch (action.type) {
    case GET_INSTITUTION:
      return {
        ...state,
        object: action.payload,
      };

    case LIST_INSTITUTION:
      return {
        ...state,
        results: action.payload,
      };
    
    case ADD_INSTITUTION:
        return {
            ...state,
            results: [  action.payload, ...state.results,]
            };

    case UPDATE_INSTITUTION:

        let obj = state.results.find((obj) => obj.id === action.payload.id);
        if (obj) {
            obj=action.payload;
        }
        return {
            ...state,
            object:action.payload
        }


    case DELETE_INSTITUTION:
      return {
        ...state,
        results: state.results.filter((lead) => lead.id !== action.payload),
      };
 
    default:
      return state;
  }
}
