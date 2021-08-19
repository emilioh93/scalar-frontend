import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  media: {
    height: 500,
    width: "100%",
    objectFit: "contain",
  },
});

export default function MediaCard({ movie }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={movie.image}
          title={movie.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.raiting}/5
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/details/${movie._id}`} size="small" color="primary">
          Details
        </Link>
      </CardActions>
    </Card>
  );
}
