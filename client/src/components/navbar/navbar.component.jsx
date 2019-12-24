import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logOut } from '../../redux/user/user.actions';

import './navbar.styles.scss';

class Navbar extends React.Component {
  logOutClient = () => {
    this.props.logOut();
  };
  render() {
    const { firstName, _id } = this.props.currentUser;
    return (
      <nav className='navbar'>
        <div className='logo-container'>
          <Link to='/feed' className='navbar-logo'>
            <img src='./img/logo.png' alt='logo' />
          </Link>
        </div>
        <ul className='menu-container flex-row-end'>
          <Link to='/feed' className='menu-item'>
            Home
          </Link>
          <Link to='/users/search' className='menu-item'>
            Search Users
          </Link>
          <Link to='/messaging' className='menu-item'>
            Messaging
          </Link>
          <Link
            to={`/profile/${_id}`}
            className='menu-item my-profile flex-row-end'
          >
            {/* <img src='img/user.png' alt='UserImg' /> */}
            {firstName}'s Profile
          </Link>
          <button
            onClick={this.logOutClient}
            className='btn btn-orange menu-item my-profile flex-row-end'
          >
            LogOut
          </button>
        </ul>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
});

const mapStateToProps = ({ user: { currentUser, lookingAtUser } }) => ({
  currentUser,
  lookingAtUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
