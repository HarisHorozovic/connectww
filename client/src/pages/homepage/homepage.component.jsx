import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './homepage.styles.scss';

// Components
import PostContainer from '../../components/post-container/post-container.component';
import CreatePostToggle from '../../components/create-post-toggle/create-post-toggle.component';
import CreatePost from '../../components/create-post/create-post.component';
import MessagingContainer from '../../components/messaging/messaging.component';

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      hidden: true
    };
  }

  toggleCreatePost = () => {
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    if (!this.props.currentUser) {
      return <Redirect to='/' />;
    } else {
      return (
        <div className='homepage'>
          <div className='flex-wrap-container'>
            <div className='main-content flex-hor-center'>
              <CreatePostToggle toggleCreatePost={this.toggleCreatePost} />
              <CreatePost hidden={this.state.hidden} />
              <PostContainer />
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

export default connect(mapStateToProps)(HomePage);
