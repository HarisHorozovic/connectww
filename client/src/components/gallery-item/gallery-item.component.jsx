import React from 'react';
import { connect } from 'react-redux';

import './gallery-item.styles.scss';

import {
  setCoverImage,
  setProfileImage
} from '../../redux/gallery/gallery.actions';

const GalleryItem = ({
  location,
  image,
  lookingAtUser,
  currentUser,
  setCoverImage,
  setProfileImage
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
          <span
            onClick={setCoverClient}
            className='btn btn-transparent post-btn'
          >
            Set Cover
          </span>
        </div>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setCoverImage: newCoverImage => dispatch(setCoverImage(newCoverImage)),
  setProfileImage: newProfileImg => dispatch(setProfileImage(newProfileImg))
});

const mapStateToProps = ({ user: { lookingAtUser, currentUser } }) => ({
  lookingAtUser,
  currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryItem);
