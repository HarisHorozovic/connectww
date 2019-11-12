import React from 'react';

import './friend-list-item.styles.scss';

class FriendListItem extends React.Component {
  openChatSession = () => {
    console.log(
      'Opened chat with the friend whose id is: ',
      this.props.friendId
    );
    //Open Friend List chat, parse user and friendId, check for the existing session between the users
    //if there is no session, create new chat session
  };
  render() {
    const { name, profileImg } = this.props;
    return (
      <div
        className='friend-list-item flex-full-center'
        onClick={this.openChatSession}
      >
        <img src={profileImg} alt={name} className='chat-img' />
        <a href='toUserProfile'>{name}</a>
        <div className='green-dot'></div>
      </div>
    );
  }
}

export default FriendListItem;
