import React from 'react';
import { connect } from 'react-redux';

import './messaging.styles.scss';

//Components
import FriendList from '../friend-list/friend-list.component';
import MessagesContainer from '../messages-container/messages-container.component';

class MessagingContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  // TODO:
  // Import the socket so we can use the events, on click of the user in the user list we will get the messages and display
  // those messages in our messages page, in the header we need to display the user name and image,
  // sending messages and receiving messages should be done the same as in the messages page

  render() {
    return (
      <div className='messaging-container'>
        <FriendList friends={this.props.currentUser.friends} />
        <MessagesContainer />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(mapStateToProps)(MessagingContainer);
