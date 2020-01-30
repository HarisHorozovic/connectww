import axios from 'axios';

import { messageActionTypes } from './message.types';

const apiUrl = 'http://localhost:5000/api/v1/messages';

// Axios requests
// Parse the socket along with the message from the react
export const sendMessage = (socket, message) => dispatch => {
  axios
    .post(`${apiUrl}/`, message, { withCredentials: true })
    .then(res => {
      dispatch(newMessage(res.data.message));

      // Use the socket to emit newMessage event to the server
      socket.emit('newMessage', res.data.message);
    })
    .catch(err => dispatch(messageError(err.response.data)));
};

export const getMessages = userId => dispatch => {
  axios
    .get(`${apiUrl}/${userId}`, { withCredentials: true })
    .then(res => dispatch(setMessagesState(res.data.messages)))
    .catch(err => dispatch(messageError(err.response.data)));
};

// State mutating functions************************************************************

const setMessagesState = data => {
  return {
    type: messageActionTypes.GET_MESSAGES,
    payload: data
  };
};

export const newMessage = data => {
  return {
    type: messageActionTypes.SEND_MESSAGE,
    payload: data
  };
};

const messageError = data => {
  return {
    type: messageActionTypes.MESSAGE_ERROR,
    payload: data
  };
};
