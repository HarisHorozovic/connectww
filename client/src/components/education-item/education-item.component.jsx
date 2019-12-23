import React from 'react';

import './education-item.styles.scss';

const EducationItem = ({
  edu: { school, degree, studied, from, to, current, desc, _id },
  removeEducation
}) => {
  return (
    <div className='experience-item'>
      <button className='btn btn-red' onClick={() => removeEducation(_id)}>
        Remove
      </button>
      <p>
        <strong>School: </strong>
        {school}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Studied: </strong>
        {studied}
      </p>
      <p>
        <strong>Years: </strong>
        {`${from}-${current === true ? 'Current' : to}`}
      </p>
      <p>
        <strong>Description: </strong>
        {desc}
      </p>
    </div>
  );
};

export default EducationItem;
