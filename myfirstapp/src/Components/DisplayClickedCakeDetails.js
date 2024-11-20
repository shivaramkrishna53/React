import React from "react";
import { useParams } from "react-router-dom";

export default function DisplayClickedCakeDetails() {
  const { cakeid, name, price } = useParams();
  return (
    <div>
      <h1>Displaying Individual Cake::</h1>
      <h2>Cake id::{cakeid}</h2>
      <h2>Cake name::{name}</h2>
      <h2>Cake price::{price}</h2>
    </div>
  );
}
