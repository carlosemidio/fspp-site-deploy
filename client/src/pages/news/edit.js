import React, {Component} from 'react';
import { useParams } from "react-router-dom";
import {EditorState, convertToRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from '@material-ui/core';
import api from "../../services/api";
import './styles.css';
import PhotoInput from '../../components/PhotoInput';

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


function uploadImageCallBack(file) {
  return new Promise( 
    (resolve, reject) => {
      let config = {
        headers: {
          'Accept': '',
          'Content-Type': 'multipart/form-data'
        }
      };
  
      const formData = new FormData();
      formData.append('image', file);
  
      api.post(`/image`, formData, config).then(res => {
        const data = res.data;
        resolve({ data: { link: ("http://127.0.0.1:5000/uploads/editor/"+data) } });
      })
    }
  );
}


class EditorContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: null,
      image: null,
      editorState: EditorState.createEmpty(),
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
  }

  onChange(e) {
    this.setState({title:e.target.value});
  }

  onChangeImage(e) {
    this.setState({image:e.target.files[0]});

    console.log(this.state.image);
  }

  async onFormSubmit(e) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('content', JSON.stringify(this.state.content));
    formData.append('image', this.state.image);

    const news = await api.post(`/news`, formData, config);

    console.log(news);
  }

  componentDidMount() {
  }

  onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.setState({
      content: convertToRaw(contentState),
      editorState,
    });
  };

  render(){
    const { editorState } = this.state;
    return <div className='editor'>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <TextField label='Título' fullWidth onChange={this.onChange} />
          <Editor
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}    
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { 
                className: undefined,
                component: undefined,
                popupClassName: undefined,
                urlEnabled: true,
                uploadEnabled: true,
                alignmentEnabled: true,
                uploadCallback: uploadImageCallBack,
                previewImage: true,
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                alt: { present: true, mandatory: true },
                defaultSize: {
                  height: 'auto',
                  width: '400px',
                }, 
              },
              fullscreen: true,
            }}
          />

          <PhotoInput label='Foto do card' onChange={this.onChangeImage} />

        </CardContent>
        <CardActions>
          <Button size="small" color="primary" type="button" onClick={this.onFormSubmit}>Save</Button>
          <Button size="small" >Cancel</Button>
        </CardActions>
      </Card>
    </div>
  }
}

export default EditorContainer;