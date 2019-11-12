import React from 'react';

import './create-post-toggle.styles.scss';

const CreatePostToggle = () => {
  return (
    <div className='card flex-full-center post-meta'>
      <img src='./img/user.png' alt='userImg' />
      <div className='btn-container'>
        <button className='btn btn-grey'>Post</button>
      </div>
    </div>
  );
};

export default CreatePostToggle;
