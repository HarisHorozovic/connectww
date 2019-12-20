import React from 'react';
import { connect } from 'react-redux';

import './overview-item.styles.scss';

import {
  removeExperience,
  removeEducation
} from '../../redux/user/user.actions';

const OverviewItem = ({
  select,
  lookingAtUser,
  removeExperience,
  removeEducation
}) => {
  let infoItem = (
    <div className='card info-item'>
      <div className='info-header'>Overview</div>
      <p>
        <strong>Name:</strong>
        {`${lookingAtUser.firstName} ${lookingAtUser.lastName}`}
      </p>
      <p>
        <strong>Date of Birth: </strong>
        {lookingAtUser.DOB ? lookingAtUser.DOB : null}
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

  let experienceItem = (
    <div className='card info-item'>
      <div className='info-header'>Experience</div>
      {lookingAtUser.experience.length > 0 ? (
        lookingAtUser.experience.map(exp => (
          <div className='experience-item'>
            <button
              className='btn btn-red'
              onClick={() => removeExperience(exp._id)}
            >
              Remove
            </button>
            <p>
              <strong>Company: </strong>
              {exp.company}
            </p>
            <p>
              <strong>Position: </strong>
              {exp.position}
            </p>
            <p>
              <strong>Years: </strong>
              {`${exp.from}-${exp.current === true ? 'Current' : exp.to}`}
            </p>
            <p>
              <strong>Description: </strong>
              {exp.desc}
            </p>
            <span>----------------------------------------</span>
          </div>
        ))
      ) : (
        <p>Add experience in profile settings page</p>
      )}
    </div>
  );

  let educationItem = (
    <div className='card info-item'>
      <div className='info-header'>Education</div>
      {lookingAtUser.education.length > 0 ? (
        lookingAtUser.education.map(edu => (
          <div className='education-item'>
            <button
              className='btn btn-red'
              onClick={() => removeEducation(edu._id)}
            >
              Remove
            </button>
            <p>
              <strong>School: </strong>
              {edu.school}
            </p>
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>
            <p>
              <strong>Studied: </strong>
              {edu.studied}
            </p>
            <p>
              <strong>Years: </strong>
              {`${edu.from}-${edu.current === true ? 'Current' : edu.to}`}
            </p>
            <p>
              <strong>Description: </strong>
              {edu.desc}
            </p>
            <span>----------------------------------------</span>
          </div>
        ))
      ) : (
        <p>Add education in profile settings page</p>
      )}
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

const mapStateToProps = ({ user: { lookingAtUser } }) => ({
  lookingAtUser
});

const mapDispatchToProps = dispatch => ({
  removeExperience: expId => dispatch(removeExperience(expId)),
  removeEducation: eduId => dispatch(removeEducation(eduId))
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewItem);
