import { PostActionTypes } from './posts.types';

const INITIAL_STATE = {
  posts: null,
  postError: null,
  postLoading: true
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PostActionTypes.GET_CURRENT_POST:
      return {
        ...state,
        post: action.payload,
        postError: null,
        postLoading: false
      };
    case PostActionTypes.GET_POSTS_FROM_FRIENDS:
    case PostActionTypes.GET_USERS_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        postLoading: false,
        postError: null
      };
    case PostActionTypes.REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => {
          return post._id !== action.payload;
        })
      };
    case PostActionTypes.LIKE_POST:
    case PostActionTypes.DISLIKE_POST:
      return {
        ...state
      };

    case PostActionTypes.POSTS_ERROR:
      return {
        ...state,
        postError: action.payload,
        postLoading: false
      };
    default:
      return state;
  }
};

export default postsReducer;
