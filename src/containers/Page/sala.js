import React from 'react';
import { connect } from 'react-redux';
import Sala from '../SOSala/index'
import { SalaWrapper } from './sala.style'
import { Link, Redirect } from 'react-router-dom'
import { auth } from '../../redux/auth/actions';

class OfflineSala extends React.Component {
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
        // console.log(this.props)
        return (
            <SalaWrapper>
                <div className="bgWrapper">
                    <div className="loginLinks">
                        <Link to="/signin" className="linkStyle">Iniciar sesión</Link>
                        <Link to="/signup" className="linkStyle" >Registrarse</Link>
                    </div>
                    <h1  ><Link to="/">Salas OnLine</Link></h1>
                    {/* onClick={()=>{this.props.history.push('/')}} */}
                    <Sala />
                </div>
            </SalaWrapper>
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


export default connect(mapStateToProps)(OfflineSala);