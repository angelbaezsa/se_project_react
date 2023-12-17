import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};
