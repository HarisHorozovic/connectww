import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './post-container.styles.scss';

import {
  getPostsFromFriends,
  getUsersPosts
} from '../../redux/posts/posts.actions';

// Components
import Spinner from '../spinner/spinner.component';
import PostItem from '../post-item/post-item.component';

class PostContainer extends React.Component {
  componentDidMount() {
    if (!this.props.match.params.userId) {
      this.props.getPostsFromFriends();
    } else {
      this.props.getUsersPosts(this.props.match.params.userId);
    }
  }
  render() {
    const { posts, postLoading } = this.props;

    return (
      <div className='post-item-container flex-hor-center'>
        {!posts && postLoading === true ? (
          <Spinner />
        ) : (
          posts.map(post => (
            <PostItem
              key={post._id}
              postId={post._id}
              author={post.author}
              img={post.postImg}
              text={post.text}
              createdAt={post.createdAt}
              likes={post.likes}
              dislikes={post.dislikes}
            />
          ))
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getPostsFromFriends: () => dispatch(getPostsFromFriends()),
  getUsersPosts: userId => dispatch(getUsersPosts(userId))
});

const mapStateToProps = ({
  posts: { posts, postLoading },
  user: { currentUser }
}) => ({
  posts,
  postLoading,
  currentUser
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostContainer)
);
