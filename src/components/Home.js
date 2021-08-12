import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import MovieList from "./MovieList";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container>
      <div className={classes.title}>
        <h1>NOW PLAYING & COMING SOON</h1>
      </div>
      <div>
        <span>Sorted by</span>
      </div>
      <MovieList></MovieList>
    </Container>
  );
};

export default Home;
