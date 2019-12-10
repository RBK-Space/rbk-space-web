import React from 'react';
import { Layout, Menu, Input, Radio, Icon } from 'antd';
import { Button } from 'antd';

import './style.css';
const { Header } = Layout;
const { Search } = Input;

class Navbar extends React.Component {
  state = {
    current: 'mail'
  };

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  };
  state = {
    user: {},
    error: null,
    authenticated: false
  };
  _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open('http://localhost:4000/auth/logout', '_self');
    this.props.handleNotAuthenticated();
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
      <Layout className='header-layout'>
        {!authenticated ? null : (
          <Header className='header'>
            <div className='logo'>
              <a href='#'>
                <img src='https://via.placeholder.com/50/50' alt='' />
              </a>
            </div>
            <div className='search-wrapper'>
              <Menu
                theme='dark'
                mode='horizontal'
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key='1' className='menu-item'>
                  <div className='search-bar'>
                    <Search
                      placeholder='Search...'
                      onSearch={(value) => console.log(value)}
                      enterButton
                    />
                  </div>
                  <div className='radio-group-wrapper'>
                    <Radio.Group
                      className='radio-group'
                      name='radiogroup'
                      defaultValue={1}
                      style={{ lineHeight: '64px' }}
                    >
                      <Radio className='radio-button' value={1}>
                        People
                      </Radio>
                      <Radio className='radio-button' value={2}>
                        Posts
                      </Radio>
                    </Radio.Group>
                  </div>
                </Menu.Item>
              </Menu>
            </div>

            <div className='user-img'>
              <a href='#'>
                <img src={this.state.user[0].image} alt='' />
              </a>
              <Button id='logout' onClick={this._handleLogoutClick.bind(this)}>
                <Icon type='export' />
              </Button>
            </div>
          </Header>
        )}
      </Layout>
    );
  }
}

export default Navbar;
