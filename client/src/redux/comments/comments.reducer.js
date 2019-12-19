import { CommentActionTypes } from './comments.types';

const INITIAL_STATE = {
  comments: [],
  commentError: null,
  commentLoading: true
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CommentActionTypes.CREATE_COMMENT:
      console.log(action.payload);
      return {
        ...state,
        comments: state.comments.concat(action.payload),
        commentLoading: false
      };
    case CommentActionTypes.GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case CommentActionTypes.REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => {
          return comment._id !== action.payload;
        })
      };
    case CommentActionTypes.COMMENT_ERROR:
      return {
        ...state,
        commentError: action.payload
      };
    default:
      return state;
  }
};

export default commentReducer;
