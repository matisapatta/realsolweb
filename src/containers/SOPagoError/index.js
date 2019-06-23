import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Image from '../../image/paymenterror.png';
import FiveZeroZeroStyleWrapper from './500.style';
import {deleteReservation} from '../../redux/soreservations/actions'

class PagoError extends React.Component {

  constructor(props){
    super(props)
    let reservation = {
      _id : props.match.params.id
    }
    props.dispatch(deleteReservation(reservation))
  }


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
            ERROR
          </h1>
          <h3>
            El pago ha sido rechazado, o ha sido cancelado manualmente
          </h3>
          <h3>
            Debe realizar la reserva nuevamente
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
