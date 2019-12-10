import React, { Component } from 'react';
import { Tabs, Input, Button, Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { addPost } from './../../actions/posts';
import './style.css';
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Dragger } = Upload;

interface IPostProps {
  posts?: any;
  addPost?: any;
}
class AddPost extends Component<IPostProps> {
  callback(key: any) {
    // console.log(key);
  }

  handleClick() {
    const { addPost } = this.props;
    addPost({ postType: '0', postBody: 'Heeeeey?', userId: 1 });
  }

  render() {
    const props = {
      name: 'file',
      multiple: true,
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange(info: { file: { status?: any; name?: any }; fileList: any }) {
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
            <TextArea />
            <Button
              type='primary'
              className='post-btn'
              onClick={this.handleClick.bind(this)}
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
            <Button type='primary' className='img-btn'>
              Add Image
            </Button>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  posts: state.allPostsReducer.posts
});

// Actions
const mapDispatchToProps = {
  addPost
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
