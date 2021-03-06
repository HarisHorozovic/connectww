import axios from 'axios';

import { GalleryActionTypes } from './gallery.types';

const apiUrl = 'http://localhost:5000/api/v1/gallery';

// Axios Requests
export const uploadImage = image => dispatch => {
  axios
    .post(`${apiUrl}/`, image, { withCredentials: true })
    .then(res => dispatch(newImage(res.data.image)))
    .catch(err => dispatch(setGalleryError(err.response.data)));
};

export const getUserGallery = userId => dispatch => {
  axios
    .get(`${apiUrl}/${userId}`, { withCredentials: true })
    .then(res => dispatch(getGallery(res.data.gallery.images)))
    .catch(err => dispatch(setGalleryError(err.response.data)));
};

export const setCoverImage = cover => dispatch => {
  axios
    .patch(`${apiUrl}/set-main`, { cover }, { withCredentials: true })
    .then(res => dispatch(changeSuccess()))
    .catch(err => dispatch(setGalleryError(err.response.data)));
};

export const setProfileImage = profileImg => dispatch => {
  axios
    .patch(`${apiUrl}/set-main`, { profileImg }, { withCredentials: true })
    .then(res => dispatch(changeSuccess()))
    .catch(err => dispatch(setGalleryError(err.response.data)));
};

export const removeImage = imageName => dispatch => {
  return axios
    .delete(`${apiUrl}/image/${imageName}`, { withCredentials: true })
    .then(res => dispatch(deleteImage(imageName)))
    .catch(err => dispatch(setGalleryError(err.response.data)));
};

//Pure functions for handling reducer state

export const getGallery = data => {
  return {
    type: GalleryActionTypes.GET_GALLERY,
    payload: data
  };
};

export const newImage = data => {
  return {
    type: GalleryActionTypes.UPLOAD_IMAGE,
    payload: data
  };
};

export const deleteImage = data => {
  return {
    type: GalleryActionTypes.REMOVE_IMAGE,
    payload: data
  };
};

export const changeSuccess = () => {
  return {
    type: GalleryActionTypes.UPDATE_MAIN_IMAGE
  };
};

export const setGalleryError = data => {
  return {
    type: GalleryActionTypes.SET_GALLERY_ERROR,
    payload: data
  };
};
