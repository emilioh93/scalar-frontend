import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems } from "./listItems";
import MoviesDash from "./Movies/MoviesDash.js";
import AddMoviesDash from "./Movies/AddMoviesDash.js";
import UsersDash from "./Users/UsersDash.js";
import GenreDash from "./Genres/GerneDash";
import AddGenresDash from "./Genres/AddGenresDash";
import { Link } from "react-router-dom";
import CommentsDash from "./Comments/CommentsDash";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  link: {
    marginLeft: "auto",
    padding: "20px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard({ consultMovies, movies, setNavbarFlag }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [users, setUsers] = useState();
  const [genres, setGenres] = useState();
  const [comments, setComments] = useState();
  const [ratings, setRatings] = useState();

  const consultUsers = async () => {
    const URL = process.env.REACT_APP_API_USERS;
    await fetch(URL)
      .then((response) => response.json())
      .then((json) => setUsers(json));
  };

  const consultGenres = async () => {
    const URL = process.env.REACT_APP_API_GENRES;
    await fetch(URL)
      .then((response) => response.json())
      .then((json) => setGenres(json));
  };

  const consultComments = async () => {
    const URL = process.env.REACT_APP_API_COMMENTS;
    await fetch(URL)
      .then((response) => response.json())
      .then((json) => setComments(json));
  };

  const consultRatings = async () => {
    const URL = process.env.REACT_APP_API_RATINGS;
    await fetch(URL)
      .then((response) => response.json())
      .then((json) => setRatings(json));
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    consultUsers();
    consultGenres();
    consultComments();
    consultRatings();
    // eslint-disable-next-line
    setNavbarFlag(false);
    return () => setNavbarFlag(true);
  }, [setNavbarFlag]);

  return (
    <div id="dashboard" className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <Link to="/" className={classes.link}>
            Home
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <MoviesDash
                  consultMovies={consultMovies}
                  movies={movies}
                  genres={genres}
                  ratings={ratings}
                  setGenres={setGenres}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <AddMoviesDash consultMovies={consultMovies} genres={genres} />
              </Paper>
            </Grid>
            <hr />
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <GenreDash
                  consultGenres={consultGenres}
                  genres={genres}
                  setGenres={setGenres}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <AddGenresDash consultGenres={consultGenres} />
              </Paper>
            </Grid>
            <hr />
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <UsersDash users={users} consultUsers={consultUsers} />
              </Paper>
            </Grid>
            <hr />
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CommentsDash
                  comments={comments}
                  movies={movies}
                  users={users}
                  consultComments={consultComments}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
