import React, { useState } from "react";
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
import Alert from "@material-ui/lab/Alert";
import { Container } from "@material-ui/core";
import Swal from "sweetalert2";

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

export default function EditGenreDash({ genre, consultGenres, setGenres }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(genre.name);
  const [error, setError] = useState(false);
  const URL = process.env.REACT_APP_API_GENRES;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validations
    if (name.trim() !== "") {
      setError(false);
      // POST
      try {
        // Create object
        const genreModified = {
          name,
        };
        // Request
        const response = await fetch(`${URL}/${genre._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(genreModified),
        });

        // Alert
        if (response.status === 200) {
          Swal.fire("Genre edited", "", "success");
          // Form reset
          e.target.reset();
          // Update
          consultGenres();
          // Close window
          handleClose();
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
    <div>
      <div type="button" onClick={handleOpen}>
        <EditIcon></EditIcon>
      </div>
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
              <Title>Edit Genre</Title>
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xm={12} md={4}>
                    <Button type="submit" variant="contained" color="primary">
                      Edit Genre
                    </Button>
                  </Grid>
                </Grid>
                {error === true ? (
                  <Alert severity="error">Something went wrong!</Alert>
                ) : null}
              </form>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
