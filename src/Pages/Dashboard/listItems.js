import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import MovieIcon from "@material-ui/icons/Movie";
import AddIcon from "@material-ui/icons/Add";
import TheatersIcon from "@material-ui/icons/Theaters";
import { HashLink as Link } from "react-router-hash-link";

export const mainListItems = (
  <div>
    <Link to="#listMovies">
      <ListItem>
        <ListItemIcon>
          <MovieIcon />
        </ListItemIcon>
        <ListItemText primary="Movies" />
      </ListItem>
    </Link>
    <Link to="#addMovie">
      <ListItem>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Movie" />
      </ListItem>
    </Link>
    <Link to="#listGenres">
      <ListItem>
        <ListItemIcon>
          <TheatersIcon />
        </ListItemIcon>
        <ListItemText primary="Genres" />
      </ListItem>
    </Link>
    <Link to="#addGenre">
      <ListItem>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Genre" />
      </ListItem>
    </Link>
    <Link to="#listUsers">
      <ListItem>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
  </div>
);
