import React from 'react';

import './gallery-item.styles.scss';

const GalleryItem = ({ location, otherUser }) => {
  return (
    <div
      className={`${
        location === 'sidebar' ? 'sidebar-gallery-item' : 'main-gallery-item'
      }`}
    >
      <img src='./img/testall.jpg' alt='GalleryImg' />
      <div className='btn-container flex-full-center'>
        <span href='/likeFn' className='btn btn-like post-btn'>
          &#x2764; <span>10</span>
        </span>
        <span href='/unlikeFn' className='btn btn-dislike post-btn'>
          &#x2661; <span>10</span>
        </span>
        {otherUser === true ? (
          <span className='btn btn-transparent post-btn'>
            &#x2699; <span>Main</span>
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default GalleryItem;
