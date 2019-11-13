import React from 'react';

import './deactivate-account.styles.scss';

// Components
import FormInput from '../form-input/form-input.component';

class DeactivateAccount extends React.Component {
  constructor() {
    super();

    this.state = {
      password: '',
      confirmPassword: ''
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
      <div className='deactivate-container'>
        <form
          className='deactivate-form flex-wrap-center'
          onSubmit={this.handleSubmit}
        >
          <h1>
            This can not be reversed are you sure you want to terminate your
            account
          </h1>
          <div className='deactivate flex-hor-center'>
            <FormInput
              type='password'
              name='password'
              label='Your Password'
              value={this.state.password}
              handleChange={this.handleChange}
            />
            <FormInput
              type='password'
              name='confirmPassword'
              label='Confirm Your Password'
              value={this.state.confirmPassword}
              handleChange={this.handleChange}
            />
            <button className='btn btn-red'>
              <span>&#x2612;</span> Deactivate
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default DeactivateAccount;
