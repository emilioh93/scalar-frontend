import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
    width: "100%",
  },
  input: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: "100%",
  },
}));

export default function PostComent() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <h3>Comments</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={10}>
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Write a comment"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button className={classes.button} variant="contained" color="primary">
            Post
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
