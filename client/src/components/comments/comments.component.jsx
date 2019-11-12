import React from 'react';

const Comments = () => {
  return (
    <div className='comment-item flex-hor-center'>
      <div className='comment-item-header flex-wrap-center'>
        <img src='./img/user.png' alt='userImg' />
        <a href='/userProfile'>Name</a>
      </div>
      <div className='comment-item-text'>
        <p>Comment goes here</p>
      </div>
      <div className='create-comment flex-wrap-center'>
        <input type='text' placeholder='Say something...' />
        <button className='btn btn-transparent'>&#x27A4;</button>
      </div>
    </div>
  );
};

export default Comments;
