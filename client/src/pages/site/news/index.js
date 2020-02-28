import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  withStyles,
  Typography,
  Fab,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import { orderBy } from 'lodash';
import { compose } from 'recompose';
import moment from 'moment';

import api from "../../../services/api";

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
});

class NewsList extends Component {
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
                    <Avatar alt={news.title} src={news.image && ('http://localhost:5000/uploads/news/'+news.image)} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={news.title}
                    secondary={news.updatedAt && `Updated ${moment(news.updatedAt).fromNow()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ) : (
          !this.state.loading && <Typography variant="subtitle1">No news to display</Typography>
        )}
      </Fragment>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles),
)(NewsList);