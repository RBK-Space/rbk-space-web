import React from 'react';
import { Layout, Menu, Input, Radio } from 'antd';
import './style.css';
const { Header } = Layout;
const { Search } = Input;

class Navbar extends React.Component {
  [x: string]: any;
  state = {
    current: 'mail'
  };

  handleClick = (e: { key: any }) => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  };

  render() {
    return (
      <Layout className='header-layout'>
        <Header className='header'>
          <div className='logo'>
            <a href=''>
              <img src='https://via.placeholder.com/50/50' alt='' />
            </a>
          </div>
          <div className='search-wrapper'>
            <Menu theme='dark' mode='horizontal' style={{ lineHeight: '64px' }}>
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
            <a href=''>
              <img src='https://via.placeholder.com/50/50' alt='' />
            </a>
          </div>
        </Header>
      </Layout>
    );
  }
}

export default Navbar;
