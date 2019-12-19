import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './post-item.styles.scss';

import {
  removePost,
  likePost,
  dislikePost
} from '../../redux/posts/posts.actions';

//Components
import CommentsContainer from '../comments-container/comments-container.component';

class PostItem extends React.Component {
  constructor() {
    super();

    this.state = {
      userImg: '',
      hidden: true
    };
  }

  showComments = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  handleLike = postId => {
    this.props.likePost(postId);
  };

  handleDislike = postId => {
    this.props.dislikePost(postId);
  };

  removePost = postId => {
    this.props.removePost(postId);
  };

  render() {
    const {
      postId,
      img,
      text,
      createdAt,
      likes,
      dislikes,
      author
    } = this.props;
    const { hidden, userImg } = this.state;

    return (
      <div className='card post-item'>
        <div className='flex-full-center post-item-header'>
          <div className='user-meta flex-row-end'>
            <img src={userImg} alt='userImg' />
            <div className='text-info'>
              <Link to={`/profile/${author._id}`}>{author.firstName}</Link>
              <p className='lead'>{createdAt}</p>
            </div>
          </div>
          {this.props.currentUser.data.user._id === author._id ? (
            <button
              className='btn btn-red flex-row-end'
              onClick={() => this.removePost(postId)}
            >
              &#x2612;
            </button>
          ) : null}
        </div>
        <div className='post-content flex-hor-center'>
          {img === null ? (
            <p className='post-text'>{text}</p>
          ) : (
            <div className='post-img flex-hor-center'>
              <img src={img} alt='postImg' />
              <p>{text}</p>
            </div>
          )}

          <div className='btn-container flex-full-center'>
            <div
              className='btn btn-transparent post-btn'
              onClick={() => this.handleLike(postId)}
            >
              &#x2764;
              <span>{likes ? likes.length : 0}</span>
            </div>
            <div
              className='btn btn-transparent post-btn'
              onClick={() => this.handleDislike(postId)}
            >
              &#x2661; <span>{dislikes ? dislikes.length : 0}</span>
            </div>
            <div
              className='btn btn-transparent post-btn'
              onClick={this.showComments}
            >
              &#x275E;
            </div>
          </div>
        </div>
        <CommentsContainer postId={postId} hidden={hidden} />
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

const mapDispatchToProps = dispatch => ({
  removePost: postId => dispatch(removePost(postId)),
  likePost: postId => dispatch(likePost(postId)),
  dislikePost: postId => dispatch(dislikePost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
