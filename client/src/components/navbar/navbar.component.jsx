import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.styles.scss';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='logo-container'>
        <Link to='/home' className='navbar-logo'>
          <img src='./img/logo.png' alt='logo' />
        </Link>
      </div>
      <ul className='menu-container flex-row-end'>
        <Link to='/users/search' className='menu-item'>
          Search Users
        </Link>
        <Link to='/messaging' className='menu-item'>
          Messaging
        </Link>
        <Link to='/groups' className='menu-item'>
          Groups
        </Link>
        <Link to='/match' className='menu-item'>
          Match 'N Chat
        </Link>
        <Link to='/profile' className='menu-item my-profile flex-row-end'>
          <img src='img/user.png' alt='UserImg' />
          <p>My Profile</p>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
