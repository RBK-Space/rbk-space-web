import axios from 'axios';
import { GET_ALL_POSTS, ADD_POST } from './types';
//import '../../config/config';

export const getAllPosts = () => dispatch => {
  axios
    .get(`/posts`)
    .then(response => {
      dispatch({
        type: GET_ALL_POSTS,
        payload: response.data
      });
    })
    .catch(response => {
      return Promise.reject(response);
    });
};

export const addPost = data => dispatch => {
  axios
    .post(`/user/post/add`, data)
    .then(
      response => {
        dispatch({ type: ADD_POST, payload: response.data[0] });
        dispatch(getAllPosts());
      },
      error => {
        dispatch({ type: ADD_POST, error: error });
        console.log(error);
      }
    )
    .catch(err => {
      console.log(err);
    });
};
