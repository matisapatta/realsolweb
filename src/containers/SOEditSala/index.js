import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSalaDetail } from '../../redux/sosalas/actions'
import LocationSearchInput from '../../components/autocomplete'

class EditSala extends Component {

    // constructor(props) {
    //     super(props)
    // }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getSalaDetail(id))
    }

    render() {
        return (
            <div>
                Edit Sala
            <LocationSearchInput/>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        salas: state.Salas,
        user: state.User
    }
}


export default connect(mapStateToProps)(EditSala);