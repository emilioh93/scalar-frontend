import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Title from "./Title";
import { Button, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function AddMoviesDash() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <React.Fragment>
      <Title>Add new movie</Title>
      <form className={classes.root} noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xm={12} md={4}>
            <TextField id="standard-basic" label="Name" />
          </Grid>
          <Grid item xm={12} md={4}>
            <TextField id="standard-basic" label="Resume" />
          </Grid>
          <Grid item xm={12} md={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
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
              value={age}
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </Grid>
          <Grid item xm={12} md={4}>
            <TextField id="standard-basic" label="Image" />
          </Grid>
          <Grid item xm={12} md={4}>
            <Button variant="contained" color="primary">
              Add Movie
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
