import React, { useState } from "react";
import Button from "./Button";

export default function DisplayIncrementDecrement() {
  let [count, setCount] = useState(100);
  let incdec = (fun, val) => {
    if (fun === "increment") setCount(count + val);
    else if (fun === "decrement") setCount(count - val);
  };
  return (
    <div>
      <h1>The current value is::{count}</h1>
      <Button operation="increment" val={50} incredecre={incdec} />
      <Button operation="increment" val={100} incredecre={incdec} />
      <Button operation="decrement" val={50} incredecre={incdec} />
      <Button operation="decrement" val={100} incredecre={incdec} />
    </div>
  );
}
