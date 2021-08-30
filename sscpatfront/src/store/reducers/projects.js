import { object } from "prop-types";
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
  DATE_MONTHS,
  ADD_USER_TO_AUTHOR_LIST,
  REMOVE_USER_TO_AUTHOR_LIST,
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
  authors:[],
  list: [],
  documentList:[],
  initialDocumentList:[],
  date_months:[]
};

export default function projects(state = initialState, action) {
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
        authors:action.payload.authors,
      };

    case UPDATE_PROJECT:
      return {
        ...state,
        results: state.results.map((obj) => {
          return obj.id === action.payload.id ? action.payload : obj;
        }),
        object: action.payload,
        authors:action.payload.authors,
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

    case DATE_MONTHS:
      return {
        ...state,
        date_months:[...action.payload.months],
      };
    
    case ADD_USER_TO_AUTHOR_LIST:
      return {
        ...state,
        // object:{
        //   ...state.object,
        //   authors:[...state.object.authors.filter((obj) => obj.id !== action.payload.id),action.payload]
        // },

        authors:[...state.authors.filter((obj) => obj.id !== action.payload.id),action.payload]
      };
    
    case REMOVE_USER_TO_AUTHOR_LIST:
      return {
        ...state,
        // object:{
        //   ...state.object,
        //   authors:[...state.object.authors.filter((obj) => obj.id !== action.payload)]
        // },
        authors:[...state.authors.filter((obj) => obj.id !== action.payload)]
      };
    default:
      return state;
  }
}
