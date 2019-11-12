import React from 'react';

import './friend-list-item.styles.scss';

const FriendListItem = () => {
  return (
    <div
      className='friend-list-item flex-full-center'
      onClick='openMessagesFunc(userToChat)'
    >
      <img src='./img/user.png' alt='userImg' className='chat-img' />
      <a href='openChatFunc'>User Name</a>
      <div className='green-dot'></div>
    </div>
  );
};

export default FriendListItem;
