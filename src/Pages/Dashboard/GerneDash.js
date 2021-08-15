import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";

export default function GenreDash({ genres }) {

  return (
    <React.Fragment>
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
            genres.map((genre) => (
              <TableRow key={genre.id}>
                <TableCell>{genre.name}</TableCell>
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
