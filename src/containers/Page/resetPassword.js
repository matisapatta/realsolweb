import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import ResetPasswordStyleWrapper from './resetPassword.style';
import notification from '../../components/notification';
import axios from 'axios'

class ResetPassword extends React.Component {

  state = {
    password: '',
    cpassword: '',
    passMessage: '',
    passOk: true,
    passMatch: true,
  };

  validateForm = () => {
    let isValid = false;
    let passOk = false;

    if (this.state.password === '') {
      this.setState({ passOk: false, passMessage: "Campo obligatorio" })
    } else if (this.state.password.length < 6) {
      this.setState({ passOk: false, passMessage: "La contraseña debe tener un mínimo de 6 caracteres" })
    } else {
      passOk = true;
    }

    if (passOk && this.state.passMatch) {
      isValid = true;
    }

    return isValid;
  }

  handleInputPassword = (event) => {
    if (event.target.value.length <= 30)
      this.setState({ password: event.target.value, passOk: true, passMatch: false })
  }

  validateInputPassword = (event) => {
    this.setState({ cpassword: event.target.value })
    if (event.target.value !== this.state.password)
      this.setState({ passMatch: false })
    else
      this.setState({ passMatch: true })
  }

  handleChangePassword = () => {
    if (this.validateForm()) {
      let sendData = {
        _id: this.props.match.params.id,
        password: this.state.password
      }
      axios.post('/api/resetpassword', sendData).then(response => {
        if (response.data.success){
          notification('success', "Contraseña actualizada con éxito")
          this.props.history.push('/signin');
        }
        else {
          if (response.data.msg)
            notification('error', response.data.msg)
          else
            notification('error', "Error al actualizar contraseña")
        }

      })
    } else {
      notification('error', "Hay errores en el formulario, por favor corregirlos.")
    }
    this.setState({ password: '', cpassword: '' });
  }

  render() {
    return (
      <ResetPasswordStyleWrapper className="isoResetPassPage">
        <div className="isoFormContentWrapper">
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                SALAS ONLINE
              </Link>
            </div>

            <div className="isoFormHeadText">
              <h3>
                Reestablecer la contraseña
              </h3>
              <p>
                Introducir nueva contraseña y confirmar
              </p>
            </div>

            <div className="isoResetPassForm">
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Nueva contraseña"
                  value={this.state.password} onChange={this.handleInputPassword}
                />
                <div style={{ color: "red" }}>{this.state.passOk ? "" : this.state.passMessage}</div>
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Confirme nueva contraseña"
                  value={this.state.cpassword}
                  onChange={this.validateInputPassword}
                />
                <div style={{ color: "red" }}>{this.state.passMatch ? "" : "Las contraseñas no coinciden"}</div>
              </div>

              <div className="isoInputWrapper">
                <Button type="primary" onClick={this.handleChangePassword}>
                  Modificar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ResetPasswordStyleWrapper>
    );
  }
}

export default ResetPassword;
