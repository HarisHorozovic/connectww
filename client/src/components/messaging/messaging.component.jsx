import React from 'react';

import './messaging.styles.scss';

//Components
import FriendList from '../friend-list/friend-list.component';
import MessagesContainer from '../messages-container/messages-container.component';

const MessagingContainer = () => {
  return (
    <div className='messaging-container'>
      <FriendList />
      <MessagesContainer />
    </div>
  );
};

export default MessagingContainer;
