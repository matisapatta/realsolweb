import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux'
import Image from '../../image/paymentsuccess.png';
import FiveZeroZeroStyleWrapper from './500.style';

class PagoExitoso extends React.Component {


  redirect = () => {
    setTimeout(()=>{
      this.props.history.push('/')
    },3000)
  }

  render() {
    return (
      <FiveZeroZeroStyleWrapper className="iso500Page">
        <div className="iso500Content">
          <h1>
            PAGO APROBADO
          </h1>
          <h3>
            El pago ha sido aceptado
          </h3>
          <p>
            En 3 segundos será redirigido a la página inicial
          </p>
          <button type="button">
            <Link to="/">
              Volver al inicio
            </Link>
          </button>
          {this.redirect()}
        </div>

        <div className="iso500Artwork">
          <img alt="#" src={Image} />
        </div>
      </FiveZeroZeroStyleWrapper>
    );
  }
}

export default PagoExitoso;
