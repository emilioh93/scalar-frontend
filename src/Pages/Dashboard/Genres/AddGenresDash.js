import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../Title";
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function AddGenresDash() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Title>Add new genre</Title>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" />
        <Button variant="contained" color="primary">
          Add Genre
        </Button>
      </form>
    </React.Fragment>
  );
}
