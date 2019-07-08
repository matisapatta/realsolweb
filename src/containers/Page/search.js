import React from 'react';
import { connect } from 'react-redux';
import Busqueda from '../SOBusqueda/index'
import { SearchWrapper } from './search.style'
import { Link, Redirect } from 'react-router-dom'
import { auth } from '../../redux/auth/actions';

class OfflineSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(auth());
    }

    render() {
        const from = { pathname: '/dashboard' };
        const { isLoggedIn } = this.props;
        if (isLoggedIn) {
            return <Redirect to={from} />;
        }
        return (
            <SearchWrapper>
                <div className="bgWrapper">
                    <div className="loginLinks">
                        <Link to="/signin" className="linkStyle">Iniciar sesión</Link>
                        <Link to="/signup" className="linkStyle" >Registrarse</Link>
                    </div>
                    <h1  ><Link to="/">Salas OnLine</Link></h1>
                    <Busqueda />
                </div>

            </SearchWrapper>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        salas: state.Salas,
        user: state.User,
        isLoggedIn: state.Auth.get('idToken') !== null ? true : false
    }
}


export default connect(mapStateToProps)(OfflineSearch);
