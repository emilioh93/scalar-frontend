import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <Grid container spacing={3}>
      {movies &&
        movies.map((movie, i) => {
          return movie ? (
            <Grid key={i} item xs={6} sm={4} lg={3}>
              <MovieCard movie={movie}></MovieCard>
            </Grid>
          ) : (
            <Grid key={i} item xs={6} sm={4} lg={3}>
              <Skeleton variant="rect" width={250} height={450} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default MovieList;
