import React, { useContext, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core";
import Swal from "sweetalert2";
import { UserContext } from "../Context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
  },
}));

export default function RatingStars({ id, consultRatings }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [rating, setRating] = useState();
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
        consultRatings();
        // Mostrar botón para eliminar puntuación
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "error");
    }
  };

  return (
    <div className={classes.root} component="fieldset">
      <Rating name="simple-controlled" value={value} onChange={handleChange} />
    </div>
  );
}
