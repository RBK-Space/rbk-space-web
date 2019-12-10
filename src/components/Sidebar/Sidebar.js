import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faLinkedin,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

library.add(fas, faFacebookF, faTwitter, faLinkedin, faGithub);

class Sidebar extends Component {
  state = {
    user: {},
    error: null,
    authenticated: false
  };

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch('http://localhost:4000/auth/login/success', {
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
        console.log(responseJson.user);
        this.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch((error) => {
        this.setState({
          authenticated: false,
          error: 'Failed to authenticate user'
        });
      });
  }

  render() {
    const { authenticated } = this.state;

    return (
      <div className='home-page'>
        {!authenticated ? null : (
          <aside>
            <div className='user-img'>
              <img src={this.state.user[0].image} alt='' />
            </div>
            <span className='user-name'>{this.state.user[0].fullName}</span>
            <ul className='social-links'>
              <li className='social-item'>
                <a href={this.state.user[0].gh} target='_blank'>
                  <FontAwesomeIcon icon={faGithub} color='#211F1F' size='2x' />
                </a>
              </li>
              <li className='social-item'>
                <a href={this.state.user[0].fb} target='_blank'>
                  <FontAwesomeIcon
                    icon={faFacebookF}
                    color='#3b5998'
                    size='2x'
                  />
                </a>
              </li>
              <li className='social-item'>
                <a href={this.state.user[0].li} target='_blank'>
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    color='#0e76a8'
                    size='2x'
                  />
                </a>
              </li>
              <li className='social-item'>
                <a href={this.state.user[0].tw} target='_blank'>
                  <FontAwesomeIcon icon={faTwitter} color='#1da1f2' size='2x' />
                </a>
              </li>
            </ul>
            <span className='bio'>{this.state.user[0].bio} </span>
            <span className='employment-status'>
              {this.state.user[0].empStat}
            </span>
            <span className='edit-profile'>
              <a href='#'>
                <FontAwesomeIcon icon={faUserEdit} color='#000' size='lg' />
                <span className='edit-profile-text'>Edit Profile</span>
              </a>
            </span>
          </aside>
        )}
      </div>
    );
  }
}

export default Sidebar;
