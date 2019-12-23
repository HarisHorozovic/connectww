import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  lookingAtUser: null,
  loading: true,
  users: null,
  userErrors: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GET_ALL_USERS:
      return {
        users: action.payload,
        currentUser: state.currentUser,
        loading: false,
        userErrors: null
      };
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        userErrors: null
      };
    case UserActionTypes.GET_SINGLE_USER:
    case UserActionTypes.ADD_FRIEND: {
      return {
        ...state,
        lookingAtUser: action.payload,
        loading: false,
        userErrors: null
      };
    }
    case UserActionTypes.REMOVE_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        lookingAtUser: null,
        loading: false,
        userErrors: null
      };
    case UserActionTypes.ADD_EDUCATION:
      return {
        ...state,
        loading: false,
        userErrors: null
      };
    case UserActionTypes.REMOVE_EDUCATION:
      return {
        ...state,
        loading: false,
        userErrors: null
      };

    case UserActionTypes.ADD_EXPERIENCE:
      return {
        ...state,
        loading: false,
        userErrors: null
      };
    case UserActionTypes.REMOVE_EXPERIENCE:
      return {
        ...state,
        loading: false,
        userErrors: null
      };

    case UserActionTypes.SET_USER_ERROR:
      return {
        ...state,
        userErrors: action.payload,
        loading: false
      };

    default:
      return state;
  }
};

export default userReducer;
