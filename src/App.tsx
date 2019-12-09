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

export const store = createStore(combineReducers, applyMiddleware(thunk));
const App: React.FC = () => {
  return (
    <Homepage />
    // <Provider store={store}>
    //   <div className='App'>
    //     <Navbar />
    //     <Sidebar />
    //     <div className='container'>
    //       <AddPost />
    //       <Post />
    //     </div>
    //   </div>
    // </Provider>
  );
};

export default App;
