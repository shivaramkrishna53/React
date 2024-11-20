import React, { useState } from "react";

export default function Increment() {
  let [count, setCount] = useState(100);
  const incdec = (val, fun) => {
    if (fun === "in") setCount(count + val);
    else if (fun === "dec") {
      setCount(count - val);
    }
  };
  return (
    <div>
      <center>
        <h1>This is increment</h1>
        <h2>Value of count:: {count}</h2>
        <button
          onClick={() => incdec(50, "in")}
          type="button"
          class="btn btn-primary"
        >
          Increment by 50
        </button>
        <br />
        <br />
        <button
          onClick={() => incdec(100, "in")}
          type="button"
          class="btn btn-primary"
        >
          Increment by 100
        </button>
        <br />
        <br />
        <button
          onClick={() => incdec(50, "dec")}
          type="button"
          class="btn btn-primary"
        >
          Decrement by 50
        </button>
        <br />
        <br />
        <button
          onClick={() => incdec(100, "dec")}
          type="button"
          class="btn btn-primary"
        >
          Decrement by 100
        </button>
      </center>
    </div>
  );
}
