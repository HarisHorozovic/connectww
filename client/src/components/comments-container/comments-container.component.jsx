import React from 'react';

import './comments-container.styles.scss';

// Components
import CommentItem from '../comments/comments.component';

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
      ]
    };
  }

  fetchComments = postId => {
    //Fetch comments from database
    // this.setState({ comments: fetchedComments });
  };

  componentDidMount() {
    // fetchComments(this.props.postId);
  }

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
          <input type='text' placeholder='Say something...' />
          <button className='btn btn-transparent'>&#x27A4;</button>
        </div>
      </div>
    );
  }
}

export default CommentsContainer;
