import React from 'react';

import './match-with-user.styles.scss';

// Components
import FriendListItem from '../friend-list-item/friend-list-item.component';

class MatchWithUser extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        _id: '1',
        profileImg: 'img1',
        name: 'user1',
        gender: 'female',
        age: 23
      },
      preferences: {
        gender: 'female',
        ageFrom: 18,
        ageTo: 30
      }
    };
  }

  openChat = userId => {
    //Open chat session for user
    console.log(`Chatting with user ${userId}`);
  };

  removeUser = userId => {
    //Remove user from matched, or put not interested in new array so that user is not show anymore
    console.log(`Removed user ${userId}`);
  };

  findRandomUser = (gender, ageFrom, ageTo) => {
    //find user in the database using these filters
    console.log(`User preferences ${gender}, ${ageFrom}, ${ageTo}`);
  };

  render() {
    const { user } = this.state;
    const { gender, ageFrom, ageTo } = this.state.preferences;
    return (
      <div className='match-chat-container flex-hor-center'>
        <button
          className='btn btn-green match-btn'
          onClick={() => this.findRandomUser(gender, ageFrom, ageTo)}
        >
          &#x2766; Match
        </button>
        <FriendListItem
          key={user._id}
          friendId={user._id}
          profileImg={user.profileImg}
          name={user.name}
          openChat={() => this.openChat(user._id)}
          removeFriend={() => this.removeUser(user._id)}
          allFriends
        />
      </div>
    );
  }
}

export default MatchWithUser;
