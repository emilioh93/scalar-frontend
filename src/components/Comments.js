import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function Comments({ comments, id }) {
  const classes = useStyles();
  const arrayFiltered =
    comments && comments.filter((comment) => comment.movie === id);
  return (
    <List className={classes.root}>
      {arrayFiltered &&
        arrayFiltered.map((comment, i) => {
          return (
            <ListItem key={i} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={comment.userName}
                  src="/static/images/avatar/1.jpg"
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${comment.userName} ${comment.userLast}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    ></Typography>
                    {comment.text}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
    </List>
  );
}
