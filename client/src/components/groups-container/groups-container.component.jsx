import React from 'react';

import './groups-container.styles.scss';

// Components
import GroupsItem from '../groups-item/groups-item.component';

class GroupsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      groups: [
        { _id: '1', groupName: 'g1' },
        { _id: '2', groupName: 'g2' },
        { _id: '3', groupName: 'g3' }
      ]
    };
  }

  joinGroup = groupId => {
    // handle group joining
    console.log(`Joined group with id ${groupId}`);
  };

  render() {
    const { groups } = this.state;
    return (
      <div className='groups-container content-container flex-hor-center'>
        <p>Groups</p>
        {groups.length > 0
          ? groups.map(group => (
              <GroupsItem
                key={group._id}
                groupName={group.groupName}
                location='joingroups'
                joinGroup={() => this.joinGroup(group._id)}
              />
            ))
          : null}
      </div>
    );
  }
}

export default GroupsContainer;
