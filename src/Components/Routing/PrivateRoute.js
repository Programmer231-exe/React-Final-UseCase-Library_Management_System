import { Route, Redirect } from "react-router-dom";
import React from "react";
export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  console.log(authenticated);
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}
