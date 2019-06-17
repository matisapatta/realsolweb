import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScriptTag from 'react-script-tag';
import axios from 'axios'

/* <form action={axios.post('/api/pay')} method="POST" style={{height:"100px"}} >
<ScriptTag
    src="https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js"
    data-public-key="TEST-508e8d24-efc9-4ba1-a139-b74a8f22e2b3"
    data-transaction-amount="100.00">
</ScriptTag>
</form> */


class GestionReservas extends Component {

    testF = () => {
        console.log("pepe")
    }

    render() {
        return (
            <div>
                Gestion reservas
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        salas: state.Sala
    }
}

export default connect(mapStateToProps)(GestionReservas)