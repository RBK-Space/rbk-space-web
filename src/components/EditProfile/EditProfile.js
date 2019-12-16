import React from 'react';
import './style.css';
import 'antd/dist/antd.css';
import { Form, Input, Tooltip, Avatar, Icon, Select, Button, Tabs } from 'antd';
import axios from 'axios';
import BasicInfoForm from './Tab1';
import SocialLinks from './Tab2';
import Portfolio from './Tab3';
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
      empStatus: null,
      skillId: []
    };
  }

  getData = (props) => {
    const { id } = props.match.params;
    console.log(id);
    this.setState({ id: id });
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

  handleSubmitProjects = (e) => {
    e.preventDefault();
    var that = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios
          .post('http://localhost:4000/user/edit/portfolio', {
            userId: that.state.user.userId,
            title: that.state.projectTitle,
            description: that.state.projectDesc,
            link: that.state.projectLink
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

  handleSubmitLinks = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      }
    });
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
    // console.log(this.state);

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
                    <BasicInfoForm id={this.state.id} />
                  </TabPane>
                  <TabPane tab='Social Links' key='2'>
                    <SocialLinks id={this.state.id} />
                  </TabPane>
                  <TabPane tab='Portfolio' key='3'>
                    <Portfolio id={this.state.id} />
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
