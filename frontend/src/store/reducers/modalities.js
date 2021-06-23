import {
  DELETE_MODALITY,
  LIST_MODALITY,
  ADD_MODALITY,
  UPDATE_MODALITY,
  GET_MODALITY,
} from "../../actions/types";

const initialState = {
  count: null,
  results: [],
  object: null,
};

export default function modalities(state = initialState, action) {
  switch (action.type) {
    case GET_MODALITY:
      return {
        ...state,
        object: action.payload,
      };

    case LIST_MODALITY:
      return {
        ...state,
        results: action.payload,
      };
    
    case ADD_MODALITY:
        return {
            ...state,
            results: [  action.payload, ...state.results,]
            };

    case UPDATE_MODALITY:

        let obj = state.results.find((obj) => obj.id === action.payload.id);
        if (obj) {
            obj=action.payload;
        }
        return {
            ...state,
            object:action.payload
        }


    case DELETE_MODALITY:
      return {
        ...state,
        results: state.results.filter((lead) => lead.id !== action.payload),
      };
 
    default:
      return state;
  }
}
