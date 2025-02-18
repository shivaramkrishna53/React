function RestartQuiz({ dispatch, index, answer }) {
  if (index > 0 && answer != null) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => {
            dispatch({ type: "restart" });
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export default RestartQuiz;
