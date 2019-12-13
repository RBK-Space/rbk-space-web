import React, { Component } from 'react';
import { Tag, Collapse, Icon } from 'antd';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
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
      authenticated: false
    };
  }

  componentDidMount() {
    this.getData(this.props);
  }
  getData = (props) => {
    const { id } = props.match.params;
    axios(`http://localhost:4000/user/${id}`).then((result) => {
      console.log(result.data[0][0]);
      this.setState({
        user: result.data[0][0]
      });
    });
  };

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
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found:a welcome guest in many households across the world.
`;
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
                <span className='section-id'>General</span>
                <div className='general-border'>
                  <div className='img-social-wrapper'>
                    <div className='user-img'>
                      <img src={this.state.user.image} alt='' />
                    </div>
                    <ul className='social-links'>
                      <li className='social-item'>
                        <a
                          href={this.state.user.gh}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <FontAwesomeIcon icon={faGithub} color='#211F1F' />
                        </a>
                      </li>
                      <li className='social-item'>
                        <a
                          href={this.state.user.fb}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <FontAwesomeIcon icon={faFacebookF} color='#3b5998' />
                        </a>
                      </li>
                      <li className='social-item'>
                        <a
                          href={this.state.user.li}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <FontAwesomeIcon icon={faLinkedin} color='#0e76a8' />
                        </a>
                      </li>
                      <li className='social-item'>
                        <a
                          href={this.state.user.tw}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <FontAwesomeIcon icon={faTwitter} color='#1da1f2' />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='general-info'>
                    <p>
                      Hello! My name is {this.state.user.fullName} &amp; I'm
                      from cohort {this.state.user.cohort}
                    </p>
                    <p>Employment status: {this.state.user.empStat} </p>
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
                    <Tag>React</Tag>
                    <Tag>Angular</Tag>
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
                  <Panel
                    header='This is panel header 1'
                    key='1'
                    style={customPanelStyle}
                    className='project-item'
                  >
                    <div className='panel-content-wrapper'>
                      <p className='project-decription'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Cupiditate inventore quisquam fugit deleniti illo
                        ratione, non illum accusantium id exercitationem nihil
                        dolorem, consequatur quas quis! Odio praesentium quasi
                        quas placeat!
                      </p>
                      <span>
                        <a href='#' target='_blank' rel='noopener noreferrer'>
                          Project Link
                        </a>
                      </span>
                    </div>
                  </Panel>
                  <Panel
                    header='This is panel header 2'
                    key='2'
                    style={customPanelStyle}
                    className='project-item'
                  >
                    <div className='panel-content-wrapper'>
                      <p className='project-decription'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Cupiditate inventore quisquam fugit deleniti illo
                        ratione, non illum accusantium id exercitationem nihil
                        dolorem, consequatur quas quis! Odio praesentium quasi
                        quas placeat!
                      </p>
                      <span>
                        <a href='#' target='_blank' rel='noopener noreferrer'>
                          Project Link
                        </a>
                      </span>
                    </div>
                  </Panel>
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
