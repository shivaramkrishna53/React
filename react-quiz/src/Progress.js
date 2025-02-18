function Progress({ index, numberofquestions, points, totalpoints, answer }) {
  let answered = answer != null;
  return (
    <header className="progress">
      <progress
        max={numberofquestions}
        value={index + Number(answered)}
      ></progress>
      <p>
        Question
        <strong> {index + 1}</strong>/{numberofquestions}
      </p>

      <p>
        <strong> {points} </strong> / {totalpoints}
      </p>
    </header>
  );
}

export default Progress;
