
import {
  TUTOR_ADDED,
  TUTOR_REMOVED,
  // TUTOR_ALREADY_ADDED,
  TUTOR_SEARCH,
  GET_TUTORS,
  GET_TUTOR,
  MINIMAL_LIST_TUTOR,
  TUTOR_SEARCH_NOT_FOUND
} from "../../actions/types";

const initialState = {
  tutorSearch: {} ,
  tutorAddedList: [],
  next: null,
  previous: null,
  count: null,
  size: 0,
  page: 1,
  results: [],
  context: {},
  isLoading: false,
  object:null,
  list:[],
};

export default function tutors(state = initialState, action) {
  switch (action.type) {
    case TUTOR_ADDED:
      return {
        ...state,
        tutorSearch: {
          ...state.tutorSearch,
          value:2
        },
        tutorAddedList: [action.payload, ...state.tutorAddedList],
      };

    case TUTOR_REMOVED:
      return {
        ...state,
        tutorAddedList: state.tutorAddedList.filter(
          (tutor) => tutor.id !== action.payload
        ),
      };

    case TUTOR_SEARCH:
      return {
        ...state,
        tutorSearch: action.payload,
      };
    
    case TUTOR_SEARCH_NOT_FOUND:
        return {
          ...state,
          tutorSearch: null,
        };

    case GET_TUTORS:
      return {
        ...state,
        ...action.payload,
      };
    
    case GET_TUTOR:
      return {
        ...state,
        tutor:action.payload,
      };

    case MINIMAL_LIST_TUTOR:
      return {
        ...state,
        list:action.payload,
      };

    default:
      return state;
  }
}
