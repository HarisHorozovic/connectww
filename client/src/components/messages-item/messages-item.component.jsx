import React from 'react';

import './messages-item.styles.scss';

const MessageItem = ({ currUser, sender, text, img, createdAt }) => {
  return (
    <div
      className={`message-item ${
        currUser._id === sender._id || currUser._id === sender
          ? 'from-user'
          : ''
      } `}
    >
      <div className='message-item-header flex-hor-center'>
        <img src='./img/user.png' alt='userImg' />
        <p>{sender.firstName}</p>
      </div>

      <p className='message'>{text}</p>
    </div>
  );
};

export default MessageItem;
