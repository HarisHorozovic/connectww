import React from 'react';

import './gallery-item.styles.scss';

const GalleryItem = ({ location }) => {
  return (
    <div
      className={`${
        location === 'sidebar' ? 'sidebar-gallery-item' : 'main-gallery-item'
      }`}
    >
      <img src='./img/testall.jpg' />
      <div className='btn-container flex-full-center'>
        <span href='/likeFn' className='btn btn-transparent post-btn'>
          &#x2764; <span>10</span>
        </span>
        <span href='/unlikeFn' className='btn btn-transparent post-btn'>
          &#x2661; <span>10</span>
        </span>
        <span className='btn btn-transparent post-btn'>
          &#x2699; <span>Main</span>
        </span>
      </div>
    </div>
  );
};

export default GalleryItem;
