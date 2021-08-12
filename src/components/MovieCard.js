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
    maxWidth: 300,
  },
  media: {
    height: 500,
    width: "100%",
    objectFit: "contain",
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/225211/RagingFire-DonnieYen-WellGoUSA-1382x2048.jpg"
          title="Title of the movie"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Title of the movie
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Raiting
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to="/details" size="small" color="primary">
          Details
        </Link>
      </CardActions>
    </Card>
  );
}
