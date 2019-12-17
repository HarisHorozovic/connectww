import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

// Components
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
  render() {
    const { currentUser } = this.props;

    return (
      <div>
        {currentUser ? <Navbar /> : null}
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              currentUser ? <Redirect to='/feed' /> : <LandingPage />
            }
          />
          <Route exact path='/feed' component={HomePage} />
          <Route exact path='/profile' component={ProfilePage} />
          <Route exact path='/profile/settings' component={EditProfilePage} />
          <Route exact path='/profile/:userId' component={ProfilePage} />
          <Route exact path='/users/search' component={SearchUsersPage} />
          <Route exact path='/messaging' component={MessagesPage} />
          <Route exact path='/groups' component={GroupsPage} />
          <Route exact path='/match' component={MatchPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(mapStateToProps)(App);
