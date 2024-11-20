import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Axios() {
  let [users, Setusers] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        Setusers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <center>
        <h1>Axios</h1>
      </center>
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <h4>{user.name}</h4>
              <h4>{user.phone}</h4>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
}
