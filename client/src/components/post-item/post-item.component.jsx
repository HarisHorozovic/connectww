import React from 'react';

import './post-item.styles.scss';

//Components
import CommentsContainer from '../comments-container/comments-container.component';

const PostItem = () => {
  return (
    <div className='card post-item'>
      <div className='flex-full-center post-item-header'>
        <div className='user-meta flex-row-end'>
          <img src='./img/user.png' alt='userImg' />
          <div className='text-info'>
            <a href='/userProfile'>User Name</a>
            <p className='lead'>Location/Age</p>
          </div>
        </div>
      </div>
      {/* <!-- Post content --> */}
      <div className='post-content flex-hor-center'>
        {/* <!-- Only this part changes for the post types without image --> */}
        {/* <!-- <p className="post-text">Text goes here</p> --> */}
        {/* <!-- Only this part changes for the post types without image --> */}

        {/* <!-- Only this part changes for the post types with image --> */}
        <div className='post-img flex-hor-center'>
          <img src='./img/testall.jpg' alt='postImg' />
          <p>Image desc here</p>
        </div>
        {/* <!-- Only this part changes for the post types with image --> */}

        <div className='btn-container flex-full-center'>
          <a href='/likeFn' className='btn btn-transparent post-btn'>
            &#x2764;
            <span>10</span>
          </a>
          <a href='/unlikeFn' className='btn btn-transparent post-btn'>
            &#x2661; <span>10</span>
          </a>
          <a href='/commentShowHideFn' className='btn btn-transparent post-btn'>
            &#x275E; <span>10</span>
          </a>
        </div>
      </div>
      {/* <!-- Post content -->*/}
      {/* <!-- Comments --> */}
      <CommentsContainer />
      {/* <!-- Comments --> */}
    </div>
  );
};

export default PostItem;
