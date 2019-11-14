import React from 'react';
import { Link } from 'react-router-dom';

import './group-users-item.styles.scss';

const GroupUsersItem = ({ userId, removeUser, name, openChat }) => {
  return (
    <div className='group-users-item flex-wrap-center'>
      <div className='group-users-info flex-wrap-center'>
        <img src='./img/user.png' alt='userImg' />
        <Link to={`/profile/${userId}`}>{name}</Link>
      </div>
      <div className='btn-container group-users-buttons flex-wrap-center'>
        <span onClick={removeUser} className='btn btn-red'>
          &#x2718; Remove User
        </span>
      </div>
    </div>
  );
};

export default GroupUsersItem;
