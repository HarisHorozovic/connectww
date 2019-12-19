import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './sidebar-left.styles.scss';

class SidebarLeft extends React.Component {
  render() {
    const {
      infoSection,
      addExp,
      addEdu,
      friendRequests,
      friends,
      changeLoginCreds,
      deactivateAcc,
      currentUser
    } = this.props;
    let userOwnProfile = (
      <div className='btn-container flex-wrap-center'>
        <Link to='/profile/galery' className='btn btn-grad'>
          Set new profile image
        </Link>
        {currentUser ? (
          <Link
            to={`/profile/${currentUser.data.user._id}/settings`}
            className='btn btn-grey'
          >
            {' '}
            Manage Profile
          </Link>
        ) : (
          <Redirect to='/' />
        )}
      </div>
    );

    // For this get the user we are currently looking at if needed and add to friends functionality
    let userOtherProfile = (
      <div className='btn-container'>
        <button onClick={`addFriend`} className='btn btn-orange'>
          Add<span>&#x2b;</span>
        </button>
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

    const urlPath = this.props.match.path.split('/');
    console.log('contains', urlPath.includes('settings'));

    return (
      <div className='sidebar-left content-container flex-hor-center'>
        <div>
          <img src='./img/user.png' alt='userImg' />
          <p>My name</p>
        </div>
        {!currentUser ? (
          <Redirect to='/' />
        ) : this.props.match.params.userId === currentUser.data.user._id ? (
          userOwnProfile
        ) : (
          userOtherProfile
        )}
        {urlPath.includes('settings') ? editProfileSidebar : null}
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default withRouter(connect(mapStateToProps)(SidebarLeft));
