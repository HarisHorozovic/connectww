import React from 'react';

import './messages-item.styles.scss';

const MessageItem = () => {
  return (
    <div className='message-item from-user'>
      <div className='message-item-header'>
        <img src='./img/user.png' alt='userImg' />
      </div>
      {/* if user uploaded image */}
      <img src='./img/user.png' alt='userImg' />
      {/* if user hasn't uploaded image */}
      <p className='message'>A tad bit longer message for test</p>
    </div>
  );
};

export default MessageItem;
