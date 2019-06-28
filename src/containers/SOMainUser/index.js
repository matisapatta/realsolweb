import React, { Component } from 'react';
import { connect } from 'react-redux'

class MainUser extends Component {
    render() {
        return (
            <div>
                Main User
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.User,
        salas: state.Salas,
        reservations: state.Reservations
    }
}

export default connect(mapStateToProps)(MainUser);