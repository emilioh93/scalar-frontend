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
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "30%",
  },
  headImage:{
    width: "25%",
  }
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
    <div id="listMovies">
      <Title>List of movies</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Raiting</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Genre</TableCell>
            <TableCell align="center" className={classes.headImage}>
              Image
            </TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies &&
            movies.map((movie, i) => (
              <TableRow key={i}>
                <TableCell>{movie.name}</TableCell>
                <TableCell align="center">{movie.raiting}</TableCell>
                <TableCell align="center">
                  {format(new Date(movie.date), "MM/dd/yyyy")}
                </TableCell>
                <TableCell align="center">{movie.genre}</TableCell>
                <TableCell align="center">
                  <img
                    className={classes.img}
                    src={movie.image}
                    alt={movie.name}
                  />
                </TableCell>
                <TableCell align="center">
                  <Button color="primary">
                    <EditMoviesDash
                      movie={movie}
                      genres={genres}
                      setGenres={setGenres}
                      consultMovies={consultMovies}
                    />
                  </Button>
                  <Button color="secondary">
                    <DeleteIcon
                      onClick={() => deleteMovie(movie._id)}
                    ></DeleteIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
