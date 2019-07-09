import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import ForgotPasswordStyleWrapper from './forgotPassword.style';
import axios from 'axios';
import notification from '../../components/notification'

class ForgotPassword extends React.Component {

  state = {
    email: '',
    emailOk: true,
    emailMessage: '',
  };

  handleInputEmail = (event) => {
    if (event.target.value.length <= 50)
      this.setState({ email: event.target.value, emailOk: true })
  }

  validateEmail = (email) => {
    var re = new RegExp(/\S+@\S+\.\S+/);
    return re.test(email);
  }

  validateForm = () => {
    let isValid = false;
    let emailOk = false;

    if (this.state.email === '') {
      this.setState({ emailOk: false, emailMessage: "Campo obligatorio" })
    } else if (!this.validateEmail(this.state.email)) {
      this.setState({ emailOk: false, emailMessage: "Formato de email incorrecto" })
    } else {
      emailOk = true;
    }
    if (emailOk) {
      isValid = true;
    }

    return isValid;
  }


  sendEmail = () => {
    if (this.validateForm()) {
      let sendData = {
        email: this.state.email
      }
      axios.post('/api/forgotpassword', sendData).then(response => {
        if (response.data.success) {
          notification('success',`El link ha sido enviado a ${response.data.doc.email}`)
          this.props.history.push('/signin')
        } else {
          notification('error', response.data.msg)
          this.setState({ email: '' })
        }

      })
    } else {
      notification('error', "Hay errores en el formulario, por favor corregirlos.")
    }
  }


  render() {
    return (
      <ForgotPasswordStyleWrapper className="isoForgotPassPage">
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                SALAS ONLINE
              </Link>
            </div>

            <div className="isoFormHeadText">
              <h3>
                ¿Problemas para ingresar?
              </h3>
              <p>
                Escribí tu correo electrónico y recibirás un enlace para reestablecer la contraseña
              </p>
            </div>

            <div className="isoForgotPassForm">
              <div className="isoInputWrapper">
                <Input size="large" type="email" placeholder="Email" value={this.state.email} onChange={this.handleInputEmail} />
                <div style={{ color: "red" }}>{this.state.emailOk ? "" : this.state.emailMessage}</div>
              </div>

              <div className="isoInputWrapper">
                <Button type="primary" onClick={this.sendEmail}>
                  Enviar correo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ForgotPasswordStyleWrapper>
    );
  }
}

export default ForgotPassword;
