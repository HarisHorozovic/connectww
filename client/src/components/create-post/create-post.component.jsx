import React from 'react';

import './create-post.styles.scss';

class CreatePost extends React.Component {
  constructor() {
    super();

    this.state = {
      postText: '',
      imageToUpload: null
    };
  }

  handleChange = e => {
    this.setState({ postText: e.target.value });
  };

  createPost = () => {
    console.log(this.state.postText);
    this.setState({ postText: '' });
  };
  render() {
    const { hidden } = this.props;
    return (
      <div className={`card create-post ${hidden ? 'hidden' : ''}`}>
        <div className='create-post-item'>
          <textarea
            rows='10'
            placeholder='Say something...'
            onChange={this.handleChange}
            value={this.state.postText}
          ></textarea>
          <div className='post-upload'>
            <input type='text' placeholder='Image path' />
            <a href='/uploadImg' className='btn btn-grey'>
              &#x21ea;
            </a>
            <div
              className='btn post-img-btn btn-transparent'
              onClick={this.createPost}
            >
              &#x27A4;
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;