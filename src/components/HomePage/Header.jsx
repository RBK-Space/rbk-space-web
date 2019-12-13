import React, { Component } from 'react';
import { GithubLoginButton } from 'react-social-login-buttons';

import './style.css';

export default class Header extends Component {
  render() {
    const { authenticated } = this.props;
    // console.log(authenticated);
    return (
      <div className='loginPage'>
        <div className='opacity'>
          <div className='container'>
            <h1>Welcome to RBK-Space</h1>
            <p className='description'>
              - Here you can share your skills, RBK memories and post/find jobs
              with RBK family -
            </p>
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
