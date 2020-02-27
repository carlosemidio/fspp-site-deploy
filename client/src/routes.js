import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from './pages/Login';
import Dashboard from './pages/dashboard/index';
import User from './pages/users/index';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <Switch>
    <PrivateRoute path="/dashboard" component={() => <Dashboard/>} />
    <PrivateRoute path="/usuarios" component={() => <User/>} />

    <Route exact path="/" component={() => <Login/>} />
    <Route path="*" component={() => <h1>Page not found</h1>} />
  </Switch>
);

export default Routes;