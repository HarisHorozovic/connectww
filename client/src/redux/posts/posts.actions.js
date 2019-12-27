import axios from 'axios';

import { PostActionTypes } from './posts.types';

const apiUrl = 'http://localhost:5000/api/v1/posts';

// Axios requests
export const createPost = post => dispatch => {
  return axios
    .post(`${apiUrl}/`, post, { withCredentials: true })
    .then(res => dispatch(setPost(res.data.post)))
    .catch(err => dispatch(setPostError(err.response.data)));
};

export const getPostsFromFriends = () => dispatch => {
  return axios
    .get(`${apiUrl}/`, { withCredentials: true })
    .then(res => dispatch(postsFromFriends(res.data)))
    .catch(err => dispatch(setPostError(err.response.data)));
};

export const getUsersPosts = userId => dispatch => {
  return axios
    .get(`${apiUrl}/user/${userId}`, { withCredentials: true })
    .then(res => dispatch(usersPosts(res.data)))
    .catch(err => setPostError(err.response.data));
};

export const removePost = postId => dispatch => {
  return axios
    .delete(`${apiUrl}/${postId}`, { withCredentials: true })
    .then(res => dispatch(removePostState(postId)))
    .catch(err => dispatch(setPostError(err.response.data)));
};

export const likePost = postId => dispatch => {
  axios
    .post(`${apiUrl}/${postId}/like`, {}, { withCredentials: true })
    .then(res => dispatch(addLike(res.data.post)))
    .catch(err => dispatch(setPostError(err)));
};

export const dislikePost = postId => dispatch => {
  axios
    .post(`${apiUrl}/${postId}/dislike`, {}, { withCredentials: true })
    .then(res => dispatch(addDislike(res.data.post)))
    .catch(err => dispatch(setPostError(err)));
};

// Pure functions for dispatching actions

export const setPost = data => {
  return {
    type: PostActionTypes.SET_POST,
    payload: data
  };
};

export const postsFromFriends = data => {
  return {
    type: PostActionTypes.GET_POSTS_FROM_FRIENDS,
    payload: data
  };
};

export const usersPosts = data => {
  return {
    type: PostActionTypes.GET_USERS_POSTS,
    payload: data
  };
};

export const removePostState = data => {
  return {
    type: PostActionTypes.REMOVE_POST,
    payload: data
  };
};

export const addLike = data => {
  return {
    type: PostActionTypes.LIKE_POST,
    payload: data
  };
};

export const addDislike = data => {
  return {
    type: PostActionTypes.DISLIKE_POST,
    payload: data
  };
};

export const setPostError = data => {
  return {
    type: PostActionTypes.POSTS_ERROR,
    payload: data
  };
};
