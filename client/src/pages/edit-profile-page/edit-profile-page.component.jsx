import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './edit-profile-page.styles.scss';

// Components
import SidebarLeft from '../../components/sidebar-left/sidebar-left.component';
import MessagingContainer from '../../components/messaging/messaging.component';
import EditMainInfo from '../../components/edit-main-info/edit-main-info.component';
import AddExperience from '../../components/add-experience/add-experience.component';
import AddEducation from '../../components/add-education/add-education.component';
import FriendRequestsContainer from '../../components/friend-requests-container/friend-requests-container.component';
import EditFriendsContainer from '../../components/edit-friends-container/edit-friends-container.component';
import ChangeCredentials from '../../components/change-credentials/change-credentials.component';
import DeactivateAccount from '../../components/deactivate-account/deactivate-account.component';

class EditProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      showSection: 'info'
    };
  }

  infoSection = () => {
    this.setState({ showSection: 'info' });
  };

  addExp = () => {
    this.setState({ showSection: 'exp' });
  };

  addEdu = () => {
    this.setState({ showSection: 'edu' });
  };

  friendRequests = () => {
    this.setState({ showSection: 'friendReq' });
  };

  friends = () => {
    this.setState({ showSection: 'friends' });
  };

  changeLoginCreds = () => {
    this.setState({ showSection: 'changeCreds' });
  };

  deactivateAcc = () => {
    this.setState({ showSection: 'deactivate' });
  };

  toRender = () => {
    switch (this.state.showSection) {
      case 'info':
        return <EditMainInfo />;
      case 'exp':
        return <AddExperience />;
      case 'edu':
        return <AddEducation />;
      case 'friendReq':
        return <FriendRequestsContainer />;
      case 'friends':
        return <EditFriendsContainer />;
      case 'changeCreds':
        return <ChangeCredentials />;
      case 'deactivate':
        return <DeactivateAccount />;
      default:
        return <EditMainInfo />;
    }
  };
  render() {
    if (!this.props.currentUser) {
      return <Redirect to='/' />;
    } else {
      const renderItem = this.toRender();
      return (
        <div className='profile-page'>
          {/* <!-- Edit Page main content--> */}
          <div className='edit-page flex-wrap-container'>
            {/* <!-- Left Sidebar --> */}
            <SidebarLeft
              infoSection={this.infoSection}
              addExp={this.addExp}
              addEdu={this.addEdu}
              friendRequests={this.friendRequests}
              friends={this.friends}
              changeLoginCreds={this.changeLoginCreds}
              deactivateAcc={this.deactivateAcc}
            />
            {/* <!-- Main container --> */}
            <div className='main-content card flex-hor-center'>
              {renderItem}
            </div>
          </div>

          <MessagingContainer />
        </div>
      );
    }
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(mapStateToProps)(EditProfilePage);
