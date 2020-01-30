import React from 'react';
import { connect } from 'react-redux';

import './messages-container.styles.scss';

//Components
import MessageItem from '../messages-item/messages-item.component';
import MessageSend from '../message-send/message-send.component';

class MessagesContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      messageSession: {
        _id: 'messageSessionId',
        user: 'ObjectId User',
        chatBuddy: 'ObjectId User1',
        messages: [
          {
            _id: 'messageId',
            sender: 'ObjectId User',
            text: 'message here',
            sentImg: null,
            createdAt: 'date Sent'
          },
          {
            _id: 'messageId1',
            sender: 'ObjectId User1',
            text: '',
            sentImg: 'sentImginDatabase',
            createdAt: 'date Sent'
          }
        ]
      },
      hidden: true
    };
  }

  openChat = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  render() {
    console.log(this.props.messages);
    const { hidden, messageSession } = this.state;
    return (
      <div className='messages'>
        <div
          className='messages-header flex-full-center'
          onClick={this.openChat}
        >
          <img
            src='./img/user.png'
            alt='userImg'
            className='chat-img'
            onClick={this.openChat}
          />
          <a href='/userProfile'>User Name</a>
        </div>
        <div className={`messages-container ${hidden ? 'hidden' : ''}`}>
          {messageSession.messages.map(message => (
            <MessageItem
              key={message._id}
              currUser={messageSession.user}
              sender={message.sender}
              text={message.text}
              img={message.sentImg}
              createdAt={message.createdAt}
            />
          ))}
          <MessageSend messages={messageSession.messages} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ messages: { messages } }) => ({
  messages
});

export default connect(mapStateToProps)(MessagesContainer);
