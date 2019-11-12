import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

// Components
import Navbar from './components/navbar/navbar.component';
import HomePage from './pages/homepage/homepage.component';
import ProfilePage from './pages/profilepage/profile.component';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/profile' component={ProfilePage} />
        <Route path='/profile/:userId' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
