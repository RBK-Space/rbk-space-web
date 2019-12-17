import React, { Component } from 'react';
import { Form, Input, Tooltip, Avatar, Icon, Select, Button } from 'antd';
import axios from 'axios';
const { Option } = Select;

export class Tab1 extends Component {
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
    axios(`http://localhost:4000/cohorts`).then((result) => {
      console.log(result.data[0]);
      this.setState({
        cohorts: result.data[0]
      });
    });

    axios(`http://localhost:4000/user/${id}`).then((result) => {
      console.log(result.data[0]);
      this.setState({
        user: result.data[0]
      });
    });

    axios(`http://localhost:4000/skills`).then((result) => {
      console.log(result.data[0]);
      this.setState({
        skills: result.data[0]
      });
    });

    axios(`http://localhost:4000/empStatus`).then((result) => {
      console.log(result.data[0]);
      this.setState({
        empStatus: result.data[0]
      });
    });
  };

  componentDidMount() {
    this.getData(this.props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var that = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.imgUrl = this.state.user.image;
        values.userId = this.state.user.userId;
        console.log('Received values of form: ', values);
        axios
          .post('http://localhost:4000/user/edit/basic', values)
          .then(function(response) {
            console.log(that.state.skillId[that.state.skillId.length - 1]);
            axios
              .post('http://localhost:4000/user/edit/skill', {
                userId: that.state.user.userId,
                skillId: that.state.skillId[that.state.skillId.length - 1]
              })
              .then(function(response) {
                console.log(response);
              })
              .catch(function(error) {
                console.log(error);
              });
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    });
    console.log(this.state.skillId);
  };

  handleCohortChange(value) {
    console.log(`selected ${value}`);
  }

  handleSkillsChange(value) {
    this.setState({
      skillId: [...this.state.skillId, value]
    });
    console.log(this.state.skillId);
  }
  handleEmpStatusChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { TextArea } = Input;

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
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
              label={
                <span>
                  Full Name&nbsp;
                  <Tooltip title='This will be used in the website'>
                    <Icon type='question-circle-o' />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('fullName', {
                initialValue: this.state.user.fullName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Full Name!',
                    whitespace: true
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label={<span>Cohort&nbsp;</span>}>
              {getFieldDecorator('cohortId', {
                initialValue: this.state.user.cohort,
                rules: [
                  {
                    required: true,
                    message: 'Please input your cohort number!'
                  }
                ]
              })(
                <Select
                  onChange={this.handleCohortChange.bind(this)}
                  style={{ width: 180 }}
                >
                  {this.state.cohorts
                    ? this.state.cohorts.map((cohort, index) => (
                        <Option value={cohort.cohortId} key={index}>
                          {cohort.cohortName}
                        </Option>
                      ))
                    : null}
                </Select>
              )}
            </Form.Item>
            <Form.Item label={<span>Image&nbsp;</span>}>
              {getFieldDecorator('imgUrl', {
                rules: [
                  {
                    message: 'Please input your Full Name!',
                    whitespace: true
                  }
                ]
              })(
                <>
                  <Avatar
                    src={this.state.user.image}
                    shape='square'
                    size={64}
                  />
                  <Button>Upload Image</Button>
                </>
              )}
            </Form.Item>
            <Form.Item label={<span>Bio&nbsp;</span>}>
              {getFieldDecorator('bio', {
                initialValue: this.state.user.bio,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Bio!',
                    whitespace: true
                  }
                ]
              })(<TextArea placeholder='Write your Bio here!' />)}
            </Form.Item>

            <Form.Item label='Skills'>
              {getFieldDecorator('skills', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your skills!'
                  }
                ]
              })(
                <Select
                  mode='tags'
                  style={{ width: '100%' }}
                  placeholder='select your skills'
                  onChange={this.handleSkillsChange.bind(this)}
                >
                  {this.state.skills
                    ? this.state.skills.map((skill, index) => (
                        <Option value={skill.skillId + ''} key={index}>
                          {skill.skillName}
                        </Option>
                      ))
                    : null}
                </Select>
              )}
            </Form.Item>
            <Form.Item label={<span>Employment Status&nbsp;</span>}>
              {getFieldDecorator('empStatus', {
                initialValue: this.state.user.empStat,
                rules: [
                  {
                    required: true,
                    message: 'Please input your employment status !'
                  }
                ]
              })(
                <Select
                  onChange={this.handleEmpStatusChange}
                  style={{ width: 200 }}
                >
                  {this.state.empStatus
                    ? this.state.empStatus.map((status, index) => (
                        <Option value={status.empId} key={index}>
                          {status.empStatus}
                        </Option>
                      ))
                    : null}
                </Select>
              )}
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

const BasicInfoForm = Form.create({ name: 'basicInfo' })(Tab1);
export default BasicInfoForm;
