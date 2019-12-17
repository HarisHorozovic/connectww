import axios from 'axios';

import { UserActionTypes } from './user.types';

const apiUrl = 'http://localhost:5000/api/v1/users';

export const login = user => dispatch => {
  return axios
    .post(`${apiUrl}/login`, user, { withCredentials: true })
    .then(response => {
      dispatch(setCurrentUser(response.data));
    })
    .catch(err => {
      //refactor this to set the state to error
      console.error(err);
    });
};

export const register = user => dispatch => {
  return axios
    .post(`${apiUrl}/signup`, user, { withCredentials: true })
    .then(res => {
      dispatch(setCurrentUser(res.data));
    })
    .catch(err => {
      console.log(err);
    });
};

export const isLoggedIn = () => dispatch => {
  return axios
    .get(`${apiUrl}/is-logged-in`, { withCredentials: true })
    .then(res => {
      console.log(res);
      dispatch(setCurrentUser(res.data));
    })
    .catch(err => console.error(err));
};

export const logOut = () => dispatch => {
  return axios
    .get(`${apiUrl}/logout`, { withCredentials: true })
    .then(res => dispatch(removeCurrentUser()))
    .catch(err => console.log(err));
};

export const setCurrentUser = data => {
  return {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: data
  };
};

export const removeCurrentUser = () => {
  return {
    type: UserActionTypes.REMOVE_CURRENT_USER
  };
};
