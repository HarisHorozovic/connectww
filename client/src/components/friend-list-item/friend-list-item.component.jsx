import React from 'react';
import { Link } from 'react-router-dom';

import './friend-list-item.styles.scss';

const FriendListItem = ({
  name,
  profileImg,
  friendId,
  openChatSession,
  allFriends,
  friendReq,
  openChat,
  removeFriend,
  acceptFriend
}) => {
  const friendsBtns = (
    <div className='btn-container friend-buttons flex-wrap-center'>
      <span onClick={openChat} className='btn btn-orange'>
        <i className='fas fa-envelope'></i>
      </span>
      <span onClick={removeFriend} className='btn btn-red'>
        <i className='fas fa-user-slash'></i>
      </span>
    </div>
  );
  const friendReqBtns = (
    <div className='btn-container friend-request-buttons flex-wrap-center'>
      <span onClick={acceptFriend} className='btn btn-main'>
        <i className='fas fa-user-plus'></i>
      </span>
      <span onClick={removeFriend} className='btn btn-red'>
        <i className='fas fa-user-slash'></i>
      </span>
    </div>
  );
  return (
    <div
      className='friend-list-item flex-full-center'
      onClick={openChatSession}
    >
      <img
        src={require(`../../img${
          profileImg !== 'user.png' ? `/${friendId}/` : '/'
        }${profileImg}`)}
        alt='userImg'
      />

      <Link to={`/profile/${friendId}`}>{name}</Link>
      {allFriends !== undefined && allFriends === true ? friendsBtns : null}
      {friendReq !== undefined && friendReq === true ? friendReqBtns : null}
      {/*TODO: If possible when user is logged in to show green dot <div className='green-dot'></div> */}
    </div>
  );
};

export default FriendListItem;
