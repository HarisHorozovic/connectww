import React from 'react';

import './add-experience.styles.scss';

// Components
import FormInput from '../form-input/form-input.component';

class AddExperience extends React.Component {
  constructor() {
    super();

    this.state = {
      company: '',
      position: '',
      from: '',
      to: '',
      desc: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log(this.state);
  };

  render() {
    return (
      <div className='add-experience-container'>
        <form
          className='add-experience-form flex-hor-center'
          onSubmit={this.handleSubmit}
        >
          <FormInput
            type='text'
            name='company'
            label='Company'
            value={this.state.company}
            handleChange={this.handleChange}
          />
          <FormInput
            type='text'
            name='position'
            label='Position'
            value={this.state.position}
            handleChange={this.handleChange}
          />
          <FormInput
            type='date'
            name='from'
            label='From Date'
            value={this.state.from}
            handleChange={this.handleChange}
          />
          <FormInput
            type='date'
            name='to'
            label='To Date'
            value={this.state.to}
            handleChange={this.handleChange}
          />
          <label htmlFor='desc'>What you did in the company</label>
          <textarea
            rows='10'
            placeholder='Tell us about your position'
            name='desc'
            value={this.state.desc}
            onChange={this.handleChange}
          ></textarea>
          <button className='btn btn-transparent'>Add Experience</button>
        </form>
      </div>
    );
  }
}

export default AddExperience;
