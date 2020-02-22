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
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';
import moment from 'moment';

import ErrorSnackbar from '../../components/ErrorSnackbar';
import api from "../../services/api";

const styles = theme => ({
  news: {
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

class NewsManager extends Component {
  state = {
    loading: true,
    news: [],
    error: null,
  };

  componentDidMount() {
    this.getNews();
  }

  async getNews() {
    api.get(`/news`)
    .then(res => {
      const news = res.data;
      this.setState({ loading: false, news: news || [] });
    })
  }

  async deleteNews(news) {
    if (window.confirm(`Você tem certeza que deseja deletar "${news.title}"`)) {
      await api.delete(`/news/${news.id}`);

      this.getNews();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {/* <Typography variant="h4">Users Manager</Typography> */}
        {this.state.news.length > 0 ? (
          <Paper elevation={1} className={classes.news}>
            <List>
              {orderBy(this.state.news, ['updatedAt', 'title'], ['desc', 'asc']).map(news => (
                // <NewsItem news={news} onDelete={this.deleteNews} key={news.id}/>
                <ListItem key={news.id} button component={Link} to={`/noticia/${news.id}`}>
                  <ListItemAvatar>
                    <Avatar alt={news.title} src={'http://localhost:5000/uploads/news/'+news.image} />
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
              ))}
            </List>
          </Paper>
        ) : (
          !this.state.loading && <Typography variant="subtitle1">No news to display</Typography>
        )}
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          component={Link}
          to="/noticia/new"
        >
          <AddIcon />
        </Fab>
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
)(NewsManager);