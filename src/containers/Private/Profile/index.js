// LIBRARIES
import React from "react";
import { Switch, Route } from "react-router-dom";

// COMPONENTS
import Update from "./Update";
import View from "./View";
import ChangePassword from "./ChangePassword";
import { Page404 } from "fe-components/ErrorPages";

export default function Profile() {
  return (
    <Switch>
      {/* <Route exact path="/profile/change-password" component={ChangePassword} />
      <Route exact path="/profile/update" component={Update} />
      <Route exact path="/profile" component={View} />
      <Page404 /> */}
    </Switch>
  );
}
