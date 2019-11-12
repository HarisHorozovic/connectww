import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar-left.styles.scss';

const SidebarLeft = () => {
  return (
    <div className='sidebar-left content-container flex-hor-center'>
      <div>
        <img src='./img/user.png' />
        <p>My name</p>
      </div>
      <div className='btn-container flex-wrap-center'>
        <Link to='/profile/settings' className='btn btn-grey'>
          &#x2699; Profile Settings
        </Link>
        <Link to='/profile' className='btn btn-grad'>
          My Profile
        </Link>
      </div>
    </div>
  );
};

export default SidebarLeft;
