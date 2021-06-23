
import {
  TUTOR_ADDED,
  TUTOR_REMOVED,
  // TUTOR_ALREADY_ADDED,
  TUTOR_SEARCH,
  GET_TUTORS,
  GET_TUTOR,
  MINIMAL_LIST_TUTOR,
} from "../../actions/types";

const initialState = {
  tutorList: [
    {
      id: "1",
      first_name: "juan",
      last_name: "perez",
      last_name2: "Gonzales",
      ci: "5132222",
    },
    {
      id: "2",
      first_name: "Roger",
      last_name: "Rosales",
      last_name2: "Gonzales",
      ci: "5132222",
    },
    {
      id: "3",
      first_name: "Pedro",
      last_name: "Silva",
      last_name2: "Gonzales",
      ci: "5132222",
    },
    {
      id: "4",
      first_name: "Sebastian",
      last_name: "Maria",
      last_name2: "Gonzales",
      ci: "5132222",
    },
    {
      id: "5",
      first_name: "Raul",
      last_name: "Linares",
      last_name2: "Gonzales",
      ci: "5132222",
    },
    {
      id: "6",
      first_name: "Luisa",
      last_name: "Sanches",
      last_name2: "Gonzales",
      ci: "5132222",
    },
    {
      id: "7",
      first_name: "Sonia",
      last_name: "Fernandez",
      last_name2: "Gonzales",
      ci: "5132222",
    },
    {
      id: "8",
      first_name: "Isaura",
      last_name: "Ramirez",
      last_name2: "Gonzales",
      ci: "5132222",
    },
    {
      id: "9",
      first_name: "Lenon",
      last_name: "Gutierrez",
      last_name2: "Gonzales",
      ci: "5132222",
    },
    {
      id: "10",
      first_name: "Issac",
      last_name: "Car",
      last_name2: "Gonzales",
      ci: "5132222",
    },
    {
      id: "11",
      first_name: "Tomas",
      last_name: "perez",
      last_name2: "Gonzales",
      ci: "5132222",
    },
    {
      id: "12",
      first_name: "Edison",
      last_name: "perez",
      last_name2: "Gonzales",
      ci: "5132222",
    },
  ],
  tutorSearch: [],
  tutorAddedList: [],
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

export default function tutors(state = initialState, action) {
  switch (action.type) {
    case TUTOR_ADDED:
      return {
        ...state,
        tutorAddedList: [action.payload, ...state.tutorAddedList],
      };

    case TUTOR_REMOVED:
      return {
        ...state,
        tutorAddedList: state.tutorAddedList.filter(
          (tutor) => tutor.id !== action.payload
        ),
      };

    case TUTOR_SEARCH:
      return {
        ...state,
        tutorSearch: action.payload,
      };

    case GET_TUTORS:
      return {
        ...state,
        ...action.payload,
      };
    
    case GET_TUTOR:
      return {
        ...state,
        tutor:action.payload,
      };

    case MINIMAL_LIST_TUTOR:
      return {
        ...state,
        list:action.payload,
      };

    default:
      return state;
  }
}
