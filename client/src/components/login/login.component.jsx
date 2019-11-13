import React from 'react';

import './login.styles.scss';

// Components
import FormInput from '../form-input/form-input.component';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
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
      <form className='login-form flex-hor-center' onSubmit={this.handleSubmit}>
        <FormInput
          type='email'
          name='email'
          placeholder='Email'
          required
          handleChange={this.handleChange}
          value={this.state.email}
        />
        <FormInput
          type='password'
          name='password'
          placeholder='Password'
          required
          handleChange={this.handleChange}
          value={this.state.password}
        />
        <button type='submit' className='btn btn-transparent'>
          Login
        </button>
      </form>
    );
  }
}

export default Login;
