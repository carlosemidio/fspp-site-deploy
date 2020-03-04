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
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons'
import { orderBy } from 'lodash'
import { compose } from 'recompose'
import moment from 'moment'

import ErrorSnackbar from '../../components/ErrorSnackbar'
import api from "../../services/api"

const styles = theme => ({
  news: {
    marginTop: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
})

class News extends Component {
  state = {
    loading: true,
    news: [],
    error: null,
  }

  componentDidMount() {
    this.getNews()
  }

  async getNews() {
    api.get(`/news`)
    .then(res => {
      const news = res.data
      this.setState({ loading: false, news: news || [] })
    })
  }

  async deleteNews(news) {
    if (window.confirm(`Você tem certeza que deseja deletar "${news.title}"`)) {
      await api.delete(`/news/${news.id}`)

      this.getNews()
    }
  }

  render() {

    const { classes } = this.props

    return (
      <>
        <CssBaseline />
        <Layout>
          <Fragment>
          {this.state.news.length > 0 ? (
                <Paper elevation={1} className={classes.news}>
                  <List>
                    {orderBy(this.state.news, ['updatedAt', 'title'], ['desc', 'asc']).map(news => (
                      // <NewsItem news={news} onDelete={this.deleteNews} key={news.id}/>
                      <>
                        <Link as={`/admin/noticia/${news.id}`} href={{pathname: '/admin/noticia', query: {id: news.id}}}>
                          <ListItem key={news.id} button>
                            <ListItemAvatar>
                              <Avatar alt={news.title} src={news.image && ('http://localhost:5000/uploads/news/'+news.image)} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={news.title}
                              secondary={news.updatedAt && `Updated ${moment(news.updatedAt).fromNow()}`}
                            />
                            <ListItemSecondaryAction>
                              <IconButton onClick={() => this.deleteNews(news)} color="inherit">
                                <DeleteIcon />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        </Link>
                      </>
                    ))}
                  </List>
                </Paper>
              ) : (
                !this.state.loading && <Typography variant="subtitle1">No news to display</Typography>
              )}
              <Link as={'/admin/noticia/new'} href={{pathname: '/admin/noticia', query: {id: 'new'}}}>
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
)(News)