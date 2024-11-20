import "./App.css";
import { useState } from "react";

function App() {
  return (
    <div>
      <center>
        {/* <DateModifier /> */}
        <DateModifier2 />
      </center>
    </div>
  );
}

function DateModifier() {
  //refer to the uncommented code from line 98
  // let [step, setstep] = useState(0);
  // let [count, setcount] = useState(0);

  // let [today, settoday] = useState(new Date());

  // let options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };
  // let formattedDate = today.toLocaleDateString("en-US", options);
  // let [formateddt, setformateddt] = useState(formattedDate);

  // return (
  //   <div>
  //     <span>
  //       <button
  //         onClick={() => {
  //           if (step > 1) setstep((step) => step - 1);
  //         }}
  //       >
  //         -
  //       </button>
  //     </span>
  //     <span>Step: {step}</span>
  //     <span>
  //       <button onClick={() => setstep((step) => step + 1)}>+</button>
  //     </span>
  //     <br></br>
  //     <span>
  //       <button
  //         onClick={() => {
  //           setcount((count) => count - step);
  //           const result = new Date(today);
  //           result.setDate(result.getDate() - step);
  //           settoday(result);
  //           let options = {
  //             weekday: "long",
  //             year: "numeric",
  //             month: "long",
  //             day: "numeric",
  //           };
  //           const formattedDate = result.toLocaleDateString("en-US", options);
  //           setformateddt(formattedDate);
  //         }}
  //       >
  //         -
  //       </button>
  //     </span>
  //     <span>Count: {count}</span>
  //     <span>
  //       <button
  //         onClick={() => {
  //           setcount((count) => count + step);
  //           let result = new Date(today);
  //           result.setDate(result.getDate() + step);
  //           settoday(result);
  //           let options = {
  //             weekday: "long",
  //             year: "numeric",
  //             month: "long",
  //             day: "numeric",
  //           };
  //           const formattedDate = result.toLocaleDateString("en-US", options);
  //           setformateddt(formattedDate);
  //         }}
  //       >
  //         +
  //       </button>
  //     </span>
  //     <br></br>
  //     <span>
  //       {count === 0
  //         ? `Today is ${formateddt}`
  //         : count > 0
  //         ? `${count} days from today is ${formateddt}`
  //         : `${Math.abs(count)} days ago was ${formateddt}`}
  //     </span>
  //   </div>
  // );

  let [count, setcount] = useState(0);
  let [step, setstep] = useState(0);
  let currentdate = new Date();
  currentdate.setDate(currentdate.getDate() + count);
  return (
    <div>
      <span>
        <button onClick={() => setstep((s) => s - 1)}>-</button>
      </span>
      <span>Step:{step}</span>
      <span>
        <button onClick={() => setstep((s) => s + 1)}>+</button>
      </span>
      <br></br>
      <span>
        <button onClick={() => setcount((c) => c - step)}>-</button>
      </span>
      <span>Count:{count}</span>
      <span>
        <button onClick={() => setcount((c) => c + step)}>+</button>
      </span>
      <br></br>
      <span>
        {count === 0
          ? `Today is`
          : count > 0
          ? `${count} days from today is`
          : `${Math.abs(count)} days ago was`}{" "}
        {currentdate.toDateString()}
      </span>
    </div>
  );
}

function DateModifier2() {
  let [count, setcount] = useState(0);
  let [step, setstep] = useState(1);
  let currentdate = new Date();
  currentdate.setDate(currentdate.getDate() + count);
  return (
    <div>
      <span>
        <button onClick={() => setstep((s) => s - 1)}>-</button>
      </span>
      <span>
        <input
          type="range"
          min={1}
          max={100}
          value={step}
          onChange={(e) => setstep(Number(e.target.value))}
        />
      </span>
      <span>
        <button onClick={() => setstep((s) => s + 1)}>+</button>
        <span> {step} </span>
      </span>
      <br></br>
      <span>
        <button onClick={() => setcount((c) => c - step)}>-</button>
      </span>
      <span>
        <input
          type="text"
          value={count}
          onChange={(e) => setcount(Number(e.target.value))}
        />
      </span>
      <span>
        <button onClick={() => setcount((c) => c + step)}>+</button>
      </span>
      <br></br>
      <span>
        {count === 0
          ? `Today is`
          : count > 0
          ? `${count} days from today is`
          : `${Math.abs(count)} days ago was`}{" "}
        {currentdate.toDateString()}
      </span>
      <br></br>
      <span>
        {count !== 0 || step !== 1 ? (
          <button
            onClick={() => {
              setstep(1);
              setcount(0);
            }}
          >
            Reset
          </button>
        ) : (
          ""
        )}
      </span>
    </div>
  );
}

export default App;
