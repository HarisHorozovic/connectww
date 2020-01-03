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
    this.setState({ postText: e.target.value });
  };

  handleFileChange = e => {
    this.setState({ imageToUpload: e.target.files[0] });
  };

  createPostClient = e => {
    e.preventDefault();

    let data = new FormData();
    if (this.state.imageToUpload) {
      data.append('uploadedImg', this.state.imageToUpload);

      this.props.createPost(data);
    } else {
      this.props.createPost({ postText: this.state.postText });
    }

    this.setState({ postText: '', postImg: null });
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
            <input
              type='file'
              name='uploadedImg'
              onChange={this.handleFileChange}
            />
            <div
              className='btn post-img-btn btn-main'
              onClick={this.createPostClient}
            >
              <i className='fa fa-arrow-circle-right'></i>
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
