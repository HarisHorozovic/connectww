import React from 'react';
import { connect } from 'react-redux';

import './deactivate-account.styles.scss';

import { deleteAccount } from '../../redux/user/user.actions';

// Components
import FormInput from '../form-input/form-input.component';

class DeactivateAccount extends React.Component {
  constructor() {
    super();

    this.state = {
      password: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.deleteAccount(this.state.password);
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
            <button className='btn btn-red'>
              <span>&#x2612;</span> Delete
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteAccount: password => dispatch(deleteAccount(password))
});

export default connect(null, mapDispatchToProps)(DeactivateAccount);
