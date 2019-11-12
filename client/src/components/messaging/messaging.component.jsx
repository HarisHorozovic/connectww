import React from 'react';

import './messaging.styles.scss';

//Components
import FriendList from '../friend-list/friend-list.component';
import MessagesContainer from '../messages-container/messages-container.component';

class MessagingContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        _id: '1',
        firstName: 'Haris',
        lastName: 'Horozovic',
        email: 'haris@email.ca',
        password: 'test1234',
        DOB: '20.04.2019',
        createdAt: 'created account',
        gender: 'male',
        relationship: 'available',
        gallery: 'ObjectId Gallery',
        location: 'Zavidovici',
        bio: 'short bio',
        joinedGroups: [
          {
            groupId: 'max 10'
          }
        ],
        friends: [
          {
            _id: 'users ObjectId',
            name: 'first + last name',
            profileImg: 'profileImg'
          },
          {
            _id: 'users ObjectId1',
            name: 'Mike Cok',
            profileImg: 'profileImg'
          }
        ],
        friendRequests: [
          {
            _id: 'users ObjectId',
            name: 'first + last name',
            profileImg: 'profileImg'
          }
        ],
        experience: [
          {
            _id: 'expId',
            company: 'test',
            position: 'test',
            from: '22.1.2019',
            to: '22.3.2019',
            current: false,
            desc: 'test'
          }
        ],
        education: [
          {
            id: 'eduId',
            school: 'test',
            degree: 'test',
            studied: 'test',
            from: '22.1.2019',
            to: '22.3.2019',
            current: false,
            desc: 'test'
          }
        ]
      }
    };
  }

  render() {
    return (
      <div className='messaging-container'>
        <FriendList friends={this.state.user.friends} />
        <MessagesContainer />
      </div>
    );
  }
}

export default MessagingContainer;
