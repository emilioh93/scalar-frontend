import { Box, makeStyles } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    marginTop: 0,
  },
  image: {
    width: "100%",
  },
});

const Details = () => {
  const [movie, setMovie] = useState({});
  const URL = process.env.REACT_APP_API_MOVIES;
  const { id } = useParams();
  const classes = useStyles();

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
          <Grid item xs={12} sm={4} lg={4}>
            <img className={classes.image} src={movie.image} alt={movie.name} />
          </Grid>
          <Grid item xs={12} sm={8} lg={8}>
            <h1 className={classes.title}>{movie.name}</h1>
            <p>{movie.resume}</p>
            <div>
              <span>
                <strong>Release date:</strong> {movie.date}
              </span>
            </div>
            <div>
              <span>
                <strong>Genre:</strong> {movie.genre}
              </span>
            </div>
            <div>
              <span>
                <strong>Raiting:</strong> {movie.raiting}/5
              </span>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Details;
