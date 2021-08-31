import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import MovieIcon from "@material-ui/icons/Movie";
import AddIcon from "@material-ui/icons/Add";
import TheatersIcon from "@material-ui/icons/Theaters";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { HashLink as Link } from "react-router-hash-link";
import "./listItems.css";

export const mainListItems = (
  <div>
    <Link to="#listMovies" className="links">
      <ListItem>
        <ListItemIcon>
          <MovieIcon />
        </ListItemIcon>
        <ListItemText primary="Movies" />
      </ListItem>
    </Link>
    <Link to="#addMovie" className="links">
      <ListItem>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Movie" />
      </ListItem>
    </Link>
    <Link to="#listGenres" className="links">
      <ListItem>
        <ListItemIcon>
          <TheatersIcon />
        </ListItemIcon>
        <ListItemText primary="Genres" />
      </ListItem>
    </Link>
    <Link to="#addGenre" className="links">
      <ListItem>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Genre" />
      </ListItem>
    </Link>
    <Link to="#listUsers" className="links">
      <ListItem>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
    </Link>
    <Link to="#listComments" className="links">
      <ListItem>
        <ListItemIcon>
          <ChatBubbleIcon />
        </ListItemIcon>
        <ListItemText primary="Comments" />
      </ListItem>
    </Link>
  </div>
);
