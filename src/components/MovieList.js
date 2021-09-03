import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import MovieCard from "./MovieCard";

const useStyles = makeStyles((theme) => ({
  skeleton: {
    [theme.breakpoints.down('sm')]: {
      width: "150px",
    },
  }
}));

const MovieList = ({ movies }) => {
  const classes = useStyles();
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
                <Skeleton className={classes.skeleton} variant="rect" height={300} />
                <Skeleton className={classes.skeleton} />
                <Skeleton className={classes.skeleton} />
                <Skeleton className={classes.skeleton} />
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
