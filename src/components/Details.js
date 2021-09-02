import { Box, makeStyles } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostComment from "./PostComment";
import Comments from "./Comments";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import RatingStars from "./RatingStars";

const useStyles = makeStyles({
  title: {
    marginTop: 0,
  },
  image: {
    width: "100%",
  },
  plaseLogin: {
    padding: "30px 0",
  },
});

const Details = () => {
  const [movie, setMovie] = useState({});
  const URL = process.env.REACT_APP_API_MOVIES;
  const URL_Comments = process.env.REACT_APP_API_COMMENTS;
  const URL_Ratings = process.env.REACT_APP_API_RATINGS;
  const { id } = useParams();
  const classes = useStyles();
  const [comments, setComments] = useState();
  const [ratings, setRatings] = useState();
  const [disabled, setDisabled] = useState(false);
  const { user } = useContext(UserContext);

  const ratingFilter =
    ratings && ratings.filter((rating) => rating.movie === id);
  const ratingMap = ratingFilter && ratingFilter.map((rating) => rating.value);
  let suma =
    ratingMap &&
    ratingMap.reduce((previous, current) => (current += previous), 0);
  let longitud = ratingMap && ratingMap.length;
  let promedio = suma / longitud;

  const consultRatingOfUser = async () => {
    console.log(user);
  };

  const consultRatings = async () => {
    await fetch(URL_Ratings)
      .then((response) => response.json())
      .then((json) => setRatings(json));
  };

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
    consultRatings();
    consultRatingOfUser();
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
                <strong>Release date: </strong>
                {movie.date && format(new Date(movie.date), "MM/dd/yyyy")}
              </span>
            </div>
            <div>
              <span>
                <strong>Genre:</strong> {movie.genre}
              </span>
            </div>
            <div>
              <span>
                <strong>Rating:</strong> {promedio.toFixed(1)}
              </span>
            </div>
            {user ? (
              <>
                <RatingStars
                  disabled={disabled}
                  setDisabled={setDisabled}
                  id={id}
                  consultRatings={consultRatings}
                ></RatingStars>
                <PostComment
                  id={id}
                  consultComments={consultComments}
                ></PostComment>
              </>
            ) : (
              <div className={classes.plaseLogin}>
                <h2>Comments</h2>
                <span>
                  To post comments, please <Link to="/login">log in.</Link>
                </span>
              </div>
            )}
            <Comments id={id} comments={comments}></Comments>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Details;
