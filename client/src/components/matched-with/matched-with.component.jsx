import React from 'react';

import './matched-with.styles.scss';

import FriendListItem from '../friend-list-item/friend-list-item.component';

class MatchedWith extends React.Component {
  constructor() {
    super();

    this.state = {
      matchedUsers: [
        { _id: '1', name: 'user1', profileImg: 'user1' },
        { _id: '2', name: 'user2', profileImg: 'user2' },
        { _id: '3', name: 'user3', profileImg: 'user3' }
      ]
    };
  }

  openChat = userId => {
    //open chat session for user

    console.log(`Chatting with user ${userId}`);
  };

  removeUser = userId => {
    //remove user from matched users
    console.log(`Removed user with id ${userId}`);
  };

  render() {
    const { matchedUsers } = this.state;
    return (
      <div className='chatting-with-container flex-hor-center'>
        {matchedUsers.length > 0 ? (
          matchedUsers.map(user => (
            <FriendListItem
              key={user._id}
              friendId={user._id}
              profileImg={user.profileImg}
              name={user.name}
              openChat={() => this.openChat(user._id)}
              removeFriend={() => this.removeUser(user._id)}
              allFriends
            />
          ))
        ) : (
          <p>
            You haven't matched with anyone, set your preferences and start
            looking for new friends
          </p>
        )}
      </div>
    );
  }
}

export default MatchedWith;
