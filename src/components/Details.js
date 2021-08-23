import { Box, makeStyles } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostComment from "./PostComment";
import Comments from "./Comments";

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
  const URL_Comments = process.env.REACT_APP_API_COMMENTS;
  const { id } = useParams();
  const classes = useStyles();
  const [comments, setComments] = useState();

  const consultComments = async () => {
    await fetch(URL_Comments)
      .then((response) => response.json())
      .then((json) => setComments(json));
  };

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

  useEffect(() => {
    consultComments();
    consultDetails();
    // eslint-disable-next-line
  }, []);

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
                <strong>Raiting:</strong> {movie.raiting}/10
              </span>
            </div>
            <PostComment
              id={id}
              consultComments={consultComments}
            ></PostComment>
            <Comments id={id} comments={comments}></Comments>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Details;
