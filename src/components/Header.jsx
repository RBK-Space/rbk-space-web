import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    const { authenticated } = this.props;
    console.log(authenticated);
    return (
      <>
        <h1>Welcome to RBK-Space</h1>
        <ul className='menu'>
          {authenticated ? (
            <li onClick={this._handleLogoutClick}>Logout</li>
          ) : (
            <li onClick={this._handleSignInClick}>Login</li>
          )}
        </ul>
      </>
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
