import React from 'react';
import { connect } from 'react-redux';

import './change-credentials.styles.scss';

import { changeCreds } from '../../redux/user/user.actions';

// Components
import FormInput from '../form-input/form-input.component';

class ChangeCredentials extends React.Component {
  constructor() {
    super();

    this.state = {
      newPassword: '',
      passwordConfirm: '',
      password: '',
      currentPassword: '',
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

    console.log(
      'New email data *************************************',
      newEmailData
    );

    this.props.changeCreds(newEmailData);
  };

  submitNewPassword = e => {
    e.preventDefault();

    const newPassword = {
      currentPassword: this.state.currentPassword,
      newPassword: this.state.newPassword,
      passwordConfirm: this.state.passwordConfirm
    };

    console.log(
      'New password data*******************************',
      newPassword
    );
    this.props.changeCreds(newPassword);
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
            name='currentPassword'
            label='Current Password'
            value={this.state.currentPassword}
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
            name='passwordConfirm'
            label='Confirm New Password'
            value={this.state.passwordConfirm}
            handleChange={this.handleChange}
          />
          <button className='btn btn-transparent'>Update</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeCreds: data => dispatch(changeCreds(data))
});

export default connect(null, mapDispatchToProps)(ChangeCredentials);
