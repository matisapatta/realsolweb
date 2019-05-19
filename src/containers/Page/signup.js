import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import { userRegister, 
  // getUsers 
} from '../../redux/sousers/actions';
import Auth0 from '../../helpers/auth0/index';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import { siteTitle } from '../../config';

const { login } = authAction;

class SignUp extends React.Component {
  state = {
    redirectToReferrer: false,
    name: '',
    lastname: '',
    email: '',
    password: '',
    error: ''
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
    this.setState({ email: event.target.value })
  }
  handleInputPassword = (event) => {
    this.setState({ password: event.target.value })
  }
  handleInputName = (event) => {
    this.setState({ name: event.target.value })
  }
  handleInputLastname = (event) => {
    this.setState({ lastname: event.target.value })
  }

  handleRegister = () => {
    this.props.dispatch(userRegister({
      email: this.state.email,
      name: this.state.name,
      lastname: this.state.lastname,
      password: this.state.password
    }))

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

  render() {
    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                {siteTitle}
              </Link>
            </div>

            <div className="isoSignUpForm">
              <div className="isoInputWrapper isoLeftRightComponent">
                <Input size="large" placeholder="Nombre" value={this.state.name} onChange={this.handleInputName} />
                <Input size="large" placeholder="Apellido" value={this.state.lastname} onChange={this.handleInputLastname} />
              </div>

              {/* <div className="isoInputWrapper">
                <Input size="large" placeholder="Username" />
              </div> */}

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
                  value={this.state.password}
                  onChange={this.handleInputPassword}
                />
              </div>

              <div className="isoInputWrapper" style={{ marginBottom: '50px' }}>
                <Checkbox>
                  <IntlMessages id="page.signUpTermsConditions" />
                </Checkbox>
              </div>

              <div className="isoInputWrapper">
                <Button onClick={this.handleRegister} type="primary">
                  Registrarse
                </Button>
              </div>
              <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signUpFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signUpGooglePlus" />
                </Button>
                {Auth0.isValid &&
                  <Button
                    onClick={() => {
                      Auth0.login(this.handleLogin);
                    }}
                    type="primary btnAuthZero"
                  >
                    <IntlMessages id="page.signUpAuth0" />
                  </Button>}
              </div>
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
