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
        &#x2709;
      </span>
      <span onClick={removeFriend} className='btn btn-red'>
        &#x2718;
      </span>
    </div>
  );
  const friendReqBtns = (
    <div className='btn-container friend-request-buttons flex-wrap-center'>
      <span onClick={acceptFriend} className='btn btn-green'>
        &#x2714;
      </span>
      <span onClick={removeFriend} className='btn btn-red'>
        &#x2718;
      </span>
    </div>
  );
  return (
    <div
      className='friend-list-item flex-full-center'
      onClick={openChatSession}
    >
      <img src={profileImg} alt={name} className='chat-img' />
      <Link to={`/profile/${friendId}`}>{name}</Link>
      {allFriends !== undefined && allFriends === true ? friendsBtns : null}
      {friendReq !== undefined && friendReq === true ? friendReqBtns : null}
      {/*TODO: If possible when user is logged in to show green dot <div className='green-dot'></div> */}
    </div>
  );
};

export default FriendListItem;
