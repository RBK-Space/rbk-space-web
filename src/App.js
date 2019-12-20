import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
// import Sidebar from './components/Sidebar/Sidebar';
import AddPost from './components/AddPost/AddPost';
import Post from './components/Post/Post';
import Profile from './components/userProfile/Profile';
import SearchPeople from './components/Search/SearchPeople';
import SearchPosts from './components/Search/SearchPosts';
import EditProfileForm from './components/EditProfile/EditProfile';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers/index';
import thunk from 'redux-thunk';
import Homepage from './components/HomePage/Homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const store = createStore(combineReducers, applyMiddleware(thunk));
class App extends React.Component {
  state = {
    user: {},
    error: null,
    authenticated: false
  };
  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'
    fetch('/auth/login/success', {
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
      <>
        {!authenticated ? (
          <Homepage />
        ) : (
          <>
            <Provider store={store}>
              <Router>
                <Navbar />
                {/* <Sidebar /> */}
                <div className='container'>
                  <Switch className='App'>
                    <Route path='/home'>
                      <AddPost />
                      <Post />
                    </Route>
                    <Route
                      exact
                      path='/profile/:id'
                      component={Profile}
                    ></Route>
                    <Route
                      exact
                      path='/search/users/'
                      component={SearchPeople}
                    ></Route>
                    <Route
                      exact
                      path='/search/posts/'
                      component={SearchPosts}
                    ></Route>
                    <Route
                      path='/editProfile/:id'
                      component={EditProfileForm}
                    />
                  </Switch>
                </div>
              </Router>
            </Provider>
          </>
        )}
      </>
    );
  }
}

export default App;
