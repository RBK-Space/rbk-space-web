import React, { Component } from 'react';
import { Tabs, Input, Button, Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { addPost, getAllPosts } from '../../actions/posts';

import './style.css';
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Dragger } = Upload;

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: null,
      authenticated: false,
      text: '',
      image: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePostTextClick = this.handlePostTextClick.bind(this);
    this.handlePostImageClick = this.handlePostImageClick.bind(this);
  }

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch('http://localhost:4000/auth/login/success', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error('failed to authenticate user');
      })
      .then((responseJson) => {
        console.log(responseJson.user);
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch((error) => {
        this.setState({
          authenticated: false,
          error: 'Failed to authenticate user'
        });
      });
  }

  handlePostTextClick() {
    const { addPost } = this.props;
    addPost({
      postType: '0',
      postBody: this.state.text,
      userId: this.state.user[0].userId
    });
    this.setState({
      text: ''
    });
    const { getAllPosts } = this.props;
    getAllPosts();
  }
  handlePostImageClick() {
    const { addPost } = this.props;
    addPost({
      postType: '1',
      postBody: null,
      userId: this.state.user[0].userId
    });
  }

  handleInputChange(e) {
    const value = e.target.value;
    console.log(value);
    this.setState({
      text: value
    });
  }
  callback(key) {
    console.log(key, typeof key);
  }

  render() {
    const props = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };
    return (
      <div className='tabs-wrapper'>
        <Tabs className='tabs' defaultActiveKey='1' onChange={this.callback}>
          <TabPane className='tab' tab='Add Post' key='1'>
            <TextArea
              value={this.state.text}
              onChange={this.handleInputChange}
            />
            <Button
              type='primary'
              className='post-btn'
              onClick={this.handlePostTextClick.bind(this)}
            >
              Add Post
            </Button>
          </TabPane>
          <TabPane className='tab' tab='Add Image' key='2'>
            <Dragger className='dragger' {...props}>
              <p className='ant-upload-drag-icon'>
                <Icon type='inbox' />
              </p>
              <p className='ant-upload-text'>
                Click or drag file to this area to upload
              </p>
              <p className='ant-upload-hint'>
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
            <Button
              type='primary'
              className='img-btn'
              onClick={this.handlePostImageClick.bind(this)}
            >
              Add Image
            </Button>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  posts: state.allPostsReducer.posts
});

// Actions
const mapDispatchToProps = {
  addPost,
  getAllPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
