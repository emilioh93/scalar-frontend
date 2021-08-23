import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import Swal from "sweetalert2";
import EditGenreDash from "./EditGenreDash";

export default function GenreDash({ genres, consultGenres, setGenres }) {
  const deleteMovie = (code) => {
    Swal.fire({
      title: "Are you sure you want to delete the genre?",
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
          const URL = process.env.REACT_APP_API_GENRES + "/" + code;
          const response = await fetch(URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            Swal.fire("The genre was removed", "", "success");
            // Update list
            consultGenres();
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "", "warning");
        }
      }
    });
  };

  return (
    <div id="listGenres">
      <Title>List of genres</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {genres &&
            genres.map((genre, i) => (
              <TableRow key={i}>
                <TableCell>{genre.name}</TableCell>
                <TableCell>
                  <Button>
                    <EditGenreDash
                      genre={genre}
                      setGenres={setGenres}
                      consultGenres={consultGenres}
                    />
                  </Button>
                  <Button>
                    <DeleteIcon
                      onClick={() => deleteMovie(genre._id)}
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
