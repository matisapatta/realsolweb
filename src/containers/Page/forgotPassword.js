import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import ForgotPasswordStyleWrapper from './forgotPassword.style';

class ForgotPassword extends React.Component {
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
                <Input size="large" placeholder="Email" />
              </div>

              <div className="isoInputWrapper">
                <Button type="primary">
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
