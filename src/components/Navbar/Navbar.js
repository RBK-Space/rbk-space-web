import React from 'react';
import { Layout, Menu, Radio, Icon } from 'antd';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './style.css';
const { Header } = Layout;

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      error: null,
      authenticated: false,
      searchToggle: 1,
      searchWord: '',
      searchResult: []
    };
    this.toggleClick = this.toggleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleClick(e) {
    const { value } = e.target;
    this.setState({ searchToggle: value });
  }

  _handleLogoutClick = () => {
    // Logout using Twitter passport api
    // Set authenticated state to false in the HomePage
    window.open('http://localhost:4000/auth/logout', '_self');
    this.props.handleNotAuthenticated();
  };

  componentDidMount() {
    var that = this;
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
        that.setState({
          authenticated: true,
          user: responseJson.user
        });
      })
      .catch((error) => {
        that.setState({
          authenticated: false,
          error: 'Failed to authenticate user'
        });
      });
  }
  handleChange(e) {
    this.setState({ searchWord: e.target.value });
  }

  render() {
    const { authenticated } = this.state;
    return (
      <Layout className='header-layout'>
        {!authenticated ? null : (
          <Header className='header'>
            <div className='logo'>
              <Link to='/home'>
                <img
                  src='https://i.ibb.co/19WCkMF/output-onlinepngtools.png'
                  alt=''
                />
              </Link>
            </div>
            <div className='search-wrapper'>
              <Menu
                theme='dark'
                mode='horizontal'
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key='1' className='menu-item'>
                  <div className='search-bar'>
                    <input
                      type='text'
                      name='search-bar'
                      onChange={this.handleChange}
                      value={this.state.searchWord}
                      className='search-input'
                    />
                    {this.state.searchToggle === 1 ? (
                      <Link
                        to={`/search/users/?query=${this.state.searchWord}`}
                      >
                        <Button type='primary' className='ant-search-btn'>
                          Search
                        </Button>
                      </Link>
                    ) : (
                      <Link
                        to={`/search/posts/?query=${this.state.searchWord}`}
                      >
                        <Button type='primary' className='ant-search-btn'>
                          Search
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className='radio-group-wrapper'>
                    <Radio.Group
                      className='radio-group'
                      name='radiogroup'
                      defaultValue={1}
                      style={{ lineHeight: '64px' }}
                    >
                      <Radio
                        className='radio-button'
                        value={1}
                        onChange={this.toggleClick}
                      >
                        People
                      </Radio>
                      <Radio
                        className='radio-button'
                        value={2}
                        onChange={this.toggleClick}
                      >
                        Posts
                      </Radio>
                    </Radio.Group>
                  </div>
                </Menu.Item>
              </Menu>
            </div>
            <div className='user-img'>
              <Link to={`/profile/${this.state.user[0].userId}`}>
                <img src={this.state.user[0].image} alt='' />
              </Link>

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
