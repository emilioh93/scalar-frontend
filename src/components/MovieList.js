import { Grid } from "@material-ui/core";
import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <Grid
      container
      spacing={3}
    >
      {movies &&
        movies.map((movie) => {
          return (
            <Grid item xs={12} sm={4} lg={3}>
              <MovieCard movie={movie}></MovieCard>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default MovieList;
