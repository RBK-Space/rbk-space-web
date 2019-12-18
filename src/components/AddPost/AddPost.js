import React, { Component } from 'react';
import { Tabs, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { addPost, getAllPosts } from '../../actions/posts';
import ImageUploader from 'react-images-upload';
import './style.css';
import axios from 'axios';

const { TextArea } = Input;
const { TabPane } = Tabs;

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: null,
      authenticated: false,
      text: '',
      pictures: [],
      key: 0
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePostTextClick = this.handlePostTextClick.bind(this);
    this.handlePostImageClick = this.handlePostImageClick.bind(this);
  }

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch('https://rbk-space.herokuapp.com/auth/login/success', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error('failed to authenticate user');
      })
      .then(responseJson => {
        console.log(responseJson.user);
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch(error => {
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

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles)
    });
  }

  handlePostImageClick() {
    var that = this;
    //generate a promise for every image upload
    let uploadPhotosPromises = this.state.pictures.map(image => {
      let data = new FormData();
      data.append('image', image, image.name);
      data.append('user', that.state.user[0].userId);
      //the key here is a dummy prop, used for purpose of re-render the component
      that.setState({ pictures: [], key: Math.random() });
      return axios.post('https://rbk-space.herokuapp.com/uploadImage', data);
    });
    axios
      .all(uploadPhotosPromises)
      .then(function(values) {})
      .catch(err => console.log(err));
  }
  handleInputChange(e) {
    const value = e.target.value;
    this.setState({
      text: value
    });
  }
  callback(key) {
    console.log(key, typeof key);
  }

  render() {
    //success message, shown when the upload success
    const success = () => {
      message.success('Uploaded Successfuly!');
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
            <ImageUploader
              withIcon={true}
              buttonText='Choose images'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.png', '.gif']}
              maxFileSize={5242880}
              withPreview={true}
              key={this.state.key}
            />
            {this.state.pictures && this.state.pictures.length > 0 ? (
              <Button
                type='primary'
                className='post-btn'
                onClick={() => {
                  this.handlePostImageClick();
                  success();
                }}
              >
                Upload
              </Button>
            ) : null}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  posts: state.allPostsReducer.posts
});

// Actions
const mapDispatchToProps = {
  addPost,
  getAllPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
