import React from 'react';
import { connect } from 'react-redux';

import './landing-page.styles.scss';

import { setCurrentUser } from '../../redux/user/user.actions';

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
    this.props.setCurrentUser({
      _id: 'asdasdadasd',
      name: 'sdmsdofsdmsdofasd'
    });
  }

  showLogin = () => {
    this.setState({ toHide: 'register' });
  };

  showRegister = () => {
    this.setState({ toHide: 'login' });
  };
  render() {
    return (
      <div className='landing-page flex-full-center'>
        <div className='landing-container flex-hor-center'>
          <div className='landing-header flex-hor-center'>
            <p>Welcome to simple social network ConnectWW</p>
            <div className='landing-btns'>
              <span
                className='btn btn-grey btn-landing'
                onClick={this.showLogin}
              >
                Login
              </span>
              <span
                className='btn btn-grey btn-landing'
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

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(LandingPage);
