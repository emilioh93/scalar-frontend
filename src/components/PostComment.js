import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { UserContext } from "../Context/UserContext";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "0px",
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

export default function PostComent({ id, consultComments }) {
  const classes = useStyles();
  const [comment, setComment] = useState();
  const { user } = useContext(UserContext);
  const URL = process.env.REACT_APP_API_COMMENTS;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() !== "" && comment.length < 100) {
      // Create object
      const commentObject = {
        user: user,
        userName: user.firstName,
        userLast: user.lastName,
        text: comment,
        movie: id,
      };
      // POST
      try {
        const cabecera = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentObject),
        };

        // Alert
        const response = await fetch(URL, cabecera);
        if (response.status === 201) {
          Swal.fire("Comment posted", "", "success");
          e.target.reset();
          consultComments();
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "error");
      }
    } else {
      Swal.fire(
        "Error",
        "The comment exceeds the allowed number of characters (100)",
        "error"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
      id="commentsForm"
    >
      <h3>Comments</h3>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={10}>
          <TextField
            className={classes.input}
            id="outlined-basic"
            label="Write a comment"
            variant="outlined"
            onChange={(e) => setComment(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Post
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
