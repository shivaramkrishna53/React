function FinishScreen({ points, totalpoints, highscore, dispatch }) {
  const percentage = Math.ceil((points / totalpoints) * 100);
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 60 && percentage < 80) emoji = "🥉";
  if (percentage >= 40 && percentage < 60) emoji = "🫤";
  if (percentage < 40) emoji = "🤒";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You Scored: <strong>{points}</strong> Out of{" "}
        {totalpoints} ({percentage}%)
      </p>
      <p className="highscore">(HighestScore: {highscore} points ) </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
