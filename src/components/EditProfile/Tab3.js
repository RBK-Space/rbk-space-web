import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
const { TextArea } = Input;
const key = 'updatable';

export class Tab3 extends Component {
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
  getData = props => {
    console.log(props);
    const id = props.id;
    axios(`https://rbk-space.herokuapp.com/user/${id}`).then(result => {
      console.log(result.data[0]);
      this.setState({
        user: result.data[0]
      });
    });
  };

  componentDidMount() {
    this.getData(this.props);
  }
  handleSubmitProjects = e => {
    e.preventDefault();
    var that = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.openMessage();
        console.log(values);
        axios
          .post('https://rbk-space.herokuapp.com/user/edit/portfolio', {
            userId: that.state.user.userId,
            title: values.projectTitle,
            description: values.projectDesc,
            link: values.projectLink
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
    message.loading({ content: 'Adding project...', key });
    setTimeout(() => {
      message.success({ content: 'project added!', key, duration: 3 });
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
          <Form {...formItemLayout} onSubmit={this.handleSubmitProjects}>
            <Form.Item label={<span>projectTitle&nbsp;</span>}>
              {getFieldDecorator('projectTitle', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your projectTitle!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label={<span>projectDesc&nbsp;</span>}>
              {getFieldDecorator('projectDesc', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your projectDesc!',
                    whitespace: true
                  }
                ]
              })(<TextArea rows={5} />)}
            </Form.Item>
            <Form.Item label={<span>projectLink&nbsp;</span>}>
              {getFieldDecorator('projectLink', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your projectLink!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType='submit'>
                Add
              </Button>
              <Button
                onClick={e => {
                  this.props.form.resetFields();
                }}
                className='clear-btn'
              >
                Clear
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </>
    );
  }
}

const Portfolio = Form.create({ name: 'basicInfo' })(Tab3);
export default Portfolio;
