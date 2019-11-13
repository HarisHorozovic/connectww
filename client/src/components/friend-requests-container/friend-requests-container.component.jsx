import React from 'react';

import './friend-requests-container.styles.scss';

// Components
import FriendListItem from '../friend-list-item/friend-list-item.component';

class FriendRequestsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      friends: [
        {
          _id: '123',
          name: 'Alo',
          profileImg: 'asd'
        },
        {
          _id: '345',
          name: 'Alo2',
          profileImg: 'asd2'
        }
      ]
    };
  }

  acceptFriend = friendId => {
    console.log(`Accepted friend with the id ${friendId}`);
  };

  removeFriend = friendId => {
    console.log(`Declined friend with the id ${friendId}`);
  };

  render() {
    const { friends } = this.state;
    return (
      <div className='friend-requests-container flex-hor-center'>
        {/* <!-- Friends Item --> */}
        {friends.map(friend => (
          <FriendListItem
            key={friend._id}
            name={friend.name}
            friendId={friend._id}
            acceptFriend={() => this.acceptFriend(friend._id)}
            removeFriend={() => this.removeFriend(friend._id)}
            profileImg={friend.profileImg}
            friendReq={true}
          />
        ))}
      </div>
    );
  }
}

export default FriendRequestsContainer;
