import React from 'react';

import './friend-list.styles.scss';

//Components
import FriendListItem from '../friend-list-item/friend-list-item.component';

class FriendList extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className='friend-list'>
        <div className='friend-list-header' onClick='openChatFunc'>
          <p>Online Friends</p>
        </div>
        <div className='friend-list-container'>
          <FriendListItem />
        </div>
      </div>
    );
  }
}

export default FriendList;
