import React, { Component, Fragment } from 'react'
import { withAuthSync } from '../../services/auth'
import Layout from '../../components/Layout'
import CssBaseline from '@material-ui/core/CssBaseline'
import Link from 'next/link'
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
} from '@material-ui/core'
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons'
import { find, orderBy } from 'lodash'
import { compose } from 'recompose'
import moment from 'moment'

import UserEditor from '../../components/UserEditor'
import ErrorSnackbar from '../../components/ErrorSnackbar'
import api from '../../services/api'

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
})

class UsersList extends Component {
  state = {
    loading: true,
    users: [],
    error: null,
  }

  componentDidMount() {
    this.getUsers()
  }


  async getUsers() {
    api.get(`/users`)
    .then(res => {
      const users = res.data
      this.setState({ loading: false, users: users || [] })
    })
  }

  async deleteUser(user) {
    if (window.confirm(`Você tem certeza que deseja deletar "${user.email}"`)) {
      await api.delete(`/users/${user.id}`)
      this.getUsers()
    }
  }

  render() {
    const { classes } = this.props

    return (
      <>
        <CssBaseline/>
        <Layout title="Usuários">
          <Fragment>
          {/* <Typography variant="h4">Users Manager</Typography> */}
          {this.state.users.length > 0 ? (
            <Paper elevation={1} className={classes.users}>
              <List>
                {orderBy(this.state.users, ['updatedAt', 'name'], ['desc', 'asc']).map(user => (
                  <Link 
                    as={`/admin/usuario/${user.id}`} 
                    href={{pathname: '/admin/usuario', query: {id: user.id}}}
                    key={user.id}>
                    <ListItem button>
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
                  </Link>
                ))}
              </List>
            </Paper>
          ) : (
            !this.state.loading && <Typography variant="subtitle1">No users to display</Typography>
          )}
          <Link as={'/admin/usuario/new'} href={{pathname: '/admin/usuario', query: {id: 'new'}}}>
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fab}
            >
              <AddIcon />
            </Fab>
          </Link>
          {this.state.error && (
            <ErrorSnackbar
              onClose={() => this.setState({ error: null })}
              message={this.state.error.message}
            />
          )}
        </Fragment>
        </Layout>
      </>
    )
  }
}

export default compose(
  withAuthSync,
  withStyles(styles),
)(UsersList)
