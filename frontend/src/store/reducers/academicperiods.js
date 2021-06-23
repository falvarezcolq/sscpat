import {
  DELETE_ACADEMIC_PERIOD,
  LIST_ACADEMIC_PERIOD,
  ADD_ACADEMIC_PERIOD,
  UPDATE_ACADEMIC_PERIOD,
  GET_ACADEMIC_PERIOD,
} from "../../actions/types";

const initialState = {
  count: null,
  results: [],
  object: null,
  isLoading: false,
};

export default function academicperiods(state = initialState, action) {
  switch (action.type) {
    case GET_ACADEMIC_PERIOD:
      return {
        ...state,
        object: action.payload,
      };

    case LIST_ACADEMIC_PERIOD:
      return {
        ...state,
        results: action.payload,
      };
    
    case ADD_ACADEMIC_PERIOD:
        return {
            ...state,
            results: [  action.payload, ...state.results,]
            };

    case UPDATE_ACADEMIC_PERIOD:

        let obj = state.results.find((obj) => obj.id === action.payload.id);
        if (obj) {
            obj=action.payload;
        }
        return {
            ...state,
           
            object:action.payload
        }


    case DELETE_ACADEMIC_PERIOD:
      return {
        ...state,
        results: state.results.filter((lead) => lead.id !== action.payload),
      };
 
    default:
      return state;
  }
}
