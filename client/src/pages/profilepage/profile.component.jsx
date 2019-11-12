import React from 'react';

import './profile.styles.scss';

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
    const posts = (
      <div className='full-width flex-hor-center'>
        <CreatePostToggle toggleCreatePost={this.toggleCreatePost} />
        <CreatePost hidden={this.state.hidden} />
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
        <GalleryContainer />
      </div>
    );
    return (
      <div className='profile-page'>
        <div className='profile-background'>
          <img src='../../../public/testall.jpg' alt='ProfileBackground' />
        </div>
        <div className='flex-wrap-container2'>
          <SidebarLeft />
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

export default ProfilePage;
