import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: "100%",
  },
  media: {
    width: "100%",
    objectFit: "contain",
  },
  details: {
    textDecoration: "none",
    fontSize: "18px",
    color: "blue",
  },
});

export default function MediaCard({ movie }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <img className={classes.media} src={movie.image} alt={movie.name} />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {`${movie.name} (${
              movie.date && format(new Date(movie.date), "yyyy")
            })`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.raiting}/10
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
