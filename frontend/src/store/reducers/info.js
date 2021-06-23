import {
    GET_INFO
} from  '../../actions/types';



const initialState = {
    inscriptions: 0,
    tutor: 0,
    tracing_student: 0,
    reviews_by_tutors: 0,
  };

export default function info(state = initialState, action) {
    switch (action.type) {
      case GET_INFO:
        return {
            ...state,
            ...action.payload
        };
      default:
          return state
    }
}
  