
import {
  GET_INSCRIPTIONS_REPORT,
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

export default function report_inscriptions(state = initialState, action) {
  switch (action.type) {
  
    case GET_INSCRIPTIONS_REPORT:
      return {
        ...state,
        ...action.payload,
      };
  
    default:
      return state;
  }
}
