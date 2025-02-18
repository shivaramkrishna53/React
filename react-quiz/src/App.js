import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import RestartQuiz from "./RestartQuiz";
import Timer from "./Timer";
import Footer from "./Footer";

let initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeremaining: 0,
};
const TIME_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "datarecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "datafailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "start",
        timeremaining: state.questions.length * TIME_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      // return {
      //   ...state,
      //   index: 0,
      //   answer: null,
      //   points: 0,
      //   highscore: 0,
      //   status: "ready",
      // }; //or below one
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        timeremaining: state.timeremaining - 1,
        status: state.timeremaining === 0 ? "finished" : state.status,
      };
    default:
      return { ...state, status: "loading" };
  }
}

export default function App() {
  let [state, dispatch] = useReducer(reducer, initialState);
  let { questions, status, index, answer, points, highscore, timeremaining } =
    state;
  let numberofquestions = questions.length;

  let totalpoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:9090/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "datarecived", payload: data }))
      .catch((err) => dispatch({ type: "datafailed" }));
  }, []);

  return (
    <div className="app">
      {/* <DateCounter /> */}
      <Header />
      <Main></Main>
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && (
        <StartScreen
          numberofquestions={numberofquestions}
          dispatch={dispatch}
        />
      )}
      {status === "start" && (
        <>
          <Progress
            index={index}
            numberofquestions={numberofquestions}
            points={points}
            totalpoints={totalpoints}
            answer={answer}
          />
          <Questions
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            <Timer timeremaining={timeremaining} dispatch={dispatch} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numberofquestions={numberofquestions}
              index={index}
            />
          </Footer>
          <RestartQuiz dispatch={dispatch} index={index} answer={answer} />
        </>
      )}
      {status === "finished" && (
        <FinishScreen
          points={points}
          totalpoints={totalpoints}
          highscore={highscore}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}
