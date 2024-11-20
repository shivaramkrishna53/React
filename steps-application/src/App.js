import "./index.css";
import { useState } from "react";

export default function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Steps() {
  // useState() hook is used to maintain the state.
  let [currentstep, setcurrentstep] = useState(1);
  let [isOpen, setisOpen] = useState(true);
  const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];

  function changeStepValue(val) {
    if (val === "dec") {
      if (currentstep > 1) {
        // setcurrentstep(currentstep - 1);
        setcurrentstep((s) => s - 1); // use call back function, which stores the current value.
      }
    } else {
      if (currentstep < 3) {
        // setcurrentstep(currentstep + 1);
        // setcurrentstep(currentstep + 1); if we calling it twice in above two lines, still it updates one time only. so its better to use call back function.

        setcurrentstep((s) => s + 1); // use call back function, which stores the current value.
        // setcurrentstep((s) => s + 1); for the 2nd time call, it increases the value again.
      }
    }
  }

  function handleCloseButton() {
    setisOpen(!isOpen);
  }

  return (
    <div>
      <button className="close" onClick={handleCloseButton}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={currentstep >= 1 ? "active" : ""}>1</div>
            <div className={currentstep >= 2 ? "active" : ""}>2</div>
            <div className={currentstep >= 3 ? "active" : ""}>3</div>
          </div>

          {/* <div className="message">
            Step {currentstep} : {messages[currentstep - 1]}
          </div> */}

          <StepMessage step={currentstep}>
            {messages[currentstep - 1]}
          </StepMessage>
          <div className="buttons">
            <Button
              bgclour="#7950f2"
              textcolor="white"
              onclkhandler={() => changeStepValue("dec")}
            >
              <span>👈</span> Previous
            </Button>

            <Button
              bgclour="#7950f2"
              textcolor="white"
              onclkhandler={() => changeStepValue("inc")}
            >
              Next<span>👉</span>
            </Button>
          </div>
          {/* <button
              onClick={() => changeStepValue("dec")}
              style={{ color: "white", backgroundColor: "#7950f2" }}
            >
              Previous
            </button>
            <button
              onClick={() => changeStepValue("inc")}
              style={{ color: "white", backgroundColor: "#7950f2" }}
            >
              Next
            </button> */}
        </div>
      )}
    </div>
  );
}

function Button({ bgclour, textcolor, onclkhandler, children }) {
  return (
    <button
      style={{ backgroundColor: bgclour, color: textcolor }}
      onClick={onclkhandler}
    >
      {children}
    </button>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      Step {step} : {children}
    </div>
  );
}
