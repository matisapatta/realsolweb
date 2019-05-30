import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSalasOwner } from '../../redux/sosalas/actions';

class CreateSala extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(getSalasOwner(this.props.user.users.id))
    }

    render() {
        console.log(this.props)
        return (
            <div>Crear sala</div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        salas: state.Salas,
        user: state.User
    }
}


export default connect(mapStateToProps)(CreateSala);