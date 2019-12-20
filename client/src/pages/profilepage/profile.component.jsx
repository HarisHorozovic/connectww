import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './profile.styles.scss';

import { getUser } from '../../redux/user/user.actions';

// Components
import PostContainer from '../../components/post-container/post-container.component';
import SidebarLeft from '../../components/sidebar-left/sidebar-left.component';
import CreatePostToggle from '../../components/create-post-toggle/create-post-toggle.component';
import CreatePost from '../../components/create-post/create-post.component';
import MessagingContainer from '../../components/messaging/messaging.component';
import GalleryContainer from '../../components/gallery-container/gallery-container.component';
import OverviewContainer from '../../components/overview-container/overview-container.component';
import SidebarRight from '../../components/sidebar-right-container/sidebar-right-container.component';

class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      hidden: true,
      showSection: 'feed'
    };
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.userId);
  }

  toggleCreatePost = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  showPosts = () => {
    this.setState({ showSection: 'feed' });
  };

  showInfo = () => {
    this.setState({ showSection: 'info' });
  };

  showGallery = () => {
    this.setState({ showSection: 'gallery' });
  };

  render() {
    if (!this.props.currentUser) {
      return <Redirect to='/' />;
    } else {
      const { userId } = this.props.match.params;

      const posts = (
        <div className='full-width flex-hor-center'>
          {userId === this.props.currentUser._id ? (
            <div className='full-width flex-hor-center'>
              <CreatePostToggle toggleCreatePost={this.toggleCreatePost} />
              <CreatePost hidden={this.state.hidden} />
            </div>
          ) : null}

          <PostContainer />
        </div>
      );

      const info = (
        <div className='full-width flex-hor-center'>
          <OverviewContainer />
        </div>
      );
      const gallery = (
        <div className='full-width flex-hor-center'>
          <GalleryContainer match={userId} />
        </div>
      );
      return (
        <div className='profile-page'>
          <div className='profile-background flex-full-center'>
            <img src='../../../public/testall.jpg' alt='ProfileBackground' />
          </div>
          <div className='flex-wrap-container2'>
            <SidebarLeft match={userId} />
            <div className='profile-content flex-hor-center'>
              <div className='card main-header flex-wrap-center'>
                <div className='user-img'>
                  <img src='./img/user.png' alt='userImg' />
                </div>
                <div className='btn-container flex-wrap-center main-header-subnav'>
                  <span
                    onClick={this.showPosts}
                    className='btn btn-transparent post-btn'
                  >
                    Feed
                  </span>
                  <span
                    onClick={this.showInfo}
                    className='btn btn-transparent post-btn'
                  >
                    Info
                  </span>
                  <span
                    onClick={this.showGallery}
                    className='btn btn-transparent post-btn'
                  >
                    Gallery
                  </span>
                </div>
              </div>
              {this.state.showSection === 'feed'
                ? posts
                : this.state.showSection === 'info'
                ? info
                : gallery}
            </div>
            <SidebarRight title={'Gallery'} />
          </div>
          <MessagingContainer />
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: userId => dispatch(getUser(userId))
});

const mapStateToProps = ({ user: { currentUser, lookingAtUser } }) => ({
  currentUser,
  lookingAtUser
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
