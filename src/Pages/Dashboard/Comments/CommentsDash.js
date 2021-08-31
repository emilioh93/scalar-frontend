import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";

export default function CommentsDash({
  comments,
  movies,
  users,
  consultComments,
}) {
  const deleteComment = (code) => {
    Swal.fire({
      title: "Are you sure you want to delete this comment?",
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
          const URL = process.env.REACT_APP_API_COMMENTS + "/" + code;
          const response = await fetch(URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            Swal.fire("The comment was removed", "", "success");
            // Update list of movies
            consultComments();
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Error", "", "warning");
        }
      }
    });
  };

  return (
    <div id="listComments">
      <Title>List of comments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User Email</TableCell>
            <TableCell>Movie</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments &&
            comments.map((comment, i) => (
              <TableRow key={i}>
                <TableCell>
                  {users && users.find((u) => comment.user === u._id).email}
                </TableCell>
                <TableCell>
                  {movies && movies.find((m) => comment.movie === m._id).name}
                </TableCell>
                <TableCell>{comment.text}</TableCell>
                <TableCell>
                  <Button color="secondary">
                    <DeleteIcon
                      onClick={() => deleteComment(comment._id)}
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
