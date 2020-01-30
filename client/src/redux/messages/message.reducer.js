import { messageActionTypes } from './message.types';

const INITIAL_STATE = {
  messages: [],
  messageError: null,
  loading: false
};

const messageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case messageActionTypes.GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        messageError: null,
        loading: false
      };
    case messageActionTypes.SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        loading: false,
        messageError: null
      };
    case messageActionTypes.DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(message => {
          return message._id !== action.payload;
        }),
        loading: false,
        messageError: null
      };
    case messageActionTypes.MESSAGE_ERROR:
      return {
        ...state,
        loading: false,
        messages: [],
        messageError: action.payload
      };
    default:
      return state;
  }
};

export default messageReducer;
