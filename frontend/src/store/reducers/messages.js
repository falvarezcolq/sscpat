// import { messageDanger } from "../../actions/messages";
import {
  MESSAGE_INFO,
  MESSAGE_SUCCESS,
  MESSAGE_ALERT,
  MESSAGE_DANGER,
  MESSAGE_DEFAULT,
} from "../../actions/types";

const initialState = {
  type: "",
  color: "",
  payload: null,
  messages:[]
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_INFO:
      return {
        ...state,
        type: "info",
        color: "blue",
        payload: action.payload,
      };
    case MESSAGE_SUCCESS:
      return {
        ...state,
        type: "success",
        color: "green",
        payload: action.payload,
      };
    case MESSAGE_ALERT:
      return {
        ...state,
        type: "alert",
        color: "orange",
        payload: action.payload,
      };
    case MESSAGE_DANGER:
      return {
        ...state,
        type: "info",
        color: "red",
        payload: action.payload,
      };

    case MESSAGE_DEFAULT:
      return {
        ...state,
        type: "",
        color: "",
        payload: null,
      };

    default:
      return state;
  }
}
