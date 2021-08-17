import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../Title";
import { Button, TextField } from "@material-ui/core";
import Swal from "sweetalert2";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function AddGenresDash({consultGenres}) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const URL = process.env.REACT_APP_API_GENRES;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validations
    if (name.trim() !== "") {
      setError(false);
      // Create object
      const genre = {
        name,
      };
      // POST
      try {
        const cabecera = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(genre),
        };

        // Alert
        const response = await fetch(URL, cabecera);
        console.log(response);
        if (response.status === 201) {
          Swal.fire("Genre added", "", "success");
          // Form reset
          e.target.reset();
          // Update
          consultGenres();
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "error");
      }
    } else {
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <Title>Add new genre</Title>
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Genre
        </Button>
        {error === true ? (
          <Alert severity="error">Something went wrong!</Alert>
        ) : null}
      </form>
    </React.Fragment>
  );
}
