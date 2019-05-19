import React from 'react';
import axios from 'axios'

const Logout = (props) => {

    axios.get('/api/logout').then(() => {
        setTimeout(() => {
            props.history.push('/')
        }, 2000)
    })

    return (
        <div className="logout_container">
            <h1>
                Cerrando sesión...
            </h1>
        </div>
    );
};

export default Logout;