import React from 'react';
import { connect } from 'react-redux';

import { register } from '../../redux/user/user.actions';

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
      passwordConfirm: '',
      DOB: '',
      gender: 'male'
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userObj = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
      DOB: this.state.DOB,
      gender: this.state.gender
    };

    this.props.register(userObj);
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
          name='passwordConfirm'
          placeholder='Confirm Password'
          required
          onChange={this.handleChange}
          value={this.state.confirmPassword}
        />

        <FormInput
          type='date'
          name='DOB'
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

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(register(user))
});

export default connect(null, mapDispatchToProps)(Register);
