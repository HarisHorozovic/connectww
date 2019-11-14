import React from 'react';

import './comments-container.styles.scss';

// Components
import CommentItem from '../comments/comments.component';
import FormInput from '../form-input/form-input.component';

class CommentsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      comments: [
        {
          _id: 'commentId',
          user: 'ObjectId User1',
          text: 'post text',
          createdAt: 'created comment'
        },
        {
          _id: 'commentId',
          user: 'ObjectId User',
          text: 'comment goes here',
          createdAt: 'created comment'
        }
      ],
      commentText: ''
    };
  }

  fetchComments = postId => {
    //Fetch comments from database
    // this.setState({ comments: fetchedComments });
  };

  componentDidMount() {
    // fetchComments(this.props.postId);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  postComment = () => {
    console.log(this.state.commentText);
    this.setState({ commentText: '' });
  };

  render() {
    const { hidden } = this.props;
    return (
      <div
        className={`comment-container flex-hor-center ${
          hidden ? 'hidden' : ''
        }`}
      >
        {this.state.comments.map(comment => (
          <CommentItem
            key={comment.user}
            user={comment.user}
            text={comment.text}
            createdAt={comment.createdAt}
          />
        ))}
        <div className='create-comment flex-wrap-center'>
          <FormInput
            type='text'
            name='commentText'
            placeholder='Say something...'
            value={this.state.commentText}
            handleChange={this.handleChange}
          />
          <button className='btn btn-transparent' onClick={this.postComment}>
            &#x27A4;
          </button>
        </div>
      </div>
    );
  }
}

export default CommentsContainer;
