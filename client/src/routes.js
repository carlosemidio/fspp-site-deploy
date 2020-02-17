import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from './pages/login/index';
import LogOut from './pages/logout/index';
import Dashboard from './pages/dashboard/index';
import User from './pages/users/index';
import App from './App';

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
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/dashboard" component={() => <App page={<Dashboard/>}/>} />
      <PrivateRoute path="/usuarios" component={() => <App page={<User/>}/>} />

      <Route exact path="/" component={() => <Login/>} />
      <Route exact path="/logout" component={() => <LogOut/>} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;