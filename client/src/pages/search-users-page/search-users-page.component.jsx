import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './search-users-page.styles.scss';

import { sendFriendRequest, getAllUsers } from '../../redux/user/user.actions';

// Components
import FormInput from '../../components/form-input/form-input.component';
import MessagingContainer from '../../components/messaging/messaging.component';
import SearchResultItem from '../../components/search-result-item/search-result-item.component';

class SearchUsersPage extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      matchingUsers: []
    };
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  handleChange = e => {
    this.setState({ search: e.target.value });
    // Copy all the users from state to items
    let items = this.props.users;

    // Filter all the items in the state and search them by firstName and non case sensitive
    items = items.filter(
      item =>
        item.firstName.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    );

    // set the state to that searched value and display it below
    this.setState({ matchingUsers: items });
  };

  render() {
    if (!this.props.currentUser) {
      return <Redirect to='/' />;
    } else {
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
              {matchingUsers.length > 0 ? (
                matchingUsers.map(user => (
                  <SearchResultItem
                    key={user._id}
                    userId={user._id}
                    profileImg={user.profileImg}
                    name={user.firstName}
                    addFriend={() => this.props.sendFriendRequest(user._id)}
                  />
                ))
              ) : (
                <p>Start Typing to search the users by name</p>
              )}
            </div>
          </div>
          <MessagingContainer />
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  sendFriendRequest: newFriendId => dispatch(sendFriendRequest(newFriendId)),
  getAllUsers: () => dispatch(getAllUsers())
});

const mapStateToProps = ({ user: { currentUser, users } }) => ({
  currentUser,
  users
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsersPage);
