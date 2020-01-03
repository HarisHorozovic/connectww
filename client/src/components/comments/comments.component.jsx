import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteComment } from '../../redux/comments/comments.actions';

import './comments.styles.scss';

class CommentItem extends React.Component {
  render() {
    const {
      text,
      createdAt,
      userName,
      authorId,
      userImg,
      commentId,
      postId,
      currentUser
    } = this.props;
    // Format the date from MongoDB
    const created = Date(createdAt).split(' ');
    const showDate = [created[2], created[1], created[3]].join('-');

    return (
      <div className='comment-item flex-hor-center'>
        <div className='comment-item-header flex-wrap-center'>
          <img
            src={require(`../../img${
              userImg !== 'user.png' ? `/${authorId}/` : '/'
            }${userImg}`)}
            alt='userImg'
          />
          <Link to={`/profile/${authorId}`}>{userName}</Link>
          <p className='lead'>{showDate}</p>
          {currentUser._id === authorId ? (
            <button
              className='btn btn-red flex-row-end'
              onClick={() => this.props.deleteComment(postId, commentId)}
            >
              &#x2612;
            </button>
          ) : null}
        </div>
        <div className='comment-item-text'>
          <p>{text}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

const mapDispatchToProps = dispatch => ({
  deleteComment: (postId, commentId) =>
    dispatch(deleteComment(postId, commentId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
