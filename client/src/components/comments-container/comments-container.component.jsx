import React from 'react';
import { connect } from 'react-redux';

import { createComment } from '../../redux/comments/comments.actions';

import './comments-container.styles.scss';

// Components
import Spinner from '../spinner/spinner.component';
import CommentItem from '../comments/comments.component';
import FormInput from '../form-input/form-input.component';

class CommentsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      text: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postComment = () => {
    const { text } = this.state;
    this.props.createComment(this.props.postId, text);
    this.setState({ text: '' });
  };

  render() {
    const { hidden, comments, postId, commentLoading } = this.props;
    return (
      <div
        className={`comment-container flex-hor-center ${
          hidden ? 'hidden' : ''
        }`}
      >
        <div className='create-comment flex-wrap-center'>
          <FormInput
            type='text'
            name='text'
            placeholder='Say something...'
            value={this.state.text}
            handleChange={this.handleChange}
          />
          <button className='btn btn-main' onClick={this.postComment}>
            <i className='fas fa-arrow-circle-right'></i>
          </button>
        </div>
        {comments.length < 1 && commentLoading === true ? (
          <Spinner />
        ) : (
          comments.map(comment => {
            return (
              <CommentItem
                key={comment._id}
                text={comment.text}
                commentId={comment._id}
                userName={comment.author.firstName}
                postId={postId}
                authorId={comment.author._id}
                createdAt={comment.createdAt}
                userImg={comment.author.profileImage}
              />
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ comments: { comments, commentLoading } }) => ({
  comments
});

const mapDispatchToProps = dispatch => ({
  createComment: (postId, commentBody) =>
    dispatch(createComment(postId, commentBody))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
