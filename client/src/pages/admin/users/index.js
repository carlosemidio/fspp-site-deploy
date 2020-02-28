import React, { Component, Fragment } from 'react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import {
  withStyles,
  Typography,
  Fab,
  Paper,
  List,
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';
import moment from 'moment';

import UserEditor from '../../../components/UserEditor';
import ErrorSnackbar from '../../../components/ErrorSnackbar';
import api from "../../../services/api";

const styles = theme => ({
  users: {
    marginTop: theme.spacing(2),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
});

class UsersManager extends Component {
  state = {
    loading: true,
    users: [],
    error: null,
  };

  componentDidMount() {
    this.getUsers();
  }


  async getUsers() {
    api.get(`/users`)
    .then(res => {
      const users = res.data;
      this.setState({ loading: false, users: users || [] });
    })
  }

  saveUser = async (user) => {
    if (user.id) {
      await api.put(`/users/${user.id}`, user);
    } else {
      await api.post(`/users`, user);
    }

    this.props.history.goBack();
    this.getUsers();
  }

  async deleteUser(user) {
    if (window.confirm(`Você tem certeza que deseja deletar "${user.email}"`)) {
      await api.delete(`/users/${user.id}`);
      this.getUsers();
    }
  }

  renderUserEditor = ({ match: { params: { id } } }) => {
    if (this.state.loading) return null;
    const user = find(this.state.users, { id: Number(id) });

    if (!user && id !== 'new') return <Redirect to="/usuarios" />;

    return <UserEditor user={user} onSave={this.saveUser} />;
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {/* <Typography variant="h4">Users Manager</Typography> */}
        {this.state.users.length > 0 ? (
          <Paper elevation={1} className={classes.users}>
            <List>
              {orderBy(this.state.users, ['updatedAt', 'name'], ['desc', 'asc']).map(user => (
                <ListItem key={user.id} button component={Link} to={`/usuarios/${user.id}`}>
                  <ListItemText
                    primary={user.name}
                    secondary={user.updatedAt && `Updated ${moment(user.updatedAt).fromNow()}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => this.deleteUser(user)} color="inherit">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          !this.state.loading && <Typography variant="subtitle1">No users to display</Typography>
        )}
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/usuarios/new"
        >
          <AddIcon />
        </Fab>
        <Route exact path="/usuarios/:id" render={this.renderUserEditor} />
        {this.state.error && (
          <ErrorSnackbar
            onClose={() => this.setState({ error: null })}
            message={this.state.error.message}
          />
        )}
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(UsersManager);
