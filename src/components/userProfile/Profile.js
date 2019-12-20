import React, { Component } from 'react';
import { Tag, Collapse, Icon } from 'antd';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import { fas, faUserEdit } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import {
  faFacebookF,
  faTwitter,
  faLinkedin,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

library.add(fas, faFacebookF, faTwitter, faLinkedin, faGithub);

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: null,
      authenticated: false,
      loggedInUser: {}
    };
  }

  getData = (props) => {
    const { id } = props.match.params;
    axios(`/user/${id}`).then((result) => {
      this.setState({
        user: result.data[0]
      });
    });
  };
  componentDidMount() {
    fetch('https://rbk-frontend.herokuapp.com/auth/login/success', {
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
        // console.log(responseJson.user);
        this.setState({
          authenticated: true,
          loggedInUser: responseJson.user
        });
      })
      .catch((error) => {
        this.setState({
          authenticated: false,
          error: 'Failed to authenticate user'
        });
      });
    this.getData(this.props);
  }
  componentWillReceiveProps(props) {
    this.getData(props);
  }

  render() {
    const { Panel } = Collapse;
    const customPanelStyle = {
      background: '#f7f7f7',
      borderRadius: 4,
      marginBottom: 12,
      border: 0,
      overflow: 'hidden'
    };

    return (
      <div className='user-profile'>
        {!this.state.user.hasOwnProperty('userId') ? (
          <div>
            <img
              src='https://flevix.com/wp-content/uploads/2019/07/Ring-Preloader.gif'
              alt=''
            />
          </div>
        ) : (
          <>
            <div className='general-wrapper'>
              <h1 id='user-profile-heading'>User Profile</h1>
              <div className='general'>
                <div className='editt'>
                  <span className='section-id'>General</span>
                  {this.state.loggedInUser[0] &&
                  this.state.loggedInUser[0].userId ===
                    this.state.user.userId ? (
                    <Link to={`/editProfile/${this.state.user.userId}`}>
                      <FontAwesomeIcon
                        icon={faUserEdit}
                        color='##1890ff'
                        size='lg'
                      />
                      <span className='edit-profile-text'>Edit Profile</span>
                    </Link>
                  ) : null}
                </div>

                <div className='general-border'>
                  <div className='img-social-wrapper'>
                    <div className='user-img'>
                      <img src={this.state.user.image} alt='' />
                    </div>
                    <ul className='social-links'>
                      {this.state.user.gh ? (
                        <li className='social-item'>
                          <a
                            href={this.state.user.gh}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <FontAwesomeIcon icon={faGithub} color='#211F1F' />
                          </a>
                        </li>
                      ) : null}
                      {this.state.user.fb ? (
                        <li className='social-item'>
                          <a
                            href={this.state.user.fb}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <FontAwesomeIcon
                              icon={faFacebookF}
                              color='#3b5998'
                            />
                          </a>
                        </li>
                      ) : null}

                      {this.state.user.li ? (
                        <li className='social-item'>
                          <a
                            href={this.state.user.li}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <FontAwesomeIcon
                              icon={faLinkedin}
                              color='#0e76a8'
                            />
                          </a>
                        </li>
                      ) : null}

                      {this.state.user.tw ? (
                        <li className='social-item'>
                          <a
                            href={this.state.user.tw}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <FontAwesomeIcon icon={faTwitter} color='#1da1f2' />
                          </a>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                  <div className='general-info'>
                    <p>
                      Hello! My name is {this.state.user.fullName}{' '}
                      {this.state.user.cohort
                        ? `& I'm
                      from ${this.state.user.cohort}`
                        : null}
                    </p>
                    <p>
                      {' '}
                      {this.state.user.empStat
                        ? `Employment status: ${this.state.user.empStat}`
                        : null}{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bio-wrapper'>
              <span className='section-id'>Bio</span>

              <div className='bio-info'>
                <p className='bio-content'>{this.state.user.bio}</p>
                <div className='skills'>
                  <span className='skills-id'>Skills</span>
                  {/* map skills array */}
                  <div className='skills-tags'>
                    {this.state.user.skills.map((skill, index) => (
                      <Tag key={index}>{skill.skillName}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='portfolio-wrapper'>
              <span className='section-id'>Portfolio</span>
              <div className='portfolio-info'>
                <Collapse
                  bordered={false}
                  defaultActiveKey={['1']}
                  expandIcon={({ isActive }) => (
                    <Icon type='caret-right' rotate={isActive ? 90 : 0} />
                  )}
                >
                  {/* map projects array */}
                  {this.state.user.projects.map((project, index) => (
                    <Panel
                      header={project.projectTitle}
                      key={index + 1}
                      style={customPanelStyle}
                      className='project-item'
                    >
                      <div className='panel-content-wrapper'>
                        <p className='project-decription'>
                          {project.projectDesc}
                        </p>
                        <span>
                          <a
                            href={`http://${project.projectLink}`}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            Project Link
                          </a>
                        </span>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default Profile;
