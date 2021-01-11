import React from "react";
import { Button as MuiButton, IconButton } from "@material-ui/core";
export default function Button(props) {
  const {
    variant = "contained",
    color = "primary",
    size = "large",
    StartIcon = <></>,
    endIcon = <></>,
    ...others
  } = props;
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      startIcon={<StartIcon />}
      endIcon={null}
      {...others}
    >
      {props.children}
    </MuiButton>
  );
}
