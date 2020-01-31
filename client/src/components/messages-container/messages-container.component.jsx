import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import './messages-container.styles.scss';

//Components
import MessageItem from '../messages-item/messages-item.component';
import MessageSend from '../message-send/message-send.component';

// Redux
import {
  getMessages,
  sendMessage,
  newMessage
} from '../../redux/messages/message.actions';

let socket;

class MessagesContainer extends React.Component {
  constructor() {
    super();

    socket = io.connect('http://localhost:5000');

    this.state = {
      hidden: true,
      message: ''
    };
  }

  componentDidMount() {
    this.props.getMessages('nms');

    // Listen to the event with the current users ID and if there is one, fire up our pure function that updates our messages array
    // To prevent doubling, best to put in the mount of the component
    socket.on(this.props.currentUser._id, data => {
      // First check if there are messages in the current user msgs array that we are looking(fix error on empty messages array)
      // Check to see if in the current messages in the props the sender is the same as the sender of the new message
      // or if the recepient of the first message is the same as the sender of the new message
      // If it is then update the array, if not, then try to add green border to the user that sent the message
      if (
        this.props.messages[0] &&
        (this.props.messages[0].recepient === data.sender ||
          this.props.messages[0].sender._id === data.sender)
      ) {
        this.props.newMessage(data);
      } else {
        // If curr user is not chatting with the user that sent the message, set that user to the state to
        // So we can show the user that he received message from that particular user
        this.setState({ newMessageFrom: data.sender });
      }
    });
  }

  componentDidUpdate() {
    this.scrollMessagesToBottom();
  }

  scrollMessagesToBottom() {
    const messagingContainer = document.querySelector('.messages-container');

    messagingContainer.scrollTo(0, messagingContainer.scrollHeight);
  }

  openChat = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  handleMessageChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleMessageSend = e => {
    const newMessage = {
      message: this.state.message
    };

    this.props.sendMessage(socket, newMessage);
    this.setState({ message: '' });
  };

  render() {
    const { hidden, message } = this.state;
    const { messages, currentUser } = this.props;
    return (
      <div className='messages'>
        <div
          className='messages-header flex-full-center'
          onClick={this.openChat}
        >
          <p>Chat</p>
        </div>
        <div className={`${hidden ? 'hidden' : ''}`}>
          <div className={`messages-container `}>
            {messages.length > 0 ? (
              messages.map(message => (
                <MessageItem
                  key={message._id}
                  currUser={currentUser}
                  sender={message.sender}
                  text={message.message}
                  createdAt={message.createdAt}
                />
              ))
            ) : (
              <p>No messages yet, type something to start chatting</p>
            )}
          </div>
          <MessageSend
            name='message'
            value={message}
            handleMessageChange={this.handleMessageChange}
            handleMessageSend={this.handleMessageSend}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getMessages: userId => dispatch(getMessages(userId)),
  sendMessage: (socket, message) => dispatch(sendMessage(socket, message)),
  newMessage: message => dispatch(newMessage(message))
});

const mapStateToProps = ({
  messages: { messages },
  user: { currentUser }
}) => ({
  messages,
  currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
