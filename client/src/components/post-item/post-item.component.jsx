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
      hidden: true,
      likesCl: 0,
      dislikesCl: 0,
      hasLiked: false,
      hasDisliked: false
    };
  }

  componentDidMount() {
    this.setState({
      likesCl: this.props.likes.length,
      dislikesCl: this.props.dislikes.length
    });

    this.props.likes.map(like =>
      like._id === this.props.currentUser._id
        ? this.setState({ hasLiked: true })
        : this.setState({ hasLiked: false })
    );

    this.props.dislikes.map(dislike =>
      dislike._id === this.props.currentUser._id
        ? this.setState({ hasDisliked: true })
        : this.setState({ hasDisliked: false })
    );
  }

  showComments = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  handleLike = postId => {
    this.state.hasLiked === true
      ? this.setState({ likesCl: this.state.likesCl - 1, hasLiked: false })
      : this.setState({ likesCl: this.state.likesCl + 1, hasLiked: true });
    this.props.likePost(postId);
  };

  handleDislike = postId => {
    this.state.hasDisliked === true
      ? this.setState({
          dislikesCl: this.state.dislikesCl - 1,
          hasDisliked: false
        })
      : this.setState({
          dislikesCl: this.state.dislikesCl + 1,
          hasDisliked: true
        });
    this.props.dislikePost(postId);
  };

  removePost = postId => {
    this.props.removePost(postId);
  };

  render() {
    const { postId, img, text, createdAt, author } = this.props;
    const { hidden, likesCl, dislikesCl, hasDisliked, hasLiked } = this.state;

    // Format the date from MongoDB
    const created = Date(createdAt).split(' ');
    const showDate = [created[2], created[1], created[3]].join('-');

    return (
      <div className='card post-item'>
        <div className='flex-full-center post-item-header'>
          <div className='user-meta flex-row-end'>
            {author._id !== undefined ? (
              <img
                src={require(`../../img${
                  author.profileImage !== 'user.png' ? `/${author._id}/` : '/'
                }${author.profileImage}`)}
                alt='userImg'
              />
            ) : (
              <img src={require('../../img/user.png')} alt='userImg' />
            )}

            <div className='text-info'>
              <Link to={`/profile/${author._id}`}>{author.firstName}</Link>
              <p className='lead'>{showDate}</p>
            </div>
          </div>
          {this.props.currentUser._id === author._id ? (
            <button
              className='btn btn-red flex-row-end'
              onClick={() => this.removePost(postId)}
            >
              <i className='fas fa-trash'></i>
            </button>
          ) : null}
        </div>
        <div className='post-content flex-hor-center'>
          {!img ? (
            <p className='post-text'>{text}</p>
          ) : (
            <div className='post-img flex-hor-center'>
              <img
                src={require(`../../img/${author._id}/${img}`)}
                alt='userImg'
              />
              <p>{text}</p>
            </div>
          )}

          <div className='btn-container flex-full-center'>
            <div
              className={`btn ${
                hasLiked === true ? 'btn-transparent' : 'btn-like'
              } post-btn`}
              onClick={() => this.handleLike(postId)}
            >
              <i className='fas fa-heart'></i>
              <span>{likesCl}</span>
            </div>
            <div
              className={`btn ${
                hasDisliked === true ? 'btn-transparent' : 'btn-dislike'
              } post-btn`}
              onClick={() => this.handleDislike(postId)}
            >
              <i className='fas fa-heart-broken'></i> <span>{dislikesCl}</span>
            </div>
            <div className='btn btn-main post-btn' onClick={this.showComments}>
              <i className='fas fa-comments'></i>
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
