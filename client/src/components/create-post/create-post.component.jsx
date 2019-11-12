import React from 'react';

import './create-post.styles.scss';

class CreatePost extends React.Component {
  constructor() {
    super();

    this.state = {};
  }
  render() {
    return (
      <div className='card create-post'>
        <div className='create-post-item'>
          <textarea rows='10' placeholder='Say something...'></textarea>
          <div className='post-upload'>
            <input type='text' placeholder='Image path' />
            <a href='/uploadImg' className='btn btn-grey'>
              &#x21ea;
            </a>
            <a href='/postFn' className='btn post-img-btn btn-transparent'>
              &#x27A4;
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
