import React from 'react';

import './overview-item.styles.scss';

const OverviewItem = ({ select }) => {
  let infoItem = (
    <div className='card info-item'>
      <div className='info-header'>Overview</div>
      <p>
        <strong>Name: </strong>
        {}
      </p>
      <p>
        <strong>Date of Birth: </strong>
        {}
      </p>
      <p>
        <strong>Location: </strong>
        {}
      </p>
      <p>
        <strong>Gender: </strong>
        {}
      </p>
      <p>
        <strong>Relationship: </strong>
        {}
      </p>
      <p>
        <strong>Short Bio: </strong>
        {}
      </p>
    </div>
  );

  let experienceItem = (
    <div className='card info-item'>
      <div className='info-header'>Experience</div>
      <div className='experience-item'>
        <p>
          <strong>Company: </strong>
          {}
        </p>
        <p>
          <strong>Position: </strong>
          {}
        </p>
        <p>
          <strong>Years: </strong>
          {}
        </p>
        <p>
          <strong>Description: </strong>
          {}
        </p>
      </div>
    </div>
  );

  let educationItem = (
    <div className='card info-item'>
      <div className='info-header'>Education</div>
      <div className='education-item'>
        <p>
          <strong>School: </strong>
          {}
        </p>
        <p>
          <strong>Degree: </strong>
          {}
        </p>
        <p>
          <strong>Studied: </strong>
          {}
        </p>
        <p>
          <strong>Years: </strong>
          {}
        </p>
        <p>
          <strong>Description: </strong>
          {}
        </p>
      </div>
    </div>
  );
  return (
    <div className='full-width flex-hor-center'>
      {select === 'info'
        ? infoItem
        : select === 'exp'
        ? experienceItem
        : educationItem}
    </div>
  );
};

export default OverviewItem;
