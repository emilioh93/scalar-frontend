import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import EditIcon from "@material-ui/icons/Edit";
import { Title } from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
// import Alert from "@material-ui/lab/Alert";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditMoviesDash({ movie, genres, setGenres }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(movie.date);

  console.log(movie.date);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setGenres(event.target.value);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // movie.date = newDate;
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        <EditIcon></EditIcon>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Container>
              <Title>Edit movie</Title>
              <form
                //   onSubmit={handleSubmit}
                className={classes.root}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={3}>
                  <Grid item xm={12} md={4}>
                    <TextField
                      id="standard-basic"
                      label="Name"
                      value={movie.name}
                      // onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xm={12} md={4}>
                    <TextField
                      id="standard-basic"
                      label="Resume"
                      value={movie.resume}
                      // onChange={(e) => setResume(e.target.value)}
                    />
                  </Grid>
                  <Grid item xm={12} md={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
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
                      value={movie.genre}
                      onChange={handleChange}
                    >
                      {genres &&
                        genres.map((genre) => {
                          return (
                            <MenuItem value={genre.name}>{genre.name}</MenuItem>
                          );
                        })}
                    </Select>
                  </Grid>
                  <Grid item xm={12} md={4}>
                    <TextField
                      id="standard-basic"
                      label="Image"
                      value={movie.image}
                      // onChange={(e) => setImage(e.target.value)}
                    />
                  </Grid>
                  <Grid item xm={12} md={4}>
                    <TextField
                      id="standard-basic"
                      label="Rating"
                      type="number"
                      value={movie.raiting}
                      // onChange={(e) => setRaiting(e.target.value)}
                    />
                  </Grid>
                  <Grid item xm={12} md={4}>
                    <Button type="submit" variant="contained" color="primary">
                      Edit Movie
                    </Button>
                  </Grid>
                </Grid>
                {/* {error === true ? (
                  <Alert severity="error">Something went wrong!</Alert>
                ) : null} */}
              </form>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
