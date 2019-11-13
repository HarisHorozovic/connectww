import React from 'react';

import './register.styles.scss';

//Components
import FormInput from '../form-input/form-input.component';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dob: ''
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
      <form
        className='register-form flex-hor-center'
        onSubmit={this.handleSubmit}
      >
        <FormInput
          type='text'
          name='firstName'
          placeholder='First Name'
          required
          onChange={this.handleChange}
          value={this.state.firstName}
        />

        <FormInput
          type='text'
          name='lastName'
          placeholder='Last Name'
          required
          onChange={this.handleChange}
          value={this.state.lastName}
        />

        <FormInput
          type='email'
          name='email'
          placeholder='Email'
          required
          onChange={this.handleChange}
          value={this.state.email}
        />

        <FormInput
          type='password'
          name='password'
          placeholder='Password'
          required
          onChange={this.handleChange}
          value={this.state.password}
        />

        <FormInput
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          required
          onChange={this.handleChange}
          value={this.state.confirmPassword}
        />

        <FormInput
          type='date'
          name='dob'
          required
          onChange={this.handleChange}
          value={this.state.dob}
        />

        <button type='submit' className='btn btn-transparent'>
          SignUp
        </button>
      </form>
    );
  }
}

export default Register;
