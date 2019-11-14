import React from 'react';

import './create-group-container.styles.scss';

// Components
import FormInput from '../form-input/form-input.component';

class CreateGroup extends React.Component {
  constructor() {
    super();

    this.state = {
      groupName: '',
      maxPeople: ''
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createGroup = e => {
    e.preventDefault();

    console.log(this.state);
  };

  render() {
    return (
      <div className='create-group-container content-container flex-hor-center'>
        <p>Create Group</p>
        <form
          className='create-group flex-hor-center'
          onSubmit={this.createGroup}
        >
          <FormInput
            type='text'
            name='groupName'
            placeholder='Group Name'
            value={this.state.groupName}
            handleChange={this.handleChange}
          />
          <FormInput
            type='number'
            name='maxPeople'
            placeholder='Number of People'
            value={this.state.maxPeople}
            handleChange={this.handleChange}
          />
          <button className='btn btn-green'>&#x2714; Create</button>
        </form>
      </div>
    );
  }
}

export default CreateGroup;
