import React from 'react';

import './set-match-preferences.styles.scss';

//Components
import FormInput from '../form-input/form-input.component';

class SetMatchPreferences extends React.Component {
  constructor() {
    super();

    this.state = {
      gender: '',
      ageFrom: 18,
      ageTo: 30
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  setMatchPreferences = e => {
    e.preventDefault();
    // Save preferences to the database
    console.log(this.state);
  };

  render() {
    const { gender, ageFrom, ageTo } = this.state;
    return (
      <div className='set-pref-container flex-hor-center'>
        <div className='user-info flex-wrap-center'>
          <img src='./img/user.png' alt='userImg' />
          <p>Name</p>
          <form
            className='looking-for flex-hor-center'
            onSubmit={this.setMatchPreferences}
          >
            <select name='gender' value={gender} onChange={this.handleChange}>
              <option value=''>Looking for</option>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
            </select>
            <FormInput
              type='number'
              name='ageFrom'
              value={ageFrom}
              handleChange={this.handleChange}
              label='Age From'
            />
            <FormInput
              type='number'
              name='ageTo'
              label='Age To'
              value={ageTo}
              handleChange={this.handleChange}
            />
            <button className='btn btn-green'>&#x2714;</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SetMatchPreferences;
