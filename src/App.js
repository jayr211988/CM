import React, { Suspense, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import PublicChecker from "fe-containers/Public/PublicChecker";

import PrivateRoute from "fe-containers/Private/PrivateRoute";

import { Loader } from "./components";
import { Page404 } from "./components/ErrorPages";
import ErrorBoundary from "./components/ErrorBoundary";

const AsyncLogin = lazy(() => import("fe-containers/Public/Login"));
const AsyncForgotPassword = lazy(() => import("fe-containers/Public/ForgotPassword"));
const AsyncChangePassword = lazy(() => import("fe-containers/Public/ChangePassword"));

const Profile = lazy(() => import("fe-containers/Private/Profile"));
const Dashboard = lazy(()=> import("fe-containers/Private/Dashboard"));
const Workforce = lazy(() => import("fe-containers/Private/Workforce"));

export default function App() {
  return (
    <ErrorBoundary>
      <Switch>
        <Redirect exact from="/" to="/login" />

        <PublicChecker exact path="/login" component={ Wrapper(AsyncLogin) } />
        <PublicChecker exact path="/change-password" component={ Wrapper(AsyncChangePassword) } />
        <PublicChecker exact path="/forgot-password" component={ Wrapper(AsyncForgotPassword) } />

        <PrivateRoute path="/profile" component={ Wrapper(Profile) } />
        <PrivateRoute path="/dashboard" component={ Wrapper(Dashboard) } />
        <PrivateRoute path="/audit-trail" component={ Wrapper(Workforce) } />
        
        <Route exact path="/404" component={Wrapper(Page404)} />
        <Route component={Wrapper(Page404)} />
      </Switch>
    </ErrorBoundary>
  );
}

function Wrapper(Component) {
  return props => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
}
