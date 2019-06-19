import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getReservationsByUser } from '../../redux/soreservations/actions'

class Reviews extends Component {

    constructor(props){
        super(props)
        props.dispatch(getReservationsByUser(props.user.users.id))
    }

    render() {
        console.log(this.props)
        return (
            <div>
                Reviews
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.User,
        salas: state.Salas,
        reservations: state.Reservations,
    }
}

export default connect(mapStateToProps)(Reviews)