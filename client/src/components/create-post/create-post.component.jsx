import React from 'react';
import { connect } from 'react-redux';

import './create-post.styles.scss';

import { createPost } from '../../redux/posts/posts.actions';

class CreatePost extends React.Component {
  constructor() {
    super();

    this.state = {
      postText: '',
      imageToUpload: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createPost = () => {
    const postObj = {
      text: this.state.postText,
      postImg: this.state.imageToUpload
    };
    console.log(this.state);
    this.setState({ postText: '', postImg: null });
    this.props.createPost(postObj);
  };
  render() {
    const { hidden } = this.props;
    return (
      <div className={`card create-post ${hidden ? 'hidden' : ''}`}>
        <div className='create-post-item'>
          <textarea
            rows='10'
            placeholder='Say something...'
            name='postText'
            onChange={this.handleChange}
            value={this.state.postText}
          ></textarea>
          <div className='post-upload'>
            <input type='text' placeholder='Image path' />
            <a href='/uploadImg' className='btn btn-main'>
              &#x21ea;
            </a>
            <div
              className='btn post-img-btn btn-main'
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

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post))
});

export default connect(null, mapDispatchToProps)(CreatePost);
