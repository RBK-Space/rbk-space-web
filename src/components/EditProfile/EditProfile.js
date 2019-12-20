import React from 'react';
import './style.css';
import 'antd/dist/antd.css';
import { Form, Tabs } from 'antd';
import axios from 'axios';
import BasicInfoForm from './Tab1';
import SocialLinks from './Tab2';
import Portfolio from './Tab3';
const { TabPane } = Tabs;

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
    axios(`/user/${id}`).then((result) => {
      console.log(result.data[0]);
      this.setState({
        user: result.data[0]
      });
    });
  };

  componentDidMount() {
    this.getData(this.props);
  }

  render() {
    return (
      <>
        {this.state.user ? (
          <div>
            <div className='edit-profile'>
              <h1 id='edit-profile-heading'>Edit Profile</h1>
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
