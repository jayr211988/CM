import React, { useContext } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { StateProvider  } from "fe-context";
import { LoginLayout, Loader } from "fe-components";

function PublicChecker(props) {
 //  const { from } = props.location.state || { from: { pathname: "/dashboard" } };
  const { from } = { from: { pathname: "/dashboard" } };
  const { profile } = StateProvider.useStateValue();
  const { component: Component, path } = props; 

  if (profile.isFetching) {
    return <Loader />;
  } else if (profile.isAuthenticated) {
    return <Redirect to={from} />;
  } else {
    return <Route
      path={path}
      render={(routeProps) => {
        return (
          <LoginLayout>
            <Component {...routeProps} />
          </LoginLayout>
        );
      }}
    />;
  }
};

export default withRouter(PublicChecker);
