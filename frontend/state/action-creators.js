import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE,
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE,
  };
}

export function selectAnswer(answerId) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answerId,
  };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz() {
  return (dispatch) => {
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: res.data });
      })
      .catch((err) => alert(err));
  };
}

export function inputChange(valueToChange, newValue) {
  return { type: INPUT_CHANGE, payload: [valueToChange, newValue] };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}
export function postAnswer(quiz_id, answer_id) {
  return (dispatch) => {
    axios
      .post("http://localhost:9000/api/quiz/answer", {
        quiz_id: quiz_id,
        answer_id: answer_id,
      })
      .then((res) => {
        dispatch({ type: SET_INFO_MESSAGE, payload: res.data.message });
        dispatch(setQuiz());
      })
      .catch((err) => console.log(err));
  };
}
export function postQuiz(quizObj) {
  return function (dispatch) {
    axios
      .post("http://localhost:9000/api/quiz/new", quizObj)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: SET_INFO_MESSAGE,
          payload: `Congrats: "${res.data.question}" is a great question!`,
        });
        dispatch({ type: RESET_FORM });
      })
      .catch((err) => console.log(err));
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
