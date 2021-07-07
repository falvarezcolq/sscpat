import {
  ADD_EXTERNAL_TUTOR,
  LIST_EXTERNAL_TUTOR,
  GET_EXTERNAL_TUTOR,
  UPDATE_EXTERNAL_TUTOR,
  DELETE_EXTERNAL_TUTOR,
  MINIMAL_LIST_EXTERNAL_TUTOR
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
};

export default function externaltutors(state = initialState, action) {
  switch (action.type) {
    case ADD_EXTERNAL_TUTOR:
      return {
        ...state,
        results: [action.payload, ...state.results],
        list: [action.payload, ...state.list],
      };

    case LIST_EXTERNAL_TUTOR:
      return {
        ...state,
        ...action.payload,
      };

    case GET_EXTERNAL_TUTOR:
      return {
        ...state,
        object: action.payload,
      };

    case UPDATE_EXTERNAL_TUTOR:
      return {
        ...state,
        object: action.payload,
      };

    case DELETE_EXTERNAL_TUTOR:
      return {
        ...state,
        results: state.results.filter((obj) => obj.id !== action.payload),
        list: state.list.filter((obj) => obj.id !== action.payload),
      };

    case MINIMAL_LIST_EXTERNAL_TUTOR:
      return {
        ...state,
        list: action.payload,
      };

    default:
      return state;
  }
}
