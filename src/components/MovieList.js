import { Grid } from "@material-ui/core";
import React from "react";
import MovieCard from "./MovieCard";

const MovieList = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={3}>
        <MovieCard></MovieCard>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <MovieCard></MovieCard>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <MovieCard></MovieCard>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <MovieCard></MovieCard>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <MovieCard></MovieCard>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <MovieCard></MovieCard>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <MovieCard></MovieCard>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <MovieCard></MovieCard>
      </Grid>
    </Grid>
  );
};

export default MovieList;
