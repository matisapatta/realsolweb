import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import {
  userRegister,
  // getUsers 
} from '../../redux/sousers/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import { siteTitle } from '../../config';
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import notification from '../../components/notification';

const { login } = authAction;

class SignUp extends React.Component {
  state = {
    redirectToReferrer: false,
    name: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    error: '',
    accepted: false,
    passOk: true,

  };


  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
    if (nextProps.user.register)
      this.props.history.push('/dashboard')
  }

  componentWillMount = () => {
    // this.props.dispatch(getUsers())
  }


  handleLogin = () => {
    const { login } = this.props;
    login();
    this.props.history.push('/dashboard');
  };

  handleInputEmail = (event) => {
    if (event.target.value.length <= 50)
      this.setState({ email: event.target.value })
  }
  handleInputPassword = (event) => {
    if (event.target.value.length <= 30)
      this.setState({ password: event.target.value })
  }
  handleInputName = (event) => {
    if (event.target.value.length <= 20)
      this.setState({ name: event.target.value })
  }
  handleInputLastname = (event) => {
    if (event.target.value.length <= 20)
      this.setState({ lastname: event.target.value })
  }
  handleInputPhone = (event) => {
    if (event.target.value.length <= 12)
      this.setState({ phone: event.target.value })
  }

  toggleAccepted = () => {
    this.setState({ accepted: !this.state.accepted })
  }

  validateInputPassword = (event) => {
    if (event.target.value !== this.state.password)
      this.setState({ passOk: false })
    else
      this.setState({ passOk: true })
  }

  validateForm = () => {
    let isValid = false;
    if (this.state.accepted) {
      isValid = true;
    }
    return isValid;
  }

  handleRegister = () => {
    if (this.validateForm()) {
      this.props.dispatch(userRegister({
        email: this.state.email,
        name: this.state.name,
        lastname: this.state.lastname,
        password: this.state.password,
        phone: this.state.phone,
      }))
    } else {
      notification('error', "Hay errores en el formulario, por favor corregirlos.")
    }
  }


  submitForm = (e) => {
    e.preventDefault()
    this.setState({ error: '' });
    this.props.dispatch(userRegister({
      email: this.state.email,
      name: this.state.name,
      lastname: this.state.lastname,
      password: this.state.password
    }, this.props.user.users))
  }

  responseFacebook = (response) => {
    let fullName = response.name.split(" ")
    this.props.dispatch(userRegister({
      email: response.email,
      name: fullName[0],
      lastname: fullName[1],
      password: response.userID,
      avatar: response.picture.data.url,
      facebookId: response.userID,
      isLocal: false,
      role: 0,
    }))
  }

  responseGoogle = (response) => {
    this.props.dispatch(userRegister({
      email: response.profileObj.email,
      name: response.profileObj.givenName,
      lastname: response.profileObj.familyName,
      password: response.profileObj.googleId,
      avatar: response.profileObj.imageUrl,
      googleId: response.profileObj.googleId,
      isLocal: false,
      role: 0,
    }))
  }

  render() {
    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/">
                {siteTitle}
              </Link>
            </div>
              <div className="isoSignUpForm">
                <div className="isoInputWrapper isoLeftRightComponent">
                  <Input size="large" placeholder="Nombre" value={this.state.name} onChange={this.handleInputName} />
                  <Input size="large" placeholder="Apellido" value={this.state.lastname} onChange={this.handleInputLastname} />
                </div>
                <div className="isoInputWrapper">
                  <Input size="large" type="number" placeholder="Teléfono" value={this.state.phone} onChange={this.handleInputPhone} />
                </div>

                <div className="isoInputWrapper">
                  <Input size="large" type="email" placeholder="Email" value={this.state.email} onChange={this.handleInputEmail} />
                </div>

                <div className="isoInputWrapper">
                  <Input size="large" type="password" placeholder="Contraseña" value={this.state.password} onChange={this.handleInputPassword} />
                </div>

                <div className="isoInputWrapper">
                  <Input
                    size="large"
                    type="password"
                    placeholder="Confirmar Contraseña"
                    // value={this.state.password}
                    onChange={this.validateInputPassword}
                  />
                </div>
                <div style={{ color: "red" }}>{this.state.passOk ? "" : "Las contraseñas no coinciden"}</div>

                <div className="isoInputWrapper" style={{ marginBottom: '50px', paddingTop: '30px', }}>
                  <Checkbox checked={this.state.accepted} onChange={this.toggleAccepted} >
                    <IntlMessages id="page.signUpTermsConditions" />
                  </Checkbox>
                </div>

                <div className="isoInputWrapper">
                  <Button onClick={this.handleRegister} type="primary">
                    Registrarse
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
                  {/* {Auth0.isValid &&
                  <Button
                    onClick={() => {
                      Auth0.login(this.handleLogin);
                    }}
                    type="primary btnAuthZero"
                  >
                    <IntlMessages id="page.signUpAuth0" />
                  </Button>} */}
                </div>
                <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                  <Link to="/vendorsignup">
                    Registrate acá como proveedor
                </Link>
                  <br />
                  <Link to="/signin">
                    ¿Ya tenés una cuenta? Iniciá sesión
                </Link>
                </div>
              </div>
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.User,
    isLoggedIn: state.Auth.get('idToken') !== null ? true : false,
  }
}

export default connect(
  mapStateToProps,
  null,
  null,
  { login }
)(SignUp);
// export default connect(mapStateToProps)(SignUp);
