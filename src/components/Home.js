import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import MovieList from "./MovieList";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
}));

const Home = ({movies}) => {
  const classes = useStyles();

  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");
  //   if (userInfo) {
  //     history.push("/");
  //   }
  // }, [history]);

  return (
    <Container>
      <div className={classes.title}>
        <h1>NOW PLAYING & COMING SOON</h1>
      </div>
      <div>
        <span>Sorted by</span>
      </div>
      <MovieList movies={movies}></MovieList>
    </Container>
  );
};

export default Home;
