import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
}));
const Error404 = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Error 404</h1>
      <h4>Page not found</h4>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default Error404;
