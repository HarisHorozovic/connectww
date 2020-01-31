import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import './messages-page.styles.scss';

// Components
import MessageFriendItem from '../../components/msg-friend-item/msg-friend-item';
import MessageItem from '../../components/messages-item/messages-item.component';
import MessageSend from '../../components/message-send/message-send.component';

//Redux
import {
  sendMessage,
  getMessages,
  newMessage
} from '../../redux/messages/message.actions';

let socket;

class MessagesPage extends React.Component {
  constructor() {
    super();

    socket = io.connect('http://localhost:5000');

    this.state = {
      message: '',
      chattingWith: '',
      newMessageFrom: ''
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
    const messagingContainer = document.querySelector('.mp-container');

    messagingContainer.scrollTo(0, messagingContainer.scrollHeight);
  }

  handleMessageChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleMessageSend = () => {
    const newMessage = {
      recepient: this.state.chattingWith,
      message: this.state.message
    };
    this.props.sendMessage(socket, newMessage);
    this.setState({ message: '', newMessageFrom: '' });
  };

  openChatSession = userId => {
    this.props.getMessages(userId);
    this.setState({ chattingWith: userId });
  };

  render() {
    if (!this.props.currentUser) {
      return <Redirect to='/' />;
    } else {
      return (
        <div className='messages-page'>
          <div className='messages-page-container flex-wrap-container'>
            <div className='sidebar-left content-container flex-hor-center'>
              {this.props.currentUser.friends.length > 0 ? (
                this.props.currentUser.friends.map(friend => (
                  <MessageFriendItem
                    key={friend._id}
                    name={friend.firstName}
                    profileImg={friend.profileImage}
                    friendId={friend._id}
                    newMsgFromUser={
                      this.state.newMessageFrom === friend._id
                        ? 'unread-message'
                        : ''
                    }
                    openChatSession={() => this.openChatSession(friend._id)}
                  />
                ))
              ) : (
                <p>No friends yet, add someone to start chatting</p>
              )}
            </div>

            <div className='main-content flex-hor-center'>
              <div className='mp-container flex-hor-center'>
                {this.props.messages.length > 0 ? (
                  this.props.messages.map(message => (
                    <MessageItem
                      key={message._id}
                      currUser={this.props.currentUser}
                      sender={message.sender}
                      text={message.message}
                      img={message.sentImg}
                      createdAt={message.createdAt}
                    />
                  ))
                ) : (
                  <p>No messages yet, write something</p>
                )}
              </div>
              <MessageSend
                type='text'
                placeholder='Message'
                name='message'
                value={this.state.message}
                handleMessageChange={this.handleMessageChange}
                handleMessageSend={this.handleMessageSend}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  sendMessage: (socket, message) => dispatch(sendMessage(socket, message)),
  getMessages: userId => dispatch(getMessages(userId)),
  newMessage: message => dispatch(newMessage(message))
});
const mapStateToProps = ({
  user: { currentUser },
  messages: { messages }
}) => ({
  currentUser,
  messages
});

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
