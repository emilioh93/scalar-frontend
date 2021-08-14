import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { Button, makeStyles } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  img: {
    width: "20%",
  },
}));

export default function MoviesDash({ movies }) {
  const classes = useStyles();

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
            movies.map((movie) => (
              <TableRow key={movie.id}>
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
                    <EditIcon></EditIcon>
                  </Button>
                  <Button>
                    <DeleteIcon></DeleteIcon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
