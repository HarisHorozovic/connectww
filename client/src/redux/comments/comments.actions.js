import axios from 'axios';

import { CommentActionTypes } from './comments.types';

const apiUrl = 'http://localhost:5000/api/v1/posts';

// Axios requests
export const createComment = (postId, text) => dispatch => {
  axios
    .post(
      `${apiUrl}/${postId}/comments/`,
      { text },
      {
        withCredentials: true
      }
    )
    .then(res => dispatch(newComment(res.data.comment)))
    .catch(err => dispatch(commentError(err.response.data)));
};

export const getAllCommentsForPost = postId => dispatch => {
  axios
    .get(`${apiUrl}/${postId}/comments/`, { withCredentials: true })
    .then(res => dispatch(allComments(res.data.comments)))
    .catch(err => dispatch(commentError(err.response.data)));
};

export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`${apiUrl}/${postId}/comments/${commentId}`, {
      withCredentials: true
    })
    .then(res => dispatch(removeComment(commentId)))
    .catch(err => dispatch(commentError(err.response.data)));
};

// Pure functions for dispatching actions
export const newComment = data => {
  return {
    type: CommentActionTypes.CREATE_COMMENT,
    payload: data
  };
};

export const allComments = data => {
  return {
    type: CommentActionTypes.GET_COMMENTS,
    payload: data
  };
};

export const removeComment = data => {
  return {
    type: CommentActionTypes.REMOVE_COMMENT,
    payload: data
  };
};

export const commentError = data => {
  return {
    type: CommentActionTypes.COMMENT_ERROR,
    payload: data
  };
};
