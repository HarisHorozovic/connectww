import React from 'react';

import './change-credentials.styles.scss';

// Components
import FormInput from '../form-input/form-input.component';

class ChangeCredentials extends React.Component {
  constructor() {
    super();

    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      password: '',
      email: '',
      newEmail: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitNewEmail = e => {
    e.preventDefault();

    const newEmailData = {
      email: this.state.email,
      newEmail: this.state.newEmail,
      password: this.state.password
    };

    console.log(newEmailData);
  };

  submitNewPassword = e => {
    e.preventDefault();

    const newPassword = {
      password: this.state.oldPassword,
      newPassword: this.state.newPassword,
      confirmNewPassword: this.state.newPasswordConfirm
    };

    console.log(newPassword);
  };

  render() {
    return (
      <div className='change-creds-container flex-wrap-center'>
        <form
          className='change-email flex-hor-center'
          onSubmit={this.submitNewEmail}
        >
          <FormInput
            type='email'
            name='email'
            label='Old Email Address'
            value={this.state.email}
            handleChange={this.handleChange}
          />
          <FormInput
            type='email'
            name='newEmail'
            label='New Email Address'
            value={this.state.newEmail}
            handleChange={this.handleChange}
          />
          <FormInput
            type='password'
            name='password'
            label='Confirm Password To Continue'
            value={this.state.password}
            handleChange={this.handleChange}
          />
          <button className='btn btn-transparent'>Update</button>
        </form>

        <form
          className='change-password flex-hor-center'
          onSubmit={this.submitNewPassword}
        >
          <FormInput
            type='password'
            name='oldPassword'
            label='Current Password'
            value={this.state.oldPassword}
            handleChange={this.handleChange}
          />
          <FormInput
            type='password'
            name='newPassword'
            label='New Password'
            value={this.state.newPassword}
            handleChange={this.handleChange}
          />
          <FormInput
            type='password'
            name='newPasswordConfirm'
            label='Confirm New Password'
            value={this.state.newPasswordConfirm}
            handleChange={this.handleChange}
          />
          <button className='btn btn-transparent'>Update</button>
        </form>
      </div>
    );
  }
}

export default ChangeCredentials;
