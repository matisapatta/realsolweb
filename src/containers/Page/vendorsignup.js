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
import Auth0 from '../../helpers/auth0/index';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './vendorsignup.style';
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
    cpassword: '',
    error: '',
    accepted: false,
    passOk: true,
    emailOk: true,
    nameOk: true,
    lastNameOk: true,
    phoneOk: true,
    passMatch: true,
    acceptedOk: true,
  };


  componentWillReceiveProps(nextProps) {

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
      this.setState({ email: event.target.value, emailOk: true })
  }
  handleInputPassword = (event) => {
    if (event.target.value.length <= 30)
      this.setState({ password: event.target.value, passOk: true, passMatch: false })
  }
  handleInputName = (event) => {
    if (event.target.value.length <= 20)
      this.setState({ name: event.target.value, nameOk: true })
  }
  handleInputLastname = (event) => {
    if (event.target.value.length <= 20)
      this.setState({ lastname: event.target.value, lastNameOk: true })
  }
  handleInputPhone = (event) => {
    if (event.target.value.length <= 15)
      this.setState({ phone: event.target.value, phoneOk: true })
  }

  toggleAccepted = () => {
    this.setState({ accepted: !this.state.accepted, acceptedOk: true })
  }

  validateInputPassword = (event) => {
    this.setState({ cpassword: event.target.value })
    if (event.target.value !== this.state.password)
      this.setState({ passMatch: false })
    else
      this.setState({ passMatch: true })
  }

  validateEmail = (email) => {
    var re = new RegExp(/\S+@\S+\.\S+/);
    return re.test(email);
  }

  handleRegister = () => {
    if (this.validateForm()) {
      this.props.dispatch(userRegister({
        email: this.state.email,
        name: this.state.name,
        lastname: this.state.lastname,
        password: this.state.password,
        phone: this.state.phone,
        role: 1,
      }))
    } else {
      notification('error', "Hay errores en el formulario, por favor corregirlos.")
    }
  }


  validateForm = () => {
    let isValid = false;
    let nameOk = false;
    let lastNameOk = false;
    let phoneOk = false;
    let emailOk = false;
    let passOk = false;
    let acceptedOk = false
    if (this.state.name === '') {
      this.setState({ nameOk: false })
    } else {
      nameOk = true;
    }
    if (this.state.lastname === '') {
      this.setState({ lastNameOk: false })
    } else {
      lastNameOk = true;
    }
    if (this.state.password === '') {
      this.setState({ passOk: false, passMessage: "Campo obligatorio" })
    } else if (this.state.password.length < 6) {
      this.setState({ passOk: false, passMessage: "La contraseña debe tener un mínimo de 6 caracteres" })
    } else {
      passOk = true;
    }
    if (this.state.email === '') {
      this.setState({ emailOk: false, emailMessage: "Campo obligatorio" })
    } else if (!this.validateEmail(this.state.email)) {
      this.setState({ emailOk: false, emailMessage: "Formato de email incorrecto" })
    } else {
      emailOk = true;
    }
    if (this.state.phone === '') {
      this.setState({ phoneOk: false })
    } else {
      phoneOk = true;
    }
    if (!this.state.accepted) {
      this.setState({ acceptedOk: false })
    } else {
      acceptedOk = true;
    }

    if (acceptedOk
      && nameOk
      && lastNameOk
      && phoneOk
      && emailOk
      && passOk
      && this.state.passMatch
    ) {
      isValid = true;
    }

    return isValid;
  }


  // submitForm = (e) => {
  //   e.preventDefault()
  //   this.setState({ error: '' });
  //   this.props.dispatch(userRegister({
  //     email: this.state.email,
  //     name: this.state.name,
  //     lastname: this.state.lastname,
  //     password: this.state.password,
  //     role: 1
  //   }, this.props.user.users))
  // }

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
      role: 1,
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
      role: 1,
    }))
  }

  render() {

    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/">
                <div>{siteTitle}</div>
                <br />
                <div>Registro como Proveedor</div>
              </Link>
            </div>
            <div className="isoSignUpForm">
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Nombre" value={this.state.name} onChange={this.handleInputName} />
                <div style={{ color: "red" }}>{this.state.nameOk ? "" : "Campo obligatorio"}</div>
              </div>
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Apellido" value={this.state.lastname} onChange={this.handleInputLastname} />
                <div style={{ color: "red" }}>{this.state.lastNameOk ? "" : "Campo obligatorio"}</div>
              </div>
              <div className="isoInputWrapper">
                <Input size="large" type="number" placeholder="Teléfono" value={this.state.phone} onChange={this.handleInputPhone} />
                <div style={{ color: "red" }}>{this.state.phoneOk ? "" : "Campo obligatorio"}</div>
              </div>

              <div className="isoInputWrapper">
                <Input size="large" type="email" placeholder="Email" value={this.state.email} onChange={this.handleInputEmail} />
                <div style={{ color: "red" }}>{this.state.emailOk ? "" : this.state.emailMessage}</div>
              </div>

              <div className="isoInputWrapper">
                <Input size="large" type="password" placeholder="Contraseña" value={this.state.password} onChange={this.handleInputPassword} />
                <div style={{ color: "red" }}>{this.state.passOk ? "" : this.state.passMessage}</div>
              </div>


              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Confirmar Contraseña"
                  value={this.state.cpassword}
                  onChange={this.validateInputPassword}
                />
                <div style={{ color: "red" }}>{this.state.passMatch ? "" : "Las contraseñas no coinciden"}</div>
              </div>


              <div className="isoInputWrapper" style={{ marginBottom: '50px', paddingTop: '30px', }}>
                <Checkbox checked={this.state.accepted} onChange={this.toggleAccepted} >
                  <IntlMessages id="page.signUpTermsConditions" />
                </Checkbox>
                <div style={{ color: "red" }}>{this.state.acceptedOk ? "" : "Campo obligatorio"}</div>
              </div>

              <div className="isoInputWrapper">
                <Button onClick={this.handleRegister} type="primary">
                  Registrarse
                </Button>
              </div>
              
              {/* <div className="isoInputWrapper isoOtherLogin">
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
                {Auth0.isValid &&
                  <Button
                    onClick={() => {
                      Auth0.login(this.handleLogin);
                    }}
                    type="primary btnAuthZero"
                  >
                    <IntlMessages id="page.signUpAuth0" />
                  </Button>}
              </div> */}

              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
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
