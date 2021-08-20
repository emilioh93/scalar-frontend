import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "#fff",
    textDecoration: "none",
    fontSize: "larger",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    margin: "0 15px",
  },
}));

export default function Navbar() {
  const classes = useStyles();

  let history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.links}>
          <Link to="/" variant="h6" className={classes.title}>
            Scalar Movies
          </Link>
          <Link to="/login" className={classes.link} color="inherit">
            Login
          </Link>
          <Link
            to="/#"
            onClick={() => {
              localStorage.removeItem("userInfo");
              history.push("/");
            }}
            className={classes.link}
            color="inherit"
          >
            Logout
          </Link>
          <Link to="/dashboard" className={classes.link} color="inherit">
            Dashboard
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
