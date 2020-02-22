import React, {Component} from 'react';
import {EditorState, convertToRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg"
import api from "../services/api";


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
      value: 'testtw2',
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    
    this.setState({
      editorState,
    });
  };

  render(){
    const { editorState } = this.state;
    return <div className='editor'>
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
        }}
      />
    </div>
  }
}

export default EditorContainer;