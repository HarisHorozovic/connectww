import React from 'react';
import { connect } from 'react-redux';

import {
  createComment,
  getAllCommentsForPost
} from '../../redux/comments/comments.actions';

import './comments-container.styles.scss';

// Components
import CommentItem from '../comments/comments.component';
import FormInput from '../form-input/form-input.component';

class CommentsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      text: ''
    };
  }

  componentDidMount() {
    this.props.getAllCommentsForPost(this.props.postId);
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
    const { hidden, comments, postId } = this.props;
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
            &#x27A4;
          </button>
        </div>
        {comments
          ? comments.map(comment => {
              return comment.post === postId ? (
                <CommentItem
                  key={comment._id}
                  text={comment.text}
                  commentId={comment._id}
                  userName={comment.author.firstName}
                  postId={postId}
                  authorId={comment.author._id}
                  createdAt={comment.createdAt}
                  userImg={comment.userImg}
                />
              ) : null;
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = ({ comments: { comments } }) => ({
  comments
});

const mapDispatchToProps = dispatch => ({
  createComment: (postId, commentBody) =>
    dispatch(createComment(postId, commentBody)),
  getAllCommentsForPost: postId => dispatch(getAllCommentsForPost(postId))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
