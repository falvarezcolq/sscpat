import axios from "axios";
import {
  MESSAGE_DEFAULT,
  FORM_FAILED,
  GET_STUDENTS,
  GET_STUDENT,
} from "./types";

import { acceptErrors } from "./messages";
import Config from "../utils/Config";
import { getAuthHeader } from "./headers";

// // Search
// export const searchTutor = (q) => (dispatch, getState) => {
//   const tutorList = getState().tutors.tutorList;

//   dispatch({
//     type: TUTOR_SEARCH,
//     payload: tutorList.filter((tutor) => (
//         tutor.first_name.includes(q) ||
//         tutor.last_name.includes(q) ||
//         tutor.last_name2.includes(q) ||
//         tutor.ci.includes(q))),
//   });
// };

// export const addTutor = (id) => (dispatch, getState) =>{
//     const tutorList = getState().tutors.tutorList;
//     console.log(tutorList.filter((tutor) => tutor.id === id))
//     console.log(id)
//     console.log("que paso aqui")
//     dispatch({
//       type: TUTOR_ADDED,
//       payload: tutorList.filter((tutor) => tutor.id === id)[0],
//     });
// }

// // Remove tutor
// export const removeTutor = (id) => (dispatch) =>{
//     dispatch({
//       type: TUTOR_REMOVED,
//       payload: id,
//     });
// }

// LIST STUDENTS
export const listStudents =
  (url = Config.StudentApiUrl, params = null) =>
  async (dispatch) => {
    // dispatch({type:FORM_LOADING})
    dispatch({ type: MESSAGE_DEFAULT });
    let config = await getAuthHeader();

    if (params) {
      config = {
        ...config,
        params: params,
      };
    }
    console.log(url);
    try {
      await axios.get(url, config).then((res) => {
        console.log("success");
        //   dispatch({type:FORM_SUCCESS})
        dispatch({
          type: GET_STUDENTS,
          payload: res.data,
        });
      });
      return null;
    } catch (err) {
      //   dispatch({ type:FORM_NOT_LOADING})
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    }
  };

// GET STUDENT
export const getStudent = (id) => async (dispatch) => {
  dispatch({ type: MESSAGE_DEFAULT });
  let config = await getAuthHeader();
  const res = await axios
    .get(Config.StudentApiUrl + id, config)
    .then((res) => {
      dispatch({
        type: GET_STUDENT,
        payload: res.data,
      });
      return res.data;
    })
    .catch((err) => {
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    });

  return res;
};

// LIST STUDENTS BY TUTOR
export const listStudentsByTutors =
  (url = Config.StudentApiUrl, params = null) =>
  async (dispatch) => {
    dispatch({ type: MESSAGE_DEFAULT });
    let config = await getAuthHeader();

    if (params) {
      config = {
        ...config,
        params: params,
      };
    }
    
    console.log(url);
    try {
      await axios.get(url, config).then((res) => {
        console.log("success");
        dispatch({
          type: GET_STUDENTS,
          payload: res.data,
        });
      });
      return null;
    } catch (err) {
      return acceptErrors({
        err: err,
        dispatch: dispatch,
        type: FORM_FAILED,
      });
    }
  };
