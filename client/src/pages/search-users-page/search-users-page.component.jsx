import React from 'react';

import './search-users-page.styles.scss';

// Components
import FormInput from '../../components/form-input/form-input.component';
import MessagingContainer from '../../components/messaging/messaging.component';
import SearchResultItem from '../../components/search-result-item/search-result-item.component';

class SearchUsersPage extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      matchingUsers: [
        {
          _id: '123',
          name: 'Haris'
        },
        {
          _id: '456',
          name: 'Mike'
        },
        {
          _id: '789',
          name: 'John'
        },
        {
          _id: '1011',
          name: 'CooCoo'
        },
        {
          _id: '1213',
          name: 'Pie'
        }
      ]
    };
  }

  handleChange = e => {
    this.setState({ search: e.target.value });
    console.log(this.state.search);
  };

  addFriend = userId => {
    console.log(`Added new friend with id ${userId}`);
  };

  render() {
    const { matchingUsers } = this.state;
    return (
      <div className='search-users-page'>
        <div className='search-page-container flex-hor-center'>
          <div className='search-bar-container flex-wrap-center'>
            <FormInput
              type='text'
              placeholder='Search Users'
              value={this.state.search}
              handleChange={this.handleChange}
            />
          </div>
          <div className='users-container flex-wrap-center'>
            {matchingUsers !== []
              ? matchingUsers.map(user => (
                  <SearchResultItem
                    key={user._id}
                    userId={user._id}
                    profileImg={user.profileImg}
                    name={user.name}
                    addFriend={() => this.addFriend(user._id)}
                  />
                ))
              : null}
          </div>
        </div>
        <MessagingContainer />
      </div>
    );
  }
}

export default SearchUsersPage;
