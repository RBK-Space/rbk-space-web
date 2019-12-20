import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
const key = 'updatable';

export class Tab2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      user: null,
      cohorts: null,
      cohortNo: null,
      skills: null,
      empStatus: null,
      skillId: []
    };
  }
  getData = (props) => {
    console.log(props);
    const id = props.id;
    axios(`/api/user/${id}`).then((result) => {
      console.log(result.data[0]);
      this.setState({
        user: result.data[0]
      });
    });
  };
  componentDidMount() {
    this.getData(this.props);
  }

  handleSubmitLinks = (e) => {
    e.preventDefault();
    var that = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        this.openMessage();
        axios
          .post('/api/user/edit/contact', {
            userId: that.state.user.userId,
            facebook: values.facebook,
            github: values.github,
            twitter: values.twitter,
            linkedin: values.linkedin
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    });
  };
  openMessage() {
    message.loading({ content: 'Updating...', key });
    setTimeout(() => {
      message.success({ content: 'Updated!', key, duration: 3 });
    }, 1500);
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <>
        {this.state.user ? (
          <Form {...formItemLayout} onSubmit={this.handleSubmitLinks}>
            <Form.Item label={<span>GitHub account&nbsp;</span>}>
              {getFieldDecorator('github', {
                initialValue: this.state.user.gh,
                rules: [
                  {
                    required: true,
                    message: 'Please input your GitHub!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label={<span>Facebook&nbsp;</span>}>
              {getFieldDecorator('facebook', {
                initialValue: this.state.user.fb,
                rules: [
                  {
                    message: 'Please input your Facebook!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label={<span>LinkedIn&nbsp;</span>}>
              {getFieldDecorator('linkedin', {
                initialValue: this.state.user.li,
                rules: [
                  {
                    message: 'Please input your LinkedIn!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label={<span>Twitter&nbsp;</span>}>
              {getFieldDecorator('twitter', {
                initialValue: this.state.user.tw,
                rules: [
                  {
                    message: 'Please input your Twitter!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType='submit'>
                Update
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </>
    );
  }
}

const SocialLinks = Form.create({ name: 'basicInfo' })(Tab2);
export default SocialLinks;
