import EmailIcon from "@material-ui/icons/Email";
import HomeIcon from "@material-ui/icons/Home";
import CallIcon from "@material-ui/icons/Call";
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
const UserDescription = props => {
  const classes = useStyles();
  const { opendescription, description, setOpenDescription } = props;

  return (
    <Dialog
      open={opendescription}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
    >
      <DialogTitle id="User Description">User Details</DialogTitle>
      <DialogContent>
        <List>
          <Grid container>
            <Grid item sm={12} xs={12}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>ID</Avatar>
                </ListItemAvatar>
                <ListItemText primary={description.id} secondary="ID" />
              </ListItem>
            </Grid>
            <Grid item sm={5} xs={12}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {description.firstname ? description.firstname[0] : "N"}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${description.firstname} ${description.lastname}`}
                  secondary="Full Name"
                />
              </ListItem>
            </Grid>
            <Grid item sm={6} xs={12}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <EmailIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={description.email} secondary="email" />
              </ListItem>
            </Grid>
            <Grid item sm={5} xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CallIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={description.contactno}
                  secondary="Contact No."
                />
              </ListItem>
            </Grid>
            <Grid item sm={6} xs={6}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <HomeIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Door No : ${description.door_no},Street : ${
                    description.address_line1
                  },
                ${description.address_line2},
                City : ${description.city}`}
                  secondary="address"
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

export default UserDescription;
