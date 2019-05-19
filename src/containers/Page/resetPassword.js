import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import ResetPasswordStyleWrapper from './resetPassword.style';

class ResetPassword extends React.Component {
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
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Confirme nueva contraseña"
                />
              </div>

              <div className="isoInputWrapper">
                <Button type="primary">
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
