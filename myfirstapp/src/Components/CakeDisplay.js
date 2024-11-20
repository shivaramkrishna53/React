import React from "react";
import { Link } from "react-router-dom";

export default function CakeDisplay(props) {
  return (
    <div>
      <div className="card" style={{ width: "18rem", margin: "3px" }}>
        <Link
          className="nav-link"
          to={
            "/displaycake/" +
            props.cake.cakeid +
            "/" +
            props.cake.name +
            "/" +
            props.cake.price
          }
        >
          <img
            src={"image/" + props.cake.image}
            className="card-img-top"
            alt="..."
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{props.cake.name}</h5>
          <p className="card-text"> Rs.{props.cake.price} </p>
          <a href="#" className="btn btn-primary">
            Add To Cart
          </a>
        </div>
      </div>
    </div>
  );
}
