import React from 'react';

import './messages-container.styles.scss';

//Components
import MessageItem from '../messages-item/messages-item.component';
import MessageSend from '../message-send/message-send.component';

class MessagesContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className='messages' onClick='toggleChatFunc'>
        <div className='messages-header flex-full-center'>
          <img src='./img/user.png' alt='userImg' className='chat-img' />
          <a href='/userProfile'>User Name</a>
        </div>
        <div className='messages-container'>
          <MessageItem />
          <MessageSend />
        </div>
      </div>
    );
  }
}

export default MessagesContainer;
