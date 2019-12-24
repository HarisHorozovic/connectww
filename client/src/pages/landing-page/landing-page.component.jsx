import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { isLoggedIn } from '../../redux/user/user.actions';

import './landing-page.styles.scss';

// Components
import Login from '../../components/login/login.component';
import Register from '../../components/register/register.component';

class LandingPage extends React.Component {
  constructor() {
    super();

    this.state = {
      toHide: 'register'
    };
  }

  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.isLoggedIn();
    }
  }

  showLogin = () => {
    this.setState({ toHide: 'register' });
  };

  showRegister = () => {
    this.setState({ toHide: 'login' });
  };
  render() {
    // Use the errors to change the frontend
    if (this.props.currentUser) {
      return <Redirect to='/feed' />;
    } else {
      return (
        <div className='landing-page flex-full-center'>
          <div className='landing-container flex-hor-center'>
            <div className='landing-header flex-hor-center'>
              <p>Welcome to simple social network ConnectWW</p>
              <div className='landing-btns'>
                <span
                  className='btn btn-main btn-landing'
                  onClick={this.showLogin}
                >
                  Login
                </span>
                <span
                  className='btn btn-main btn-landing'
                  onClick={this.showRegister}
                >
                  Signup
                </span>
              </div>
            </div>
            <div className='landing-content flex-hor-center'>
              {this.state.toHide === 'register' ? <Login /> : <Register />}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => ({
  isLoggedIn: () => dispatch(isLoggedIn())
});

const mapStateToProps = ({ user: { currentUser, userErrors } }) => ({
  currentUser,
  userErrors
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
