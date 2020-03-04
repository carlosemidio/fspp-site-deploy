import React, {Component} from 'react'
import {EditorState, convertToRaw, convertFromRaw} from "draft-js"
import dynamic from 'next/dynamic'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from '@material-ui/core'
import api from "../../../services/api"
import PhotoInput from '../../../components/PhotoInput'
import Layout from '../../../components/Layout'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withAuthSync } from '../../../services/auth'

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
})


function uploadImageCallBack(file) {
  return new Promise( 
    (resolve, reject) => {
      let config = {
        headers: {
          'Accept': '',
          'Content-Type': 'multipart/form-data'
        }
      }
  
      const formData = new FormData()
      formData.append('image', file)
  
      api.post(`/image`, formData, config).then(res => {
        const data = res.data
        resolve({ data: { link: ("http://127.0.0.1:5000/uploads/editor/"+data) } })
      })
    }
  )
}


class EditorContainer extends Component{
  static getInitialProps = ({ query }) => {
    return {
      newId: query.id
    }
  }

  constructor(props){
    super(props)
    this.state = {
      title: '',
      content: null,
      image: null,
      loading: true,
      error: null,
      editorState: null,
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
  }

  onChange(e) {
    this.setState({title:e.target.value})
  }

  onChangeImage(e) {
    this.setState({image:e.target.files[0]})
  }

  async onFormSubmit(e) {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    const formData = new FormData()
    formData.append('title', this.state.title)
    formData.append('content', JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())))
    if (this.state.image !== null) {
      formData.append('image', this.state.image)
    }

    const id = this.props.newId

    if (id === 'new') {
      api.post(`/news`, formData, config).then(res => {
        const news = res.data
      }).catch(err => {
        console.log(err)
      })
    } else {
      api.put(`/news/${id}`, formData, config).then(res => {
        const news = res.data
      }).catch(err => {
        console.log(err)
      })
    }
  }

  async getNews(id) {
    api.get(`/news/${id}`)
    .then(res => {
      const news = res.data
      if (news) {
        this.setState({ loading: false, 
          title: news.title, 
          image: news.image,
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(news.content)))
        })
      } else {
        this.setState({ loading: false, 
          editorState: EditorState.createEmpty()
        })
      }
    })
  }

  componentDidMount() {
    const id = this.props.newId
    if (id !== 'new') {
      this.getNews(id)
    } else {
      this.setState({ 
        editorState: EditorState.createEmpty()
      })
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    })
  }

  render(){
    return (
      <>
        <CssBaseline />
        <Layout>
          <div className='editor'>
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <TextField label='Título' fullWidth onChange={this.onChange} value={this.state.title} />
                <Editor
                  editorState={this.state.editorState}
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

                <PhotoInput label='Foto do card' onChange={this.onChangeImage} value={this.state.image} />

              </CardContent>
              <CardActions>
                <Button size="small" color="primary" type="button" onClick={this.onFormSubmit}>Save</Button>
                <Button size="small" >Cancel</Button>
              </CardActions>
            </Card>
          </div>
        </Layout>
      </>
    )
  }
}

export default withAuthSync(EditorContainer)