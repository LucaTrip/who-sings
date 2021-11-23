import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { GlobalContext } from "../context/GlobalContext";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const context = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return context.state.currentUserName ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
