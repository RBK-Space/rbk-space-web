import React, { Component } from 'react';
import { GithubLoginButton } from 'react-social-login-buttons';

import './style.css';

export default class Header extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div className='loginPage'>
        <div className='opacity'>
          <div className='container'>
            <h1>Welcome to RBK-Space</h1>
            <p className='description'>
              - Here you can share your skills, RBK memories and post/find jobs
              with RBK family -
            </p>
            <div className='instructions-wrapper'>
              <span id='first-time'>First Time Login:</span>
              <ul className='instructions'>
                <li>
                  Please make sure that your GitHub account has your Name and
                  your Email - you can do this from your GitHub profile => Edit
                  profile.
                </li>
                <li>
                  Please make sure that your RBK organization membership on
                  GitHub is public.
                  <a
                    href='https://github.com/orgs/rbk-org/people'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {' '}
                    Click here{' '}
                  </a>
                </li>
              </ul>
            </div>
            <ul className='menu'>
              {authenticated ? (
                <li onClick={this._handleLogoutClick}>Logout</li>
              ) : (
                <li>
                  <GithubLoginButton
                    className='github-btn'
                    onClick={this._handleSignInClick}
                  />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  _handleSignInClick = () => {
    // Authenticate using via passport api in the backend
    // Open Twitter login page
    // Upon successful login, a cookie session will be stored in the client
    window.open('http://localhost:4000/auth/github', '_self');
  };

  _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open('http://localhost:4000/auth/logout', '_self');
    this.props.handleNotAuthenticated();
  };
}
