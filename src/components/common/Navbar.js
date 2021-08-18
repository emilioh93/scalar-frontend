import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link, useHistory } from "react-router-dom";
import routes from "../../helpers/routes";

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
  },
}));

export default function Navbar({ user, consultUser }) {
  const classes = useStyles();

  let history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.links}>
          <Link to={routes.home} variant="h6" className={classes.title}>
            Scalar Movies
          </Link>
          {user ? (
            <Link
              onClick={() => {
                localStorage.removeItem("userInfo");
                history.push("/");
                consultUser();
              }}
              className={classes.link}
              color="inherit"
            >
              Logout
            </Link>
          ) : (
            <Link to={routes.login} className={classes.link} color="inherit">
              Login
            </Link>
          )}
          <Link to={routes.dashboard} className={classes.link} color="inherit">
            Dashboard
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
