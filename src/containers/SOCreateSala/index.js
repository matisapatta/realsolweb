import React, { Component } from 'react'
import { connect } from 'react-redux'


class CreateSala extends Component {

    constructor(props) {
        super(props)
    }

    render() {
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