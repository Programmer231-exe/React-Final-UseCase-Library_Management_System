import { TextField, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    margin: theme.spacing(1)
  }
}));

export default function Input(props) {
  const classes = useStyles();
  const {
    variant = "primary",
    label = "input",
    name,
    value = "This is default value",
    onChange,
    error = null,
    ...others
  } = props;

  return (
    <TextField
      className={classes.root}
      variant={variant}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...error && { error: true, helperText: error }}
      {...others}
    />
  );
}
