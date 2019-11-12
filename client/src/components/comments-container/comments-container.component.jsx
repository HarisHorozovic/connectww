import React from 'react';

import './comments-container.styles.scss';

// Components
import Comments from '../comments/comments.component';

class CommentsContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <div className='comment-container flex-hor-center'>
        <Comments />
      </div>
    );
  }
}

export default CommentsContainer;
