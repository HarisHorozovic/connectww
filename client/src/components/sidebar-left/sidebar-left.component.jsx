import React from 'react';
import { Link } from 'react-router-dom';

import './sidebar-left.styles.scss';

const SidebarLeft = ({
  match,
  location,
  infoSection,
  addExp,
  addEdu,
  friendRequests,
  friends,
  changeLoginCreds,
  deactivateAcc
}) => {
  let fromHome = (
    <div className='btn-container flex-wrap-center'>
      <Link to='/profile/settings' className='btn btn-grey'>
        &#x2699; Profile Settings
      </Link>
      <Link to='/profile' className='btn btn-grad'>
        My Profile
      </Link>
    </div>
  );

  let userOwnProfile = (
    <div className='btn-container flex-wrap-center'>
      <Link to='/profile/galery' className='btn btn-grad'>
        Set new profile image
      </Link>
      <Link to='/profile/settings' className='btn btn-grey'>
        Manage Profile
      </Link>
    </div>
  );

  let userOtherProfile = (
    <div className='btn-container'>
      <Link to='/myprofile' className='btn btn-grey'>
        Add<span>&#x2b;</span>
      </Link>
      <Link to='/settings' className='btn btn-orange'>
        &#x2709;
      </Link>
    </div>
  );

  let editProfileSidebar = (
    <ul className='settings'>
      <li className='settings-item' onClick={infoSection}>
        Edit Info
      </li>
      <li className='settings-item' onClick={addExp}>
        Add Experience
      </li>
      <li className='settings-item' onClick={addEdu}>
        Add Education
      </li>
      <li className='settings-item' onClick={friendRequests}>
        Friend Requests
      </li>
      <li className='settings-item' onClick={friends}>
        Friends
      </li>
      <li className='settings-item' onClick={changeLoginCreds}>
        Change Login Credentials
      </li>
      <li className='settings-item' onClick={deactivateAcc}>
        Deactivate Account
      </li>
    </ul>
  );
  return (
    <div className='sidebar-left content-container flex-hor-center'>
      <div>
        <img src='./img/user.png' />
        <p>My name</p>
      </div>
      {location === 'editprofile'
        ? editProfileSidebar
        : location === 'homepage'
        ? fromHome
        : match !== undefined
        ? userOtherProfile
        : userOwnProfile}
    </div>
  );
};

export default SidebarLeft;
