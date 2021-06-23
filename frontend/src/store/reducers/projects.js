import {
  ADD_PROJECT,
  LIST_PROJECT,
  GET_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  MINIMAL_LIST_PROJECT,
  GET_DOCUMENT_PROJECT,
  UPDATE_DOCUMENT_LIST,
  UPDATE_DOCUMENT_INSCRIPTION_LIST,
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
  documentList:[],
  initialDocumentList:[],
};

export default function externaltutors(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT:
      return {
        ...state,
        results: [action.payload, ...state.results],
        list: [action.payload, ...state.list],
        object: action.payload
      };

    case LIST_PROJECT:
      return {
        ...state,
        ...action.payload,
      };

    case GET_PROJECT:
      return {
        ...state,
        object: action.payload,
      };

    case UPDATE_PROJECT:
      return {
        ...state,
        results: state.results.map((obj) => {
          return obj.id === action.payload.id ? action.payload : obj;
        }),
        object: action.payload,
      };

    case DELETE_PROJECT:
      return {
        ...state,
        results: state.results.filter((obj) => obj.id !== action.payload),
        list: state.list.filter((obj) => obj.id !== action.payload),
      };  

    case MINIMAL_LIST_PROJECT:
      return {
        ...state,
        list: action.payload,
      };
    
    case GET_DOCUMENT_PROJECT:
      return {
        ...state,
        documentList: action.payload.documents,
        initialDocumentList: action.payload.document_inscription,
      };
    
    case UPDATE_DOCUMENT_LIST:
      return {
        ...state,
        documentList : state.documentList.map((obj) => {
          return obj.id === action.payload.id ? action.payload : obj;
        }),
      };
    
    case UPDATE_DOCUMENT_INSCRIPTION_LIST:
      return {
        ...state,
        initialDocumentList : state.initialDocumentList.map((obj) => {
          return obj.id === action.payload.id ? action.payload : obj;
        }),
      };
    default:
      return state;
  }
}
