import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <Grid container spacing={3}>
      {loading
        ? movies &&
          movies.map((movie, i) => {
            return (
              <Grid key={i} item xs={6} sm={4} lg={3}>
                <Skeleton variant="rect" width={220} height={300} />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </Grid>
            );
          })
        : movies &&
          movies.map((movie, i) => {
            return (
              <Grid key={i} item xs={6} sm={4} lg={3}>
                <MovieCard movie={movie}></MovieCard>
              </Grid>
            );
          })}
    </Grid>
  );
};

export default MovieList;
