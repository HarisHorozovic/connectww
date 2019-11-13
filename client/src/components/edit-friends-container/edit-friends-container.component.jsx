import React from 'react';

import './edit-friends-container.styles.scss';

// Components
import FriendListItem from '../friend-list-item/friend-list-item.component';

class EditFriendsContainer extends React.Component {
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

  openChat = friendId => {
    console.log(`Opened chat for friend ${friendId}`);
  };

  removeFriend = friendId => {
    console.log(`Removed friend ${friendId}`);
  };

  render() {
    const { friends } = this.state;
    return (
      <div className='friends-container flex-hor-center'>
        {/* <!-- Friends Item --> */}
        {friends.map(friend => (
          <FriendListItem
            key={friend._id}
            name={friend.name}
            friendId={friend._id}
            openChat={() => this.openChat(friend._id)}
            removeFriend={() => this.removeFriend(friend._id)}
            profileImg={friend.profileImg}
            allFriends={true}
          />
        ))}
      </div>
    );
  }
}

export default EditFriendsContainer;
