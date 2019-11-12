import React from 'react';

import './post-container.styles.scss';

// Components
import PostItem from '../post-item/post-item.component';

class PostContainer extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    return (
      <div className='post-item-container flex-hor-center'>
        <PostItem />
      </div>
    );
  }
}

export default PostContainer;
