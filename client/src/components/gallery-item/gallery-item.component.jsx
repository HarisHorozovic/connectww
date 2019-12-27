import React from 'react';
import { connect } from 'react-redux';

import './gallery-item.styles.scss';

import {
  setCoverImage,
  setProfileImage,
  removeImage
} from '../../redux/gallery/gallery.actions';

const GalleryItem = ({
  location,
  image,
  lookingAtUser,
  currentUser,
  setCoverImage,
  setProfileImage,
  removeImage
}) => {
  const setMainClient = () => {
    setProfileImage(image.imgName);
  };

  const setCoverClient = () => {
    setCoverImage(image.imgName);
  };
  return (
    <div
      className={`${
        location === 'sidebar' ? 'sidebar-gallery-item' : 'main-gallery-item'
      }`}
    >
      <img
        src={require(`../../img/${lookingAtUser._id}/${image.imgName}`)}
        alt='ProfileBackground'
      />
      {currentUser._id === lookingAtUser._id ? (
        <div className='btn-container flex-full-center'>
          <span onClick={setMainClient} className='btn btn-main post-btn'>
            Set Main
          </span>
          <span onClick={setCoverClient} className='btn btn-main'>
            Set Cover
          </span>
          <span
            className='btn btn-red btn-img-remove'
            onClick={() => removeImage(image.imgName)}
          >
            <i className='fas fa-trash'></i>
          </span>
        </div>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setCoverImage: newCoverImage => dispatch(setCoverImage(newCoverImage)),
  setProfileImage: newProfileImg => dispatch(setProfileImage(newProfileImg)),
  removeImage: imageName => dispatch(removeImage(imageName))
});

const mapStateToProps = ({ user: { lookingAtUser, currentUser } }) => ({
  lookingAtUser,
  currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem);
