import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import { Button, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";
import EditMoviesDash from "./EditMoviesDash";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "20%",
  },
}));

export default function MoviesDash({
  consultMovies,
  movies,
  genres,
  setGenres,
}) {
  const classes = useStyles();

  const deleteMovie = (code) => {
    Swal.fire({
      title: "Are you sure you want to delete the movie?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // DELETE
        try {
          const URL = process.env.REACT_APP_API_MOVIES + "/" + code;
          const response = await fetch(URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            Swal.fire("The movie was removed", "", "success");
            // Update list of movies
            consultMovies();
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "", "warning");
        }
      }
    });
  };

  return (
    <React.Fragment>
      <Title>List of movies</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Raiting</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies &&
            movies.map((movie, i) => (
              <TableRow key={i}>
                <TableCell>{movie.name}</TableCell>
                <TableCell>{movie.raiting}</TableCell>
                <TableCell>{movie.date}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>
                  <img
                    className={classes.img}
                    src={movie.image}
                    alt={movie.name}
                  />
                </TableCell>
                <TableCell>
                  <Button>
                    <EditMoviesDash
                      movie={movie}
                      genres={genres}
                      setGenres={setGenres}
                      consultMovies={consultMovies}
                    />
                  </Button>
                  <Button>
                    <DeleteIcon
                      onClick={() => deleteMovie(movie._id)}
                    ></DeleteIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
