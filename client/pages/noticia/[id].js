import React from 'react';
import fetch from 'isomorphic-unfetch';
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import convert from 'htmr';
import {
  Card,
  CardContent,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Layout from '../../components/Layout';
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: 'none',
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
    },
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
}));

const EditorContainer = props => {
  const editorState = (props.news !== null) ? EditorState.createWithContent(convertFromRaw(JSON.parse(props.news.content))) : null;
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Layout>
        <div className='editor'>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
            <h1>{props.news && props.news.title}</h1>
            {editorState && convert(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
}

EditorContainer.getInitialProps = async ({ query }) => {
  const res = await fetch(`http://127.0.0.1:5000/news/${query.id}`);
  const data = await res.json();

  return { news: data };
};

export default withStyles(useStyles)(EditorContainer);