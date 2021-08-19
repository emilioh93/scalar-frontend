import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <h1>Error 404</h1>
      <h4>Page not found</h4>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default Error404;
