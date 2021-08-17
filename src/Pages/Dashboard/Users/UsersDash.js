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

export default function UsersDash({ users, consultUsers }) {
  const deleteUser = (code) => {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
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
          const URL = process.env.REACT_APP_API_USERS + "/" + code;
          const response = await fetch(URL, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 200) {
            Swal.fire("The USER was removed", "", "success");
            // Update list of movies
            consultUsers();
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
      <Title>List of users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button>
                    <DeleteIcon
                      onClick={() => deleteUser(user._id)}
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
