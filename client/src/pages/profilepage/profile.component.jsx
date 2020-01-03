import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './profile.styles.scss';

import { getUser } from '../../redux/user/user.actions';
import { getUserGallery } from '../../redux/gallery/gallery.actions';

// Components
import Spinner from '../../components/spinner/spinner.component';
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
    if (!this.props.lookingAtUser) {
      this.props.getUser(this.props.match.params.userId);
    }

    this.props.getUserGallery(this.props.match.params.userId);
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
    const { lookingAtUser, loading } = this.props;
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
          <GalleryContainer />
        </div>
      );

      return (
        <div className='profile-page'>
          {loading === true && <Spinner />}
          <div className='profile-background flex-full-center'>
            {lookingAtUser && lookingAtUser.coverImage !== 'user.png' ? (
              <img
                src={require(`../../img/${lookingAtUser._id}/${lookingAtUser.coverImage}`)}
                alt='ProfileBackground'
              />
            ) : (
              <img
                src={require(`../../img/user.png`)}
                alt='ProfileBackground'
              />
            )}
          </div>
          <div className='flex-wrap-container2'>
            <SidebarLeft match={userId} />
            <div className='profile-content flex-hor-center'>
              <div className='card main-header flex-wrap-center'>
                <div className='btn-container flex-wrap-center main-header-subnav'>
                  <span
                    onClick={this.showPosts}
                    className='btn btn-main post-btn'
                  >
                    Feed
                  </span>
                  <span
                    onClick={this.showInfo}
                    className='btn btn-main post-btn'
                  >
                    Info
                  </span>
                  <span
                    onClick={this.showGallery}
                    className='btn btn-main post-btn'
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
  getUser: userId => dispatch(getUser(userId)),
  getUserGallery: userId => dispatch(getUserGallery(userId))
});

const mapStateToProps = ({
  user: { currentUser, lookingAtUser, loading }
}) => ({
  currentUser,
  lookingAtUser,
  loading
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
);
