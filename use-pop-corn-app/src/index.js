import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Test() {
  let [testrating, setTestRating] = useState(0);
  return (
    <>
      <StarRating maxrating={10} changeTestRating={setTestRating} />
      <p>The rating for the movie is {testrating}</p>
    </>
  );
}
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxrating={5}
      color="green"
      size={24}
      messages={["Terrible", "bad", "okay", "good", "amazing"]}
    /> */}
    {/* <StarRating /> */}
    {/* <Test /> */}
  </React.StrictMode>
);
