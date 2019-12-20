import React from 'react';
import { connect } from 'react-redux';

import { addEducation } from '../../redux/user/user.actions';

import './add-education.styles.scss';

// Components
import FormInput from '../form-input/form-input.component';

class AddEducation extends React.Component {
  constructor() {
    super();

    this.state = {
      school: '',
      degree: '',
      studied: '',
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
    const eduObj = {
      school: this.state.school,
      degree: this.state.degree,
      studied: this.state.studied,
      from: this.state.from,
      to: this.state.to,
      desc: this.state.desc
    };
    this.props.addEducation(eduObj);
    this.setState({
      school: '',
      degree: '',
      studied: '',
      from: '',
      to: '',
      desc: ''
    });
  };

  render() {
    return (
      <div className='add-education-container'>
        <form
          className='add-education-form flex-hor-center'
          onSubmit={this.handleSubmit}
        >
          <FormInput
            type='text'
            name='school'
            label='School'
            value={this.state.school}
            handleChange={this.handleChange}
          />
          <FormInput
            type='text'
            name='degree'
            label='Degree'
            value={this.state.degree}
            handleChange={this.handleChange}
          />
          <FormInput
            type='text'
            name='studied'
            label='Studied'
            value={this.state.studied}
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

          <label htmlFor='desc'>A short description about your studies</label>
          <textarea
            rows='10'
            placeholder='Tell us about your acquired skills'
            name='desc'
            value={this.state.desc}
            onChange={this.handleChange}
          ></textarea>
          <button className='btn btn-transparent'>Add Education</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addEducation: eduObj => dispatch(addEducation(eduObj))
});

export default connect(null, mapDispatchToProps)(AddEducation);
