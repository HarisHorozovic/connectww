import React from 'react';

import './joined-groups-container.styles.scss';

// Components
import GroupsItem from '../groups-item/groups-item.component';

class JoinedGroupsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      joinedGroups: [
        { _id: '1', groupName: 'g1' },
        { _id: '2', groupName: 'g2' },
        { _id: '3', groupName: 'g3' }
      ]
    };
  }

  leaveGroup = groupId => {
    // handle group joining
    console.log(`Left group with id ${groupId}`);
  };

  render() {
    const { joinedGroups } = this.state;
    return (
      <div className='groups-container content-container flex-hor-center'>
        <p>Joined Groups</p>
        {joinedGroups.length > 0
          ? joinedGroups.map(group => (
              <GroupsItem
                key={group._id}
                groupName={group.groupName}
                location='ingroup'
                leaveGroup={() => this.leaveGroup(group._id)}
              />
            ))
          : null}
      </div>
    );
  }
}

export default JoinedGroupsContainer;
