import React from "react";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

const useStyles = makeStyles(theme => ({
  sideNav: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "30%",
    height: "100%",
    backgroundColor: "#253053",
    verticalAlign: "center",
    textAlign: "center"
  },
  banner: {
    marginTop: "50%",
    color: "#ffffff"
  },
  logo: {
    fontSize: "100px",
    color: "#ffea00"
  }
}));

export default function SideNav() {
  const classes = useStyles();
  return (
    <div className={classes.sideNav}>
      <div className={classes.banner}>
        <IconButton>
          <ImportContactsIcon className={classes.logo} />
        </IconButton>
        <Typography variant="subtitle1" component="h2">
          Welcome to Library
        </Typography>
      </div>
    </div>
  );
}
