import axios from 'axios';

import { UserActionTypes } from './user.types';

const apiUrl = 'http://localhost:5000/api/v1/users';

export const setUser = user => dispatch => {
  console.log(user);
  return axios
    .post(`${apiUrl}/login`, user)
    .then(response => {
      console.log(response.data);
      dispatch(setCurrentUser(response.data));
    })
    .catch(err => {
      console.error(err);
    });
};

export const setCurrentUser = data => {
  return {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: data
  };
};
