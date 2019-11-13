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
        <li className='menu-item'>
          <Link to='/users/search'>Search Users</Link>
        </li>
        <li className='menu-item'>
          <a href='/messaging'>Messaging</a>
        </li>
        <li className='menu-item'>
          <a href='/groups'>Groups</a>
        </li>
        <li className='menu-item'>
          <a className='special-item' href='/matchnchat'>
            Match 'N Chat
          </a>
        </li>
        <Link to='/profile' className='menu-item my-profile flex-row-end'>
          <img src='img/user.png' alt='UserImg' />
          <p>My Profile</p>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
