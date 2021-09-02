import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Badge } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: "3%",
    left: "7%",
    [theme.breakpoints.down('sm')]: {
      top: "4%",
      left: "10%",
    },
  },
  title:{
    fontSize: "18px",
      fontWeight: "bold",
    [theme.breakpoints.down('sm')]: {
      fontSize: "14px",
      fontWeight: "bold",
    },
  },
  media: {
    width: "100%",
    objectFit: "contain",
  },
  details: {
    position: "absolute",
    bottom: "0",
    padding: "10px",
    textDecoration: "none",
    fontSize: "15px",
    color: "blue",
    [theme.breakpoints.down('sm')]: {
      fontSize: "14px",
    },
  },
}));

export default function MediaCard({ movie }) {
  const classes = useStyles();
  const [ratings, setRatings] = useState();

  const consultRatings = async () => {
    const URL = process.env.REACT_APP_API_RATINGS;
    await fetch(URL)
      .then((response) => response.json())
      .then((json) => setRatings(json));
  };

  useEffect(() => {
    consultRatings();
    // eslint-disable-next-line
  }, []);

  const ratingFilter =
    ratings && ratings.filter((rating) => rating.movie === movie._id);
  const ratingMap = ratingFilter && ratingFilter.map((rating) => rating.value);
  let suma =
    ratingMap &&
    ratingMap.reduce((previous, current) => (current += previous), 0);
  let longitud = ratingMap && ratingMap.length;
  let promedio = suma / longitud;

  return (
    <Card className={classes.root}>
      <Badge
        className={classes.badge}
        badgeContent={promedio}
        color={promedio > 3 ? "primary" : "secondary"}
      ></Badge>
      <CardActionArea>
        <img className={classes.media} src={movie.image} alt={movie.name} />
        <CardContent>
          <Typography className={classes.title} gutterBottom variant="h6">
            {`${movie.name} (${
              movie.date && format(new Date(movie.date), "yyyy")
            })`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          className={classes.details}
          to={`/details/${movie._id}`}
          size="small"
          color="primary"
        >
          Details
        </Link>
      </CardActions>
    </Card>
  );
}
