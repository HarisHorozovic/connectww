import { combineReducers } from 'redux';

//Reducers
import userReducer from './user/user.reducer';
import postsReducer from './posts/posts.reducer';
import commentReducer from './comments/comments.reducer';
import galleryReducer from './gallery/gallery.reducer';

export default combineReducers({
  user: userReducer,
  posts: postsReducer,
  comments: commentReducer,
  gallery: galleryReducer
});
