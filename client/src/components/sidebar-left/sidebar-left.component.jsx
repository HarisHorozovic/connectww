import React from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './sidebar-left.styles.scss';

import { sendFriendRequest } from '../../redux/user/user.actions';

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
      currentUser,
      lookingAtUser,
      sendFriendRequest
    } = this.props;
    let userOwnProfile = (
      <div className='btn-container flex-wrap-center'>
        {currentUser ? (
          <Link
            to={`/profile/${currentUser._id}/settings`}
            className='btn btn-main'
          >
            <i className='fas fa-cogs'></i> Manage Profile
          </Link>
        ) : (
          <Redirect to='/' />
        )}
      </div>
    );

    // For this get the user we are currently looking at if needed and add to friends functionality
    let userOtherProfile = (
      <div className='btn-container'>
        <button
          onClick={() => sendFriendRequest(this.props.match.params.userId)}
          className='btn btn-main'
        >
          Add<i className='fas fa-user-plus'></i>
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

    return (
      <div className='sidebar-left content-container flex-hor-center'>
        <div className='sidebar-main-head'>
          {lookingAtUser && (
            <img
              src={require(`../../img${
                lookingAtUser.profileImage !== 'user.png'
                  ? `/${lookingAtUser._id}/`
                  : '/'
              }${lookingAtUser.profileImage}`)}
              alt='userImg'
            />
          )}
          <p>{lookingAtUser ? lookingAtUser.firstName : 'name'}</p>
        </div>
        {!currentUser ? (
          <Redirect to='/' />
        ) : this.props.match.params.userId === currentUser._id ? (
          userOwnProfile
        ) : (
          userOtherProfile
        )}
        {urlPath.includes('settings') ? editProfileSidebar : null}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendFriendRequest: newFriendId => dispatch(sendFriendRequest(newFriendId))
});

const mapStateToProps = ({ user: { currentUser, lookingAtUser } }) => ({
  currentUser,
  lookingAtUser
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SidebarLeft)
);
