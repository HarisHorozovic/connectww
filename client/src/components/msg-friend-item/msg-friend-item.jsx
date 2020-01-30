import React from 'react';
import { Link } from 'react-router-dom';

import './msg-friend-item.scss';

const MessageFriendItem = ({
  name,
  openChatSession,
  profileImg,
  friendId,
  newMsgFromUser
}) => {
  return (
    <div
      className={`friend-list-item flex-full-center ${newMsgFromUser}`}
      onClick={openChatSession}
    >
      <img
        src={require(`../../img${
          profileImg !== 'user.png' ? `/${friendId}/` : '/'
        }${profileImg}`)}
        alt='userImg'
      />

      <Link to={`/profile/${friendId}`}>{name}</Link>
    </div>
  );
};

export default MessageFriendItem;
