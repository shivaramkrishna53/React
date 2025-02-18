import { useEffect } from "react";

function Timer({ timeremaining, dispatch }) {
  let mins = Math.floor(timeremaining / 60);
  let secs = timeremaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {" "}
      {mins < 10 ? "0" : ""}
      {mins} : {secs < 10 ? "0" : ""}
      {secs}
    </div>
  );
}

export default Timer;
