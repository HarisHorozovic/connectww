import React from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../../redux/user/user.actions';

import './edit-main-info.styles.scss';

// Components
import FormInput from '../form-input/form-input.component';

class EditMainInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      DOB: '',
      location: '',
      gender: '',
      relationship: ''
    };
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.currentUser.firstName,
      lastName: this.props.currentUser.lastName,
      DOB: this.props.currentUser.DOB,
      location: this.props.currentUser.location,
      gender: this.props.currentUser.gender,
      relationship: this.props.currentUser.relationship
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editMainInfo = e => {
    e.preventDefault();
    const userObj = this.state;

    this.props.updateUser(userObj);
    console.log(userObj);
  };

  render() {
    return (
      <div className='info-edit-container'>
        <form
          className='info-edit-form flex-hor-center'
          id='info-edit-form'
          onSubmit={this.editMainInfo}
        >
          <FormInput
            type='text'
            name='firstName'
            value={this.state.firstName}
            handleChange={this.handleChange}
            label='First Name'
          />
          <FormInput
            type='text'
            name='lastName'
            value={this.state.lastName}
            handleChange={this.handleChange}
            label='Last Name'
          />
          <FormInput
            type='date'
            name='DOB'
            value={this.state.DOB}
            handleChange={this.handleChange}
            label='Date of Birth'
          />
          <FormInput
            type='text'
            name='location'
            value={this.state.location}
            handleChange={this.handleChange}
            label='Location'
          />
          <select
            name='gender'
            value={this.state.gender}
            onChange={this.handleChange}
          >
            <option value=''>Select Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
          <select
            name='relationship'
            value={this.state.relationship}
            onChange={this.handleChange}
          >
            <option value=''>Select Relationship Status</option>
            <option value='available'>Available</option>
            <option value='complicated'>It's Complicated</option>
            <option value='married'>Married</option>
            <option value='engaged'>Engaged</option>
            <option value='inRel'>In a relationship</option>
          </select>
          <label htmlFor='bio'>Short Bio</label>
          <textarea
            rows='10'
            placeholder='Tell us about yourself'
            name='bio'
            value={this.state.bio}
            onChange={this.handleChange}
          ></textarea>
          <button className='btn btn-transparent'>Update Info</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

const mapDispatchToProps = dispatch => ({
  updateUser: userBody => dispatch(updateUser(userBody))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMainInfo);
