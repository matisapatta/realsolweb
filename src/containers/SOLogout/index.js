import React, { Component } from 'react';
import axios from 'axios'
import Spins from '../../components/uielements/spin';

class Logout extends Component {

    state = {
        loading: true
    }

    componentWillMount() {
        this.handleLogout();
    }

    handleLogout = () => {
        axios.get('/api/logout').then(() => {
            setTimeout(() => {
                this.setState({ loading: false })
                this.props.history.push('/')
            }, 1000)
        })
    }



    render() {
        return (
            <Spins spinning={this.state.loading}>
                <div className="logout_container">
                    <h1>
                        Cerrando sesión...
                </h1>
                </div>
            </Spins>

        );
    }

};

export default Logout;