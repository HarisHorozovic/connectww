import React from 'react';

import './overview-container.styles.scss';

import { connect } from 'react-redux';

import {
  removeExperience,
  removeEducation
} from '../../redux/user/user.actions';

// Components
import InfoItem from '../info-item/info-item.component';
import ExperienceItem from '../experience-item/experience-item.component';
import EducationItem from '../education-item/education-item.component';

class OverviewContainer extends React.Component {
  render() {
    const { lookingAtUser, removeExperience, removeEducation } = this.props;
    return (
      <div className='overview-main-content flex-hor-center'>
        <div className='card info-item'>
          <div className='info-header'>Overview</div>
          <InfoItem lookingAtUser={lookingAtUser} />
        </div>

        <div className='card info-item'>
          <div className='info-header'>Education</div>
          {lookingAtUser.education.length > 0 ? (
            lookingAtUser.education.map(edu => (
              <EducationItem
                key={edu._id}
                edu={edu}
                removeEducation={removeEducation}
              />
            ))
          ) : (
            <p>Add education in profile settings page</p>
          )}
        </div>
        <div className='card info-item'>
          <div className='info-header'>Experience</div>
          {lookingAtUser.experience.length > 0 ? (
            lookingAtUser.experience.map(exp => (
              <ExperienceItem
                key={exp._id}
                exp={exp}
                removeExperience={removeExperience}
              />
            ))
          ) : (
            <p>Add experience in profile settings page</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { lookingAtUser } }) => ({
  lookingAtUser
});

const mapDispatchToProps = dispatch => ({
  removeExperience: expId => dispatch(removeExperience(expId)),
  removeEducation: eduId => dispatch(removeEducation(eduId))
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewContainer);
