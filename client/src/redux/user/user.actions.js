import axios from 'axios';

import { UserActionTypes } from './user.types';

const apiUrl = 'http://localhost:5000/api/v1/users';

// Axios handlers
export const login = user => dispatch => {
  return axios
    .post(`${apiUrl}/login`, user, { withCredentials: true })
    .then(res => dispatch(setCurrentUser(res.data.data.user)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const register = user => dispatch => {
  return axios
    .post(`${apiUrl}/signup`, user, { withCredentials: true })
    .then(res => dispatch(setCurrentUser(res.data.data.user)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const isLoggedIn = () => dispatch => {
  return axios
    .get(`${apiUrl}/is-logged-in`, { withCredentials: true })
    .then(res => dispatch(setCurrentUser(res.data.data.user)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const logOut = () => dispatch => {
  return axios
    .get(`${apiUrl}/logout`, { withCredentials: true })
    .then(res => dispatch(removeCurrentUser()))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const getUser = userId => dispatch => {
  return axios
    .get(`${apiUrl}/${userId}`, { withCredentials: true })
    .then(res => dispatch(getSingleUser(res.data.data.user)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const getAllUsers = userId => dispatch => {
  return axios
    .get(`${apiUrl}/all`, { withCredentials: true })
    .then(res => dispatch(getAll(res.data.data.users)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const updateUser = updateBody => dispatch => {
  return axios
    .patch(`${apiUrl}/update-user-data`, updateBody, { withCredentials: true })
    .then(res => dispatch(setCurrentUser(res.data.data.user)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const addEducation = eduObj => dispatch => {
  axios
    .post(`${apiUrl}/education/add`, eduObj, { withCredentials: true })
    .then(res => dispatch(eduAdd(res.data.education)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const removeEducation = eduId => dispatch => {
  axios
    .delete(`${apiUrl}/education/${eduId}`, { withCredentials: true })
    .then(res => dispatch(eduRemove(eduId)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const addExperience = expObj => dispatch => {
  axios
    .post(`${apiUrl}/experience/add`, expObj, { withCredentials: true })
    .then(res => dispatch(expAdd(res.data.education)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const removeExperience = expId => dispatch => {
  axios
    .delete(`${apiUrl}/experience/${expId}`, { withCredentials: true })
    .then(res => dispatch(expRemove(expId)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const sendFriendRequest = newFriendId => dispatch => {
  axios
    .post(`${apiUrl}/${newFriendId}`, {}, { withCredentials: true })
    .then(res => dispatch(addFriend(res.data.newFriend)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const removeFriend = friendId => dispatch => {
  axios
    .delete(`${apiUrl}/friends/${friendId}`, { withCredentials: true })
    .then(res => dispatch(setCurrentUser(res.data.data.user)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const acceptFriendRequest = friendId => dispatch => {
  return axios
    .post(
      `${apiUrl}/requests/${friendId}`,
      {},
      {
        withCredentials: true
      }
    )
    .then(res => dispatch(setCurrentUser(res.data.data.user)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const declineFriendRequest = friendId => dispatch => {
  return axios
    .delete(`${apiUrl}/requests/${friendId}`, { withCredentials: true })
    .then(res => dispatch(setCurrentUser(res.data.data.user)))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const changeCreds = changeObj => dispatch => {
  return axios
    .patch(`${apiUrl}/`, changeObj, { withCredentials: true })
    .then(() => dispatch(removeCurrentUser()))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

export const deleteAccount = password => dispatch => {
  return axios
    .post(`${apiUrl}/account`, { password }, { withCredentials: true })
    .then(() => dispatch(removeCurrentUser()))
    .catch(err => dispatch(setUserErrors(err.response.data)));
};

// Pure functions for handling redux state
export const setCurrentUser = data => {
  return {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: data
  };
};

export const getAll = data => {
  return {
    type: UserActionTypes.GET_ALL_USERS,
    payload: data
  };
};

export const getSingleUser = data => {
  return {
    type: UserActionTypes.GET_SINGLE_USER,
    payload: data
  };
};

export const removeCurrentUser = () => {
  return {
    type: UserActionTypes.REMOVE_CURRENT_USER
  };
};

export const eduAdd = data => {
  return {
    type: UserActionTypes.ADD_EDUCATION,
    payload: data
  };
};

export const eduRemove = data => {
  return {
    type: UserActionTypes.REMOVE_EDUCATION,
    payload: data
  };
};

export const expAdd = data => {
  return {
    type: UserActionTypes.ADD_EXPERIENCE,
    payload: data
  };
};

export const expRemove = data => {
  return {
    type: UserActionTypes.REMOVE_EXPERIENCE,
    payload: data
  };
};

export const addFriend = data => {
  return {
    type: UserActionTypes.ADD_FRIEND,
    payload: data
  };
};

export const setUserErrors = data => {
  return {
    type: UserActionTypes.SET_USER_ERROR,
    payload: data
  };
};
