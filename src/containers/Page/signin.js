import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import { auth } from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import { siteTitle } from '../../config';
import { loginUser } from '../../redux/sousers/actions'
import { GoogleLogin } from 'react-google-login'
import  FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

// const { login } = authAction;

class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    email: '',
    password: '',
    error: '',
    rememberMe: false,
    success: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.users.isAuth)
      this.setState({ redirectToReferrer: true });
  }

  componentWillMount() {
    this.props.dispatch(auth());
  }
  componentDidMount() {

  }

  handleLogin = () => {
    this.props.dispatch(loginUser(this.state))
  };

  handleInputEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  handleInputPassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  toggleCheckboxValue = () => {
    this.setState({ rememberMe: !this.state.rememberMe });
  }

  responseGoogle = (response) => {
    this.props.dispatch(loginUser({
      email: response.profileObj.email,
      password: response.profileObj.googleId,
      rememberMe: true,
    }))
  }

  responseFacebook = (response) => {
    this.props.dispatch(loginUser({
      email: response.email,
      password: response.userID,
      rememberMe: true,
    }))
  }

  render() {
    // const from = { pathname: '/dashboard' };



    const from = { pathname: '/dashboard' };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/">
                {siteTitle}
              </Link>
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleInputEmail} />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Contraseña"
                  value={this.state.password}
                  onChange={this.handleInputPassword}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox value={this.state.rememberMe} onChange={this.toggleCheckboxValue}>
                  Recordarme
                </Checkbox>
                <Button type="primary" onClick={this.handleLogin}>
                  Iniciar Sesión
                </Button>
              </div>

              <div className="isoInputWrapper isoOtherLogin">
                <FacebookLogin
                  appId="490249245131473"
                  // autoLoad
                  fields="name,email,picture"
                  render={renderProps => (
                    <Button onClick={renderProps.onClick} type="primary btnFacebook">
                      <IntlMessages id="page.signInFacebook" />
                    </Button>
                  )}
                  callback={this.responseFacebook}
                />
                <GoogleLogin
                  clientId="1020508776867-gb4qqko23uj74o654u1ms6ktofn72cnf.apps.googleusercontent.com"
                  render={renderProps => (
                    <Button onClick={renderProps.onClick} type="primary btnGooglePlus">
                      <IntlMessages id="page.signInGooglePlus" />
                    </Button>
                  )}
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                />

              </div>
              <div className="isoCenterComponent isoHelperWrapper">
                <Link to="/forgotpassword" className="isoForgotPass">
                  Olvidé mi contraseña
                </Link>
                <Link to="/signup">
                  Crear cuenta
                </Link>
                <br/>
                <Link to="/vendorsignup">
                  ¿Tenés una sala de ensayo? Registrate acá como proveedor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.User,
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false
  }
}

export default connect(
  mapStateToProps,
  null,
  null,
  // { login }
)(SignIn);
