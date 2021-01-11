import { makeStyles } from "@material-ui/core";
import SideNav from "./SideNav";
import LoginForm from "./LoginForm";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#64b5f6"
  },
  container: {
    marginLeft: "30%",
    padding: "15%",
    paddingTop: "7%",
    paddingBottom: "0"
  }
}));

export default function Login() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <SideNav />
      <div className={classes.container}>
        <LoginForm />
      </div>
    </React.Fragment>
  );
}
