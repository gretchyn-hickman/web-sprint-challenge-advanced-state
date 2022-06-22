import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  setQuiz,
  selectAnswer,
  setMessage,
  postAnswer,
} from "../state/action-creators";

function Quiz(props) {
  const [canSubmit, setCanSubmit] = useState(true);

  useEffect(() => {
    if (!props.quizExists) props.setQuiz();
  }, [props.quizExists]);

  const selectAnswer = (e) => {
    setCanSubmit(false);
    props.selectAnswer(e.target.id);
  };

  const handleSubmit = () => {
    props.postAnswer(props.quiz.quiz_id, props.selectedAnswer);
    // props.setQuiz();
    setCanSubmit(true);
  };

  console.log(props);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quizExists ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={`answer${
                  props.selectedAnswer === props.quiz.answers[0].answer_id
                    ? " selected"
                    : ""
                }`}
              >
                {props.quiz.answers[0].text}
                <button
                  id={props.quiz.answers[0].answer_id}
                  onClick={selectAnswer}
                >
                  {props.selectedAnswer === props.quiz.answers[0].answer_id
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>

              <div
                className={`answer${
                  props.selectedAnswer === props.quiz.answers[1].answer_id
                    ? " selected"
                    : ""
                }`}
              >
                {props.quiz.answers[1].text}
                <button
                  id={props.quiz.answers[1].answer_id}
                  onClick={selectAnswer}
                >
                  {props.selectedAnswer === props.quiz.answers[1].answer_id
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
            </div>

            <button
              id="submitAnswerBtn"
              disabled={canSubmit}
              onClick={handleSubmit}
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("this is state", state);
  return {
    quiz: state.quiz,
    quizExists: !!state.quiz.question,
    selectedAnswer: state.selectedAnswer,
  };
};

export default connect(mapStateToProps, {
  setQuiz,
  selectAnswer,
  setMessage,
  postAnswer,
})(Quiz);
