import React from 'react';
import { connect } from 'react-redux';

import './edit-friends-container.styles.scss';

import { removeFriend } from '../../redux/user/user.actions';

// Components
import FriendListItem from '../friend-list-item/friend-list-item.component';

class EditFriendsContainer extends React.Component {
  openChat = friendId => {
    console.log(`Opened chat for friend ${friendId}`);
  };

  render() {
    const { friends } = this.props.currentUser;
    return (
      <div className='friends-container flex-hor-center'>
        {friends.length > 0 ? (
          friends.map(friend => (
            <FriendListItem
              key={friend._id}
              name={friend.firstName}
              friendId={friend._id}
              openChat={() => this.openChat(friend._id)}
              removeFriend={() => this.props.removeFriend(friend._id)}
              profileImg={friend.profileImage}
              allFriends={true}
            />
          ))
        ) : (
          <p>No friends yet, go to search users and add some friends</p>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  removeFriend: friendId => dispatch(removeFriend(friendId))
});

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditFriendsContainer);
