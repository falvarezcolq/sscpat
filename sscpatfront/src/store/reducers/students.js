import {
  GET_STUDENT,
  GET_STUDENTS,
  STUDENT_SEARCH,
  STUDENT_ADDED,
} from "../../actions/types";

const initialState = {
  studentSearch: {} ,
  studentAddedList: [],
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
    case STUDENT_ADDED:
      return {
        ...state,
        studentSearch: {
          ...state.studentSearch,
          value:2
        },
        studentAddedList: [action.payload, ...state.studentAddedList],
      };

    case STUDENT_SEARCH:
        return {
          ...state,
          studentSearch: action.payload,
        };
        
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
