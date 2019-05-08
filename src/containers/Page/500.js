import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../image/404.png';
import IntlMessages from '../../components/utility/intlMessages';
import FiveZeroZeroStyleWrapper from './500.style';

class FiveHundred extends React.Component {
  render() {
    return (
      <FiveZeroZeroStyleWrapper className="iso500Page">
        <div className="iso500Content">
          <h1>
            <IntlMessages id="page500.title" />
          </h1>
          <h3>
            Ups!
          </h3>
          <p>
            Ha ocurrido un error interno del servidor.
          </p>
          <button type="button">
            <Link to="/">
              Volver al inicio
            </Link>
          </button>
        </div>

        <div className="iso500Artwork">
          <img alt="#" src={Image} />
        </div>
      </FiveZeroZeroStyleWrapper>
    );
  }
}

export default FiveHundred;
