import React, { useEffect, useState } from "react";

export default function LifeCycle() {
  let [name, setName] = useState("Sid");
  let [place, setPlace] = useState("Bengaluru");

  useEffect(() => {
    console.log("Inside useeffect []....Component is mounted");
    return () => {
      console.log("Component is about to be removed");
    };
  }, []);

  useEffect(() => {
    console.log(
      "Inside useeffect()....Component is updated (Also runs for first time)"
    );
  });

  useEffect(() => {
    console.log(
      "Inside useeffect[place]...Place variable changed (Also runs for first time )"
    );
  }, [place]);

  return (
    <div>
      <h1>Life Cycle Methods</h1>
      <h3>
        Hi, I am {name} and I stay in {place}
      </h3>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => setPlace("Hyderabad")}
      >
        changePlace
      </button>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => setName("Siddaram")}
      >
        changeName
      </button>
    </div>
  );
}
