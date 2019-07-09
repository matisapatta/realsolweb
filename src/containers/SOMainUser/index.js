import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd';
import Spins from '../../components/uielements/spin';
import basicStyle from '../../config/basicStyle';
import { getNextReserv, getLastReview, getLastSala } from '../../redux/soreports/actions'
import Box from '../../components/utility/box';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import { WRAPPEDURL } from '../../config';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faThumbsUp, faThumbsDown, faBuilding } from '@fortawesome/free-solid-svg-icons'
import Rate from '../../components/uielements/rate';
import { SingleCardWrapper } from './card.style';
import ContentHolder from '../../components/utility/contentHolder';
import Card from '../../components/uielements/styles/card.style';
import PianoImg from '../../image/piano3.png'
import PersonImg from '../../image/person2.png'

const rowStyle = {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center'
  };
const colStyle = {
    marginBottom: "16px",
    display: "flex",
    flex:"0 1 auto",
}

const imgStyle = {
    display:"flex",
    padding:"20px",
    maxHeight:"auto",
    maxWidth:"100%"

}

class MainUser extends Component {

    state = {
        loading: true,
    }

    constructor(props) {
        super(props)
        setTimeout(() => {
            props.dispatch(getNextReserv(this.props.user.users.id))
        }, 200)
        setTimeout(() => {
            props.dispatch(getLastReview())
        }, 400)
        setTimeout(() => {
            props.dispatch(getLastSala())
        }, 600)
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000)
    }

    showLastReview = () => {
        const reviews = this.props.reports.lastReview;
        return (
            reviews ?
                reviews.length !== 0 ?
                    <div>
                        {
                            reviews.map((item, i) => (
                                <SingleCardWrapper key={i} style={{ border: "0.5px solid lightgrey", boxShadow: "none" }} >
                                    <div className="isoCardContent">
                                        {/* <h3 className="isoCardTitle">Sala {i + 1}</h3> */}
                                        <span>Reseña de {item.reviewerName}, creada el {moment(item.createdAt).format('D [de] MMMM [de] YYYY')} para {item.salaName} </span>
                                        <Rate value={item.score} disabled />
                                        <span className="isoCardDate">
                                            {item.reviewText}
                                        </span>
                                    </div>
                                </SingleCardWrapper>
                            ))
                        }
                    </div>
                    :
                    <div style={{ fontSize: "20px" }}>No hay valoraciones recientes</div>
                : <div style={{ fontSize: "20px" }} >No hay valoraciones recientes</div>
        )
    }

    showLatestSala = () => {
        if (this.props.reports.latestSala) {
            const sala = this.props.reports.latestSala[0];
            return (
                sala ?
                    <ContentHolder>
                        <Card
                            loading={false}
                            title={
                                <div>
                                    <Link style={{ color: "inherit important!" }} to={`${WRAPPEDURL}/sala/${sala._id}`}>{`${sala.name}, ${sala.location}`}</Link>
                                    <Rate value={sala.score} disabled style={{ paddingLeft: "15px" }} />
                                </div>
                            }
                            style={{ width: '100%' }}
                        >
                            <div style={{ textAlign: "justify" }} >{sala.description}</div>
                            <br />
                            <div><b>Dirección:</b> {sala.address.stringaddress}</div>
                            <div><b>Teléfono:</b> {sala.phoneNumber[0]}</div>
                        </Card>
                    </ContentHolder>
                    :
                    <div style={{ fontSize: "20px" }}>No hay salas creadas recientemente</div>
            )
        }

    }

    render() {
        // console.log(this.props)
        return (
            <Spins spinning={this.state.loading}>

                <h3 style={{ alignItems: "center", textAlign: "center", justifyContent: "center", fontSize: "30px", paddingTop: "30px", textTransform: "uppercase" }}>
                    Bienvenido!
                    </h3>
                <LayoutWrapper>
                    <Row style={rowStyle} gutter={0} justify="center" >
                        <Col md={24} sm={24} xs={24} style={colStyle}>
                            <Box>
                                {
                                    this.props.reports.nextReserv ?
                                        <Row>
                                            <Col md={3} sm={3} xs={0} style={colStyle} >
                                                <FontAwesomeIcon icon={faCalendarAlt} style={{ fontSize: "110px", color: "#013243" }} />
                                            </Col>
                                            <Col md={21} sm={21} xs={24}>
                                                <h3 style={{ fontSize: "24px", textTransform: "uppercase" }}>Próxima reserva</h3>
                                                <div style={{ fontSize: "18px" }}><b>Día:</b> {moment(this.props.reports.nextReserv.timestamp).format('dddd D [de] MMMM [de] YYYY [a las] HH:mm')}</div>
                                                <div style={{ fontSize: "18px" }}><b>Sala:</b> {this.props.reports.nextReserv.salaName}</div>
                                                <div style={{ fontSize: "18px" }}><b>Dirección:</b>  {this.props.reports.nextReserv.salaAddress}, {this.props.reports.nextReserv.location}</div>
                                            </Col>
                                        </Row>
                                        : <div style={{ fontSize: "20px" }}>No tenés próximas reservas. ¡Hacé click <Link to={`${WRAPPEDURL}/busqueda`}>acá</Link> para empezar a buscar!</div>
                                }

                            </Box>
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={0} justify="center" >
                        <Col md={12} sm={12} xs={24} style={colStyle}>
                            <Box>
                                <div style={{ fontSize: "25px", paddingBottom: "20px" }}>
                                    <FontAwesomeIcon icon={faThumbsUp} style={{ color: "#f4d03f" }} /> <span style={{ fontSize: "24px", textTransform: "uppercase", padding: "0 15px", fontWeight: "500", color: "rgba(0,0,0,0.85)" }}>Últimas valoraciones</span> <FontAwesomeIcon icon={faThumbsDown} style={{ color: "#f4d03f" }} />
                                </div>
                                <div>
                                    {this.showLastReview()}
                                </div>
                            </Box>

                        </Col>
                        <Col md={12} sm={12} xs={0} style={colStyle}>
                            <img src={PersonImg} alt="#" style={imgStyle} />
                        </Col>
                    </Row>
                    <Row style={rowStyle} gutter={0} justify="center" >
                        <Col md={12} sm={12} xs={0} style={colStyle}>
                            <img src={PianoImg} alt="#" style={imgStyle} />
                        </Col>
                        <Col md={12} sm={12} xs={24} style={{ colStyle }}>
                            <Box>
                                <div style={{ fontSize: "25px", paddingBottom: "20px" }}>
                                    <FontAwesomeIcon icon={faBuilding} style={{ color: "#1e824c" }} /> <span style={{ fontSize: "24px", textTransform: "uppercase", padding: "0 15px", fontWeight: "500", color: "rgba(0,0,0,0.85)" }}>Nueva sala disponible</span>
                                </div>
                                <div>
                                    {this.showLatestSala()}
                                </div>
                            </Box>
                        </Col>
                    </Row>

                </LayoutWrapper>
            </Spins>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        user: state.User,
        salas: state.Salas,
        reservations: state.Reservations,
        reports: state.Reports,
    }
}

export default connect(mapStateToProps)(MainUser);