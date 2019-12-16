import React from 'react';
import { Tabs } from 'antd';
import './style.css';
import 'antd/dist/antd.css';
import { Form, Input, Tooltip, Avatar, Icon, Select, Button } from 'antd';
import axios from 'axios';
const { TabPane } = Tabs;
const { Option } = Select;

class EditProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      user: null,
      cohorts: null,
      cohortNo: null,
      skills: null,
      empStatus: null
    };
  }

  getData = (props) => {
    const { id } = props.match.params;
    console.log(id);
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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleCohortChange(value) {
    console.log(`selected ${value}`);
  }
  handleSkillsChange(value) {
    console.log(`selected ${value}`);
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
        sm: { span: 8 }
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
    console.log(this.state);

    return (
      <>
        {this.state.user &&
        this.state.cohorts &&
        this.state.skills &&
        this.state.empStatus ? (
          <div>
            <div className='edit-profile'>
              <h1>Edit Profile</h1>
              <div className='edit-tabs'>
                <Tabs defaultActiveKey='1' onChange={this.callback}>
                  <TabPane tab='Basic Info' key='1'>
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
                        {getFieldDecorator('cohort', {
                          rules: [
                            {
                              required: true,
                              message: 'Please input your cohort number!'
                            }
                          ]
                        })(
                          <Select
                            onChange={this.handleCohortChange}
                            style={{ width: 50 }}
                          >
                            {this.state.cohorts
                              ? this.state.cohorts.map((cohort, index) => (
                                  <Option value={cohort.cohortId} key={index}>
                                    {cohort.cohortId}
                                  </Option>
                                ))
                              : null}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item label={<span>Image&nbsp;</span>}>
                        {getFieldDecorator('image', {
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
                            onChange={this.handleSkillsChange}
                          >
                            {this.state.skills
                              ? this.state.skills.map((skill, index) => (
                                  <Option
                                    value={skill.skillId + ''}
                                    key={index}
                                  >
                                    {skill.skillName}
                                  </Option>
                                ))
                              : null}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item label={<span>Employment Status&nbsp;</span>}>
                        {getFieldDecorator('employment', {
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
                  </TabPane>
                  <TabPane tab='Social Links' key='2'>
                    Content of Tab Pane 2
                  </TabPane>
                  <TabPane tab='Portfolio' key='3'>
                    Content of Tab Pane 3
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const EditProfileForm = Form.create({ name: 'register' })(EditProfile);
export default EditProfileForm;
