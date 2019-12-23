import React from 'react';
import { connect } from 'react-redux';

import './friend-requests-container.styles.scss';

import {
  acceptFriendRequest,
  declineFriendRequest
} from '../../redux/user/user.actions';

// Components
import FriendListItem from '../friend-list-item/friend-list-item.component';

class FriendRequestsContainer extends React.Component {
  acceptFriend = friendId => {
    console.log(`Accepted friend with the id ${friendId}`);
  };

  render() {
    const { friendRequests } = this.props.currentUser;
    return (
      <div className='friend-requests-container flex-hor-center'>
        {/* <!-- Friends Item --> */}
        {friendRequests.length > 0 ? (
          friendRequests.map(friend => (
            <FriendListItem
              key={friend.user}
              name={friend.firstName}
              friendId={friend.user}
              acceptFriend={() => this.props.acceptFriendRequest(friend.user)}
              removeFriend={() => this.props.declineFriendRequest(friend.user)}
              profileImg={friend.profileImg}
              friendReq={true}
            />
          ))
        ) : (
          <p>You don't have any pending friend requests at this moment</p>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  acceptFriendRequest: friendId => dispatch(acceptFriendRequest(friendId)),
  declineFriendRequest: friendId => dispatch(declineFriendRequest(friendId))
});

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendRequestsContainer);
