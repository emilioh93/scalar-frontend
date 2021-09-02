import React from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
  },
}));

export default function RatingStars() {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);

  return (
    <div className={classes.root} component="fieldset">
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}
