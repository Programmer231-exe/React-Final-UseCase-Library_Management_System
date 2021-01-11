import React from "react";
const {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  Grid,
  ListItemAvatar,
  Avatar,
  DialogActions,
  Button,
  makeStyles,
  ListItem,
  ListItemText
} = require("@material-ui/core");

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});
const BookDescription = props => {
  const classes = useStyles();
  const { opendescription, description, setOpenDescription } = props;

  return (
    <Dialog
      open={opendescription}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
    >
      <DialogTitle id="Book Description">{"Book Description"}</DialogTitle>
      <DialogContent>
        <List>
          <Grid container>
            <Grid item>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>ID</Avatar>
                </ListItemAvatar>
                <ListItemText primary={description.id} secondary="id" />
              </ListItem>
            </Grid>
            <Grid item>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>A</Avatar>
                </ListItemAvatar>
                <ListItemText primary={description.author} secondary="author" />
              </ListItem>
            </Grid>
            <Grid item sm={12} xs={12}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>T</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={description.booktitle}
                  secondary="title"
                />
              </ListItem>
            </Grid>
            <Grid item sm={12} xs={12}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>D</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={description.description}
                  secondary="description"
                />
              </ListItem>
            </Grid>
            <Grid item sm={12} xs={12}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>P</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={description.publisher}
                  secondary="publisher"
                />
              </ListItem>
            </Grid>
            <Grid item sm={6} xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>H</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${description.hardcover} pages`}
                  secondary="pages"
                />
              </ListItem>
            </Grid>
            <Grid item sm={6} xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>C</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${description.category}`}
                  secondary="category"
                />
              </ListItem>
            </Grid>
          </Grid>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDescription(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookDescription;
