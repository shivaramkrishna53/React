import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Passport() {
  return (
    <div>
      <center>
        <h3>Passport Booking</h3>
      </center>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link className="nav-link active" to="/passport/regular">
          <button type="button" className="btn btn-secondary">
            Regular
          </button>
        </Link>
        <Link className="nav-link" to="/passport/tatkal">
          <button type="button" className="btn btn-secondary">
            Tatkal
          </button>
        </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
