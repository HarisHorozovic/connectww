import React from 'react';

import './experience-item.styles.scss';

const ExperienceItem = ({
  exp: { company, position, from, to, current, desc, _id },
  removeExperience
}) => {
  return (
    <div className='experience-item'>
      <button className='btn btn-red' onClick={() => removeExperience(_id)}>
        Remove
      </button>
      <p>
        <strong>Company: </strong>
        {company}
      </p>
      <p>
        <strong>Position: </strong>
        {position}
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

export default ExperienceItem;
