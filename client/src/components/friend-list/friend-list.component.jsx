import React from 'react';

import './friend-list.styles.scss';

//Components
import FriendListItem from '../friend-list-item/friend-list-item.component';
import { connect } from 'react-redux';

class FriendList extends React.Component {
  constructor() {
    super();

    this.state = {
      hidden: true
    };
  }

  openFriendList = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  openChatSession = id => {
    //Open Friend List chat, parse user and friendId, check for the existing session between the users
    //if there is no session, create new chat session
    console.log('Opened chat with the friend whose id is: ', id);
  };
  render() {
    const { hidden } = this.state;
    const { friends } = this.props.currentUser;
    return (
      <div className='friend-list'>
        <div className='friend-list-header' onClick={this.openFriendList}>
          <p>Online Friends</p>
        </div>
        <div
          className={`friend-list-container flex-hor-center ${
            hidden ? 'hidden' : ''
          }`}
        >
          {friends.length > 0
            ? 'No friends to show'
            : friends.map(friend => (
                <FriendListItem
                  openChatSession={() => this.openChatSession(friend._id)}
                  key={friend._id}
                  friendId={friend._id}
                  name={friend.name}
                  profileImg={friend.profileImage}
                />
              ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(mapStateToProps)(FriendList);
