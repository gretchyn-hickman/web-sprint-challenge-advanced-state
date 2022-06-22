import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const [unableToSubmit, setUnableToSubmit] = useState(true);

  useEffect(() => {
    const newQuestion = props.form.newQuestion;
    const newTrueAnswer = props.form.newTrueAnswer;
    const newFalseAnswer = props.form.newFalseAnswer;
    const newQuizArray = [newQuestion, newTrueAnswer, newFalseAnswer];
    const finalQuizArray = newQuizArray.map((str) => {
      return str.trim().length >= 2;
    });
    newQuizArray.forEach((str) => {
      console.log(str.trim().length >= 2);
    });
    if (finalQuizArray[0] && finalQuizArray[1] && finalQuizArray[2]) {
      setUnableToSubmit(true);
    } else {
      setUnableToSubmit(false);
    }
  }, [props.form]);

  const onChange = (evt) => {
    props.inputChange(evt.target.id, evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const quizObj = {
      question_text: props.form.newQuestion,
      true_answer_text: props.form.newTrueAnswer,
      false_answer_text: props.form.newFalseAnswer,
    };
    props.postQuiz(quizObj);
    props.resetForm();
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={props.form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={props.form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={props.form.newFalseAnswer}
      />
      <button disabled={!unableToSubmit} id="submitNewQuizBtn">
        Submit new quiz
      </button>
    </form>
  );
}

const mapStateToProps = (st) => {
  console.log(st);
  return st;
};

export default connect(mapStateToProps, actionCreators)(Form);
