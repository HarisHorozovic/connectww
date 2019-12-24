import React from 'react';

import './info-item.styles.scss';

const InfoItem = ({ lookingAtUser }) => {
  // Format DOB from MongoDB
  let showDate = '';
  if (lookingAtUser.DOB) {
    const created = Date(lookingAtUser.DOB).split(' ');
    showDate = [created[2], created[1], created[3]].join('-');
  }

  return (
    <div className='overview-item'>
      <p>
        <strong>Name:</strong>
        {`${lookingAtUser.firstName} ${lookingAtUser.lastName}`}
      </p>
      <p>
        <strong>Date of Birth: </strong>
        {showDate}
      </p>
      <p>
        <strong>Location: </strong>
        {lookingAtUser.location ? lookingAtUser.location : null}
      </p>
      <p>
        <strong>Gender: </strong>
        {lookingAtUser.gender ? lookingAtUser.gender : null}
      </p>
      <p>
        <strong>Relationship: </strong>
        {lookingAtUser.relationship ? lookingAtUser.relationship : null}
      </p>
      <p>
        <strong>Short Bio: </strong>
        {lookingAtUser.bio ? lookingAtUser.bio : null}
      </p>
    </div>
  );
};

export default InfoItem;
