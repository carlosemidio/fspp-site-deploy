import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";
import Login from './pages/Login';
import Dashboard from './pages/admin/dashboard/index';
import User from './pages/admin/users/index';
import News from './pages/admin/news/index';
import NewsItem from './pages/admin/news/edit';
import NewsList from './pages/site/news/index';
import NewsView from './pages/site/news/view';

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
    <PrivateRoute path="/admin/dashboard" component={Dashboard} />
    <PrivateRoute path="/admin/usuarios" component={User} />
    <PrivateRoute path="/admin/noticias" component={News} />
    <PrivateRoute path="/admin/noticia/:id" component={NewsItem} />

    <Route exact path="/" component={Login} />
    <Route exact path="/noticias" component={NewsList} />
    <Route exact path="/noticia/:id" component={NewsView} />
    <Route path="*" component={() => <h1>Page not found</h1>} />
  </Switch>
);

export default Routes;