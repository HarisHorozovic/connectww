import React from 'react';

import './messages-item.styles.scss';

const MessageItem = ({ currUser, sender, text, img, createdAt }) => {
  //TODO: fetch sender and take his image here
  return (
    <div className={`message-item ${currUser == sender ? 'from-user' : ''} `}>
      <div className='message-item-header'>
        <img src='./img/user.png' alt='userImg' />
      </div>

      {img === null ? (
        <p className='message'>{text}</p>
      ) : (
        <img src={img} alt={img} />
      )}
    </div>
  );
};

export default MessageItem;
