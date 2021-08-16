import { Box } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const [movie, setMovie] = useState({});
  const URL = process.env.REACT_APP_API_MOVIES;
  const { id } = useParams();

  useEffect(() => {
    consultDetails();
    // eslint-disable-next-line
  }, []);

  const consultDetails = async () => {
    try {
      const response = await fetch(URL + "/" + id);
      if (response.status === 200) {
        const movieFounded = await response.json();
        setMovie(movieFounded);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Box mt={7}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <img src={movie.image} alt={movie.name} />
          </Grid>
          <Grid item xs={12} sm={12} md={8}>
            <div>{movie.name}</div>
            <div>{movie.date}</div>
            <div>{movie.resume}</div>
            <div>{movie.genre}</div>
            <div>{movie.raiting}</div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Details;
