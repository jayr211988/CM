import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { StateProvider } from "fe-context";
import { Loader, DashboardLayout } from "fe-components";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { profile } = StateProvider.useStateValue();
  if (profile.isFetching) {
    return <Loader />;
  } else {
    return (<Route {...rest} render={(props) => {
      return (
        profile.isAuthenticated
          ? <DashboardLayout profile={profile}>
            <Component {...props} />
          </DashboardLayout>
          : <Redirect to={{
            pathname: "/login",
            state: { from: props.location.pathname }
          }} />
      );
    }} />);
  }
};
