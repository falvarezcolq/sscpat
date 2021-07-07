import {
 
  LIST_NOTIFICATIONS,
  LIST_ADD_NOTIFICATIONS,
  NUMBER_NOTIFICATIONS,
  SET_ZERO,
} from "../../actions/types";

const initialState = {
  next: null,
  previous: null,
  count: null,
  size: 0,
  page: 1,
  results: [],
  context: {},
  object: null,
  list: [],
  number:0,
};

export default function notifications(state = initialState, action) {
  switch (action.type) {

    case LIST_NOTIFICATIONS:
      return {
        ...state,
        ...action.payload,
      };
    case LIST_ADD_NOTIFICATIONS:
      return {
        ...state,
        ...action.payload,
        results:state.results.concat(action.payload.results),
      };

    case NUMBER_NOTIFICATIONS:
      return {
        ...state,
        number :  action.payload.data,
      }
    case SET_ZERO:
      return {
        ...state,
        number :  0,
      }

    default:
      return state;
  }
}
