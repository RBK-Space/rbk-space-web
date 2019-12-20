import { GET_ALL_POSTS, ADD_POST } from './../actions/types';

const initialState = {
  posts: []
};

export function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case ADD_POST:
      if (action.error) {
        return [];
      } else {
        return {
          ...state,
          posts: [...state.posts, action.payload]
        };
      }
    default:
      return state;
  }
}
