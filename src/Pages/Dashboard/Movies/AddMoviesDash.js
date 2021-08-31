import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "../Title";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Swal from "sweetalert2";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function AddMoviesDash({ consultMovies, genres }) {
  const classes = useStyles();
  const [date, setDate] = React.useState(new Date("2014-08-18"));
  const [genre, setGenre] = useState("");
  const [name, setName] = useState("");
  const [resume, setResume] = useState("");
  const [image, setImage] = useState("");
  const [raiting, setRaiting] = useState(0);
  const [error, setError] = useState(false);

  const URL = process.env.REACT_APP_API_MOVIES;

  const handleChange = (event) => {
    setGenre(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validations
    if (
      name.trim() !== "" &&
      resume.trim() !== "" &&
      image.trim() !== "" &&
      raiting.trim() !== "" &&
      raiting < 11 &&
      raiting > 0 &&
      date !== "" &&
      genre !== ""
    ) {
      setError(false);
      // Create object
      const movie = {
        name,
        resume,
        image,
        raiting,
        genre,
        date,
      };
      // POST
      try {
        const cabecera = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movie),
        };

        // Alert
        const response = await fetch(URL, cabecera);
        if (response.status === 201) {
          Swal.fire("Movie added", "", "success");
          // Form reset
          e.target.reset();
          // Update
          consultMovies();
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "error");
      }
    } else {
      setError(true);
    }
  };

  const sortGenres =
    genres &&
    genres.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

  return (
    <div id="addMovie">
      <Title>Add new movie</Title>
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={3}>
          <Grid item xm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Resume"
              onChange={(e) => setResume(e.target.value)}
            />
          </Grid>
          <Grid item xm={12} md={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Release date"
                format="MM/dd/yyyy"
                value={date}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xm={12} md={4}>
            <InputLabel id="demo-simple-select-label">Genre</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={genre}
              onChange={handleChange}
            >
              {sortGenres &&
                sortGenres.map((genre, i) => {
                  return (
                    <MenuItem key={i} value={genre.name}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </Grid>
          <Grid item xm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Image"
              onChange={(e) => setImage(e.target.value)}
            />
          </Grid>
          <Grid item xm={12} md={4}>
            <TextField
              id="standard-basic"
              label="Rating"
              type="number"
              onChange={(e) => setRaiting(e.target.value)}
            />
          </Grid>
          <Grid item xm={12} md={4}>
            <Button type="submit" variant="contained" color="primary">
              Add Movie
            </Button>
          </Grid>
        </Grid>
        {error === true ? (
          <Alert severity="error">Something went wrong!</Alert>
        ) : null}
      </form>
    </div>
  );
}
