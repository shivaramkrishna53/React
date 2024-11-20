import React from "react";

export default function ConditionalRendering() {
  let login = true;
  let user = "shiva";
  let cars = ["BMW", "VOLVO", "RANGE-ROVER"];
  if (login) {
    return (
      <div>
        <h1>ConditionalRendering</h1>
        <h2>Welcome to DashBoard::{user === "" ? "Guest" : user}</h2>
        {cars.length > 0 && (
          <h3>
            I have {cars.join(", ")} {cars.length > 1 ? "cars" : "car"}
          </h3>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h1>ConditionalRendering</h1>
        <h2>Please login to access further features!!!</h2>
      </div>
    );
  }
}
