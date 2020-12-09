import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="not-found">
    <div>
      <h1>404 - OOPS Looks like you lost your way!</h1>
      <Link to="/">Go Home</Link>
    </div>
  </div>
);

export default NotFound;
