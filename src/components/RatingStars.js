import React, { useContext, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { Button, makeStyles } from "@material-ui/core";
import Swal from "sweetalert2";
import { UserContext } from "../Context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
  },
}));

export default function RatingStars({
  id,
  consultRatings,
  disabled,
  setDisabled,
}) {
  const classes = useStyles();
  const [rating, setRating] = useState();
  const [value, setValue] = useState();
  const { user } = useContext(UserContext);
  const URL = process.env.REACT_APP_API_RATINGS;

  const handleChange = async (e) => {
    setValue(e.target.value);
    const ratingObject = {
      user: user,
      value: e.target.value,
      movie: id,
    };
    // POST
    try {
      const cabecera = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingObject),
      };

      const response = await fetch(URL, cabecera);
      console.log(response);
      if (response.status === 201) {
        Swal.fire("Rating posted", "", "success");
        setDisabled(true);
        consultRatings();
        // Mostrar botón para eliminar puntuación
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "error");
    }
  };

  const deleteMovie = (code) => {
    setDisabled(false);
    // Eliminar rating anterior
    
    // try {
    //   const URL = process.env.REACT_APP_API_MOVIES + "/" + code;
    //   const response = await fetch(URL, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   if (response.status === 200) {
    //     Swal.fire("The movie was removed", "", "success");
    //     // Update list of movies
    //     consultMovies();
    //   }
    // } catch (error) {
    //   console.log(error);
    //   Swal.fire("Error", "", "warning");
    // }
  };

  return (
    <div className={classes.root} component="fieldset">
      {disabled === true ? (
        <Button variant="outlined" onClick={() => deleteMovie(id)}>
          ⭐New Rating
        </Button>
      ) : (
        <Rating
          disabled={disabled}
          name="simple-controlled"
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
}
