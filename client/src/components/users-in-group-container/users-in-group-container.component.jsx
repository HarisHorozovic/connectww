import React from 'react';

import './users-in-group-container.styles.scss';

// Components
import GroupUsersItem from '../group-users-item/group-users-item.component';

class UsersInGroupContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      members: [
        { _id: '1', name: 'user1' },
        { _id: '2', name: 'user2' },
        { _id: '3', name: 'user3' }
      ]
    };
  }

  removeUser = userId => {
    //remove user from group if the user removing him is creator of the group
    console.log(`Removed user with the id ${userId}`);
  };

  render() {
    const { members } = this.state;
    return (
      <div className='group-users-container content-container flex-hor-center'>
        <p>Users in Group</p>
        {members.length > 0
          ? members.map(member => (
              <GroupUsersItem
                key={member._id}
                name={member.name}
                userId={member._id}
                removeUser={() => this.removeUser(member._id)}
              />
            ))
          : null}
      </div>
    );
  }
}

export default UsersInGroupContainer;
