import React from 'react';
import { Link } from 'react-router-dom';

import './search-result-item.styles.scss';

const SearchResultItem = ({ userId, name, profileImg, addFriend }) => {
  return (
    <div className='user-item flex-hor-center'>
      <img src={profileImg} alt='UserImg' />
      <Link to={`/profile/${userId}`}>{name}</Link>
      <div className='btn-container flex-wrap-center'>
        <button className='btn btn-like' onClick={addFriend}>
          <span>&#x2b;</span> Add
        </button>
      </div>
    </div>
  );
};

export default SearchResultItem;
