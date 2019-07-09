import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Image from '../../image/paymentsuccess.png';
import FiveZeroZeroStyleWrapper from './500.style';
import { activateUser } from '../../redux/sousers/actions'

class PagoError extends React.Component {

  constructor(props) {
    super(props)
    let user = {
      _id: props.match.params.id
    }
    props.dispatch(activateUser(user))
  }


  redirect = () => {
    setTimeout(() => {
      this.props.history.push('/signin')
    }, 3000)
  }


  render() {
    return (
      <FiveZeroZeroStyleWrapper className="iso500Page">
        <div className="iso500Content">
          <h1>
            BIENVENIDO!
          </h1>
          <h3>
            El usuario ha sido activado correctamente
          </h3>
          <h3>
            Ya podés comenzar a utilizar el servicio 
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

const mapStateToProps = (state, ownProps) => {
  return {
    reservation: state.Reservations
  }
}

export default connect(mapStateToProps)(PagoError);
