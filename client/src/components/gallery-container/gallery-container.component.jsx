import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './gallery-container.styles.scss';

import { uploadImage } from '../../redux/gallery/gallery.actions';

//Components
import GalleryItem from '../gallery-item/gallery-item.component';

class GalleryContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      fileToUpload: null
    };
  }

  handleFileChange = e => {
    this.setState({ fileToUpload: e.target.files[0] });
  };

  uploadImageClient = () => {
    const data = new FormData();
    data.append('uploadedImg', this.state.fileToUpload);
    this.props.uploadImage(data);
  };

  render() {
    const { currentUser, lookingAtUser, images } = this.props;
    let isCurrentUser =
      this.props.match.params.userId === currentUser._id ? true : false;
    let uploadImg = (
      <div className='main-gallery-header'>
        <div className='flex-wrap-center upload-form'>
          <input
            type='file'
            name='uploadedImg'
            onChange={this.handleFileChange}
          />
          <button className='btn btn-main' onClick={this.uploadImageClient}>
            Upload Image
          </button>
        </div>
      </div>
    );

    return (
      <div className='gallery-main-content card flex-hor-center'>
        {isCurrentUser ? uploadImg : null}
        <div className='main-gallery-container flex-wrap-center'>
          {images.length > 0 ? (
            images.map(image => (
              <GalleryItem
                key={image._id}
                isCurrentUser={isCurrentUser}
                image={image}
                user={lookingAtUser}
              />
            ))
          ) : (
            <p>No images to show</p>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  uploadImage: image => dispatch(uploadImage(image))
});

const mapStateToProps = ({ user: { currentUser }, gallery: { images } }) => ({
  currentUser,
  images
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GalleryContainer)
);
