import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AddPost from './components/AddPost/AddPost';
import Post from './components/Post/Post';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Navbar />
      <Sidebar />
      <div className='container'>
        <AddPost />
        <Post />
      </div>
    </div>
  );
};

export default App;
