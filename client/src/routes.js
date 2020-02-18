import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from './pages/login/index';
import LogOut from './pages/logout/index';
import Dashboard from './pages/dashboard/index';
import User from './pages/users/index';
import News from './pages/news/index';
import File from './pages/files/index';
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
      <PrivateRoute path="/usuarios/:id" component={() => <App page={<User/>}/>} />
      <PrivateRoute path="/noticias" component={() => <App page={<News/>}/>} />
      <PrivateRoute path="/noticias/:id" component={() => <App page={<News/>}/>} />
      <PrivateRoute path="/arquivos" component={() => <App page={<File/>}/>} />

      <Route exact path="/" component={() => <Login/>} />
      <Route exact path="/logout" component={() => <LogOut/>} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;