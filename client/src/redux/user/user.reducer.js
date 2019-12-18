import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  lookingAtUser: null,
  loading: true,
  userErrors: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
        userErrors: null
      };
    case UserActionTypes.REMOVE_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
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
