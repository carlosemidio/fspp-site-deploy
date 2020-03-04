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
  Divider
} from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import { orderBy } from 'lodash'
import { compose } from 'recompose'

import ErrorSnackbar from '../../components/ErrorSnackbar'
import NewsCard from '../../components/NewsCard'
import api from "../../services/api"

const styles = theme => ({
  news: {
    margin: theme.spacing(6),
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
    },
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
                    <div key={news.id}>
                      <NewsCard news={news} onDelete={() => this.deleteNews(news)} />
                      <Divider className={classes.divider}/>
                    </div>
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