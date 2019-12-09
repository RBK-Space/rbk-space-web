import axios from 'axios';
import { GET_ALL_POSTS, ADD_POST } from './types';

export const getAllPosts = () => (dispatch) => {
  axios
    .get('http://localhost:3001/posts')
    .then((response) => {
      dispatch({
        type: GET_ALL_POSTS,
        payload: response.data
      });
    })
    .catch((response) => {
      return Promise.reject(response);
    });
};

export const addPost = (data) => (dispatch) => {
  console.log(data);
  axios.post('http://localhost:3001/user/post/add', { data }).then(
    (response) => {
      dispatch({ type: ADD_POST, payload: response.data });
      console.log(response.data);
    },
    (error) => {
      dispatch({ type: ADD_POST, error: error });
      console.log(error);
    }
  );
};
