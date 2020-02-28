import React, { Component } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import convert from 'htmr';
import {
  Card,
  CardContent,
} from '@material-ui/core';
import api from "../../../services/api";

const styles = theme => ({
  card: {
    backgroundColor: '#F2F2F2',
    width: '90%',
    height: '90%',
    maxWidth: 500,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
});

class EditorContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      news: null,
      loading: true,
      error: null,
    };
  }

  async getNews(id) {
    api.get(`/news/${id}`)
    .then(res => {
      const news = res.data;
      this.setState({ loading: false, 
        news,
      });
    })
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    
    this.getNews(id);
  }

  render(){
    const editorState = (this.state.news !== null) ? EditorState.createWithContent(convertFromRaw(JSON.parse(this.state.news.content))) : null;

    return <div className='editor'>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
        <h1>{this.state.news && this.state.news.title}</h1>
        {editorState && convert(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
        </CardContent>
      </Card>
    </div>
  }
}

export default EditorContainer;