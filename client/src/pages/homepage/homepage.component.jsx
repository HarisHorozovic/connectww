import React from 'react';
import { connect } from 'react-redux';

import { setUser } from '../../redux/user/user.actions';

import './homepage.styles.scss';

// Components
import PostContainer from '../../components/post-container/post-container.component';
import SidebarLeft from '../../components/sidebar-left/sidebar-left.component';
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

  componentDidMount() {
    this.props.setUser({
      email: 'haris@email.ca',
      password: 'test1234'
    });
  }

  toggleCreatePost = () => {
    this.setState({ hidden: !this.state.hidden });
  };
  render() {
    return (
      <div className='homepage'>
        <div className='flex-wrap-container'>
          <SidebarLeft location={'homepage'} />
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

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

export default connect(null, mapDispatchToProps)(HomePage);
