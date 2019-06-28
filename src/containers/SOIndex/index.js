import React, { Component } from 'react';
import { connect } from 'react-redux'
import MainUser from '../SOMainUser/index'
import MainVendor from '../SOMainVendor/index'

class IndexPage extends Component {
    render() {
        return (
            <div>
                {
                    this.props.user.users.role === 0 ?
                    <MainUser/>
                    : <MainVendor/>
                
                }
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

export default connect(mapStateToProps)(IndexPage);