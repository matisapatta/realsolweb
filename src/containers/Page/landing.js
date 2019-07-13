import React, { Component } from 'react';
import { connect } from 'react-redux'
import { FirstSectionWrapper } from './landing.style'
import { Col, Row } from 'antd'
import { rowStyle, gutter } from '../../config/styleConst';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faThumbsUp, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Link, Redirect } from 'react-router-dom'
import Button from '../../components/uielements/button';
import { auth } from '../../redux/auth/actions';


class Landing extends Component {
    // constructor(props) {
    //     super(props);
    // }

    goToSearch = () => {
        this.props.history.push('/search');
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
            <div>
                <FirstSectionWrapper>
                    <div className="firstSection">
                        <div className="loginLinks">
                            <Link to="/signin" className="linkStyle">Iniciar sesión</Link>
                            <Link to="/signup" className="linkStyle" >Registrarse</Link>
                        </div>
                        <h3>Salas OnLine</h3>
                        <h4>Tus próximos ensayos, en un solo lugar</h4>
                    </div>
                    <Row style={rowStyle} gutter={gutter} justify="start">
                        <Col sm={8} xs={24} lg={8} style={{ textAlign: "center" }}>
                            <p className="iconPg"><FontAwesomeIcon icon={faUsers} /></p>
                            <p className="textPg">Buscá salas de ensayo en una gran base de datos centralizada, con cientos de salas disponibles</p>
                        </Col>
                        <Col sm={8} xs={24} lg={8} style={{ textAlign: "center" }}>
                            <p className="iconPg"><FontAwesomeIcon icon={faCalendarAlt} /></p>
                            <p className="textPg">Reservá, pagá, y gestioná tus reservas desde la web, con una interfaz simple y amigable</p>
                        </Col>
                        <Col sm={8} xs={24} lg={8} style={{ textAlign: "center" }}>
                            <p className="iconPg"><FontAwesomeIcon icon={faThumbsUp} /></p>
                            <p className="textPg">Valorá las salas luego de las reservas, para que entre todos podamos mejorar</p>
                        </Col>
                    </Row>
                    <div className="secondSection"></div>
                    <div className="searchSection">
                        <h3>Buscá una sala y reservá el próximo ensayo con tu banda</h3>
                        <Button className="searchButton" type="primary" onClick={this.goToSearch}>Buscar</Button>
                    </div>
                    <div className="footer">
                        <p>Salas Online © 2019</p>
                    </div>



                </FirstSectionWrapper>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        user: state.User,
        salas: state.Salas,
        isLoggedIn: state.Auth.get('idToken') !== null ? true : false
    }
}

export default connect(mapStateToProps)(Landing);
