import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import React, { Fragment } from 'react';
import {
  Paper,
  List,
  Divider,
  makeStyles,
} from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import { orderBy } from 'lodash';
import NewsCard from '../components/NewsCard';

const useStyles = makeStyles(theme => ({
  newsBox: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(2),
    },
  },
  newsList: {
    maxWidth: 800,
    padding: theme.spacing(2),
  },
  newsLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
  listDivider: {
    maxWidth: 800,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
}));

function NewsList ({ news }) {

  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <Layout title="Notícias">
        <Paper elevation={1} className={classes.newsBox}>
          <List className={classes.newsList}>
            {orderBy(news, ['updatedAt', 'title'], ['desc', 'asc']).map(item => (
              <div key={item.id}>
                <NewsCard news={item} />
                <Divider className={classes.listDivider} />
              </div>
            ))}
          </List>
        </Paper>
      </Layout>
    </Fragment>
  );
}

NewsList.getInitialProps = async function() {
  const res = await fetch('http://127.0.0.1:5000/news');
  const data = await res.json();

  return { news: data };
};

export default NewsList;