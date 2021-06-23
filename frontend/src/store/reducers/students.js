import {
  GET_STUDENT,
  GET_STUDENTS,
} from "../../actions/types";

const initialState = {
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

export default function students(state = initialState, action) {
  switch (action.type) {
    // case STUDENT_ADDED:
    //   return {
    //     ...state,
    //     tutorAddedList: [action.payload, ...state.tutorAddedList],
    //   };

    // case STUDENT_REMOVED:
    //   return {
    //     ...state,
    //     tutorAddedList: state.tutorAddedList.filter(
    //       (tutor) => tutor.id !== action.payload
    //     ),
    //   };

    // case STUDENT_SEARCH:
    //   return {
    //     ...state,
    //     tutorSearch: action.payload,
    //   };

    case GET_STUDENTS:
      return {
        ...state,
        ...action.payload,
      };
    
    case GET_STUDENT:
      return {
        ...state,
        object:action.payload,
      };

    default:
      return state;
  }
}
