import { DELETE_USER, GET_USERS } from "../../actions/types";
// import { GET_USERS } from "../actions/types.js";

// import { ADD_USER } from "../actions/types.js";

const initialState = {
    next:null,
    previous:null,
    count:null,
    size:0,
    page:1,
    results:[],
    context:{},
    isLoading:false,
    object:null,
    list:[],
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.payload,
      };
    
    case DELETE_USER:
        return {
            ...state,
            results: state.results.filter((user) => user.id !== action.payload),
        };
    // case ADD_LEAD:
    //     return {
    //         ...state,
    //         users: [...state.users,action.payload]
    //     };
    default:
      return state;
  }
}
