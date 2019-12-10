import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AddPost from './components/AddPost/AddPost';
import Post from './components/Post/Post';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import combineReducers from './reducers/index';
import thunk from 'redux-thunk';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const store = createStore(combineReducers, applyMiddleware(thunk));
const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Switch>
              <Route exact path='/'>
                <Homepage />
              </Route>
              <Route path='/home'>
                <Navbar />
                <Sidebar />
                <div className='container'>
                  <AddPost />
                  <Post />
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    </>
  );
};

export default App;
