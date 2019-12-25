import React from 'react';
import { connect } from 'react-redux';

import './gallery-item.styles.scss';

const GalleryItem = ({ location, isCurrentUser, image, lookingAtUser }) => {
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
      <div className='btn-container flex-full-center'>
        <span href='/likeFn' className='btn btn-like post-btn'>
          &#x2764; <span>10</span>
        </span>
        <span href='/unlikeFn' className='btn btn-dislike post-btn'>
          &#x2661; <span>10</span>
        </span>
        {isCurrentUser === true ? (
          <span className='btn btn-transparent post-btn'>
            &#x2699; <span>Main</span>
          </span>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user: { lookingAtUser } }) => ({
  lookingAtUser
});

export default connect(mapStateToProps)(GalleryItem);
