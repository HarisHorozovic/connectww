import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { isLoggedIn } from './redux/user/user.actions';

import './App.css';

// Components
import Spinner from './components/spinner/spinner.component';
import Navbar from './components/navbar/navbar.component';
import HomePage from './pages/homepage/homepage.component';
import ProfilePage from './pages/profilepage/profile.component';
import LandingPage from './pages/landing-page/landing-page.component';
import EditProfilePage from './pages/edit-profile-page/edit-profile-page.component';
import SearchUsersPage from './pages/search-users-page/search-users-page.component';
import MessagesPage from './pages/messages-page/messages-page.component';
import GroupsPage from './pages/groups-page/groups-page.component';
import MatchPage from './pages/match-page/match-page.component';

class App extends React.Component {
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.isLoggedIn();
    }
  }

  render() {
    const { currentUser, loading } = this.props;
    const isLoading = !currentUser && loading === true ? true : false;

    return (
      <div>
        {currentUser ? <Navbar /> : null}
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              currentUser ? <Redirect to='/feed' /> : <Redirect to='/auth' />
            }
          />
          <Route exact path='/auth' component={LandingPage} />
          <Route
            exact
            path='/feed'
            render={() => (isLoading ? <Spinner /> : <HomePage />)}
          />
          <Route
            exact
            path='/profile'
            render={() => (isLoading ? <Spinner /> : <ProfilePage />)}
          />
          <Route
            exact
            path='/profile/:userId/settings'
            render={() => (isLoading ? <Spinner /> : <EditProfilePage />)}
          />
          <Route
            exact
            path='/profile/:userId'
            render={() => (isLoading ? <Spinner /> : <ProfilePage />)}
          />
          <Route
            exact
            path='/users/search'
            render={() => (isLoading ? <Spinner /> : <SearchUsersPage />)}
          />
          <Route
            exact
            path='/messaging'
            render={() => (isLoading ? <Spinner /> : <MessagesPage />)}
          />
          <Route exact path='/groups' component={GroupsPage} />
          <Route exact path='/match' component={MatchPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser, loading } }) => ({
  currentUser,
  loading
});

const mapDispatchToProps = dispatch => ({
  isLoggedIn: () => dispatch(isLoggedIn())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
