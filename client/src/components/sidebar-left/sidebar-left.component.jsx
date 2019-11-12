import React from 'react';

import './sidebar-left.styles.scss';

const SidebarLeft = () => {
  return (
    <div className='sidebar-left content-container flex-hor-center'>
      <div>
        <img src='./img/user.png' />
        <p>My name</p>
      </div>
      <div className='btn-container'>
        <a href='/myprofile' className='btn btn-grey'>
          &#x2699; Profile
        </a>
        <a href='/settings' className='btn btn-grad'>
          Meta
        </a>
      </div>
    </div>
  );
};

export default SidebarLeft;
