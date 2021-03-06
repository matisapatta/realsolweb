import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSalasOwner, getSalaDetail, getSalasAdmin } from '../../redux/sosalas/actions';
import { getReviewsBySala } from '../../redux/soreviews/actions'
import LayoutWrapper from '../../components/utility/layoutWrapper';
// import { Link } from 'react-router-dom'
import { WRAPPEDURL } from '../../config';
import ContentHolder from '../../components/utility/contentHolder';
import {
    Col,
    Row,
} from 'antd';
import Card from '../../components/uielements/styles/card.style';
import { rowStyle, gutter } from '../../config/styleConst';
import { InputSearch } from '../../components/uielements/input';
import { getReservationById, closeReservation, cancelReservation } from '../../redux/soreservations/actions'
import notification from '../../components/notification'
import Modal from '../../components/feedback/modal';
import Button from '../../components/uielements/button';
// import Spins from '../../components/uielements/spin';
import { ModalDataWrapper } from './modal.style';
import moment from 'moment'
import Rate from '../../components/uielements/rate';
import { SingleCardWrapper } from '../SOSala/room.style';

const titleStyle = {
    "fontSize": "25px",
    "textAlign": "center",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "width": "100%"
}

class GestionReservas extends Component {

    // constructor(props) {
    //     super(props)
    // }

    state = {
        searchValue: '',
        reviewModalVisible: false,
    }

    reservePage = (id) => {
        this.props.dispatch(getSalaDetail(id))
        setTimeout(() => {
            this.props.history.push(`${WRAPPEDURL}/gestionreservas/sala/${id}`)
        }, 200)
    }

    componentDidMount() {
        if (this.props.user.users.role === 1) {
            this.props.dispatch(getSalasOwner(this.props.user.users.id))
        } else if (this.props.user.users.role === 2) {
            this.props.dispatch(getSalasAdmin())
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.reviews.list && this.props.reviews.list !== prevProps.reviews.list) {
            this.setState({
                reviews: this.props.reviews.list,
                reviewModalVisible: true,
            })
        }
    }

    handleSearchInput = (event) => {
        this.setState({
            searchValue: event.target.value
        })
    }

    submitSearch = () => {
        const id = this.state.searchValue;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            this.props.dispatch(getReservationById(id));
            // setTimeout(()=>{
            this.setState({ modalVisible: true })
            // },3000)
        } else {
            notification('error', "No es un formato de ID de reserva válido")
        }

    }

    closeReservation = () => {
        let reservation = {
            id: this.props.reservations.currentReservation._id
        }
        this.props.dispatch(closeReservation(reservation))
        this.setState({ modalVisible: false })
        notification('success', "La reserva ha sido cerrada")

    }

    cancelReservation = () => {
        let sendData = {}
        sendData = {
            id: this.props.reservations.currentReservation._id,
            userid: this.props.user.users.id,
            username: this.props.user.users.name + ' ' + this.props.user.users.lastname
        }
        this.props.dispatch(cancelReservation(sendData))
        this.setState({ modalVisible: false })
        notification("success", "La reserva fue cancelada")
        // this.props.dispatch(getReservationsBySala(this.props.salas.currentSala._id))
    }


    handleOk = () => {
        this.setState({
            modalVisible: false,
            reviewModalVisible: false,
        })
    }

    showReviews = (salaId) => {
        this.props.dispatch(getReviewsBySala(salaId))
    }

    reviewModal = () => (
        this.state.reviews ?
            <Modal
                style={{ height: "300px" }}
                visible={this.state.reviewModalVisible}
                title="Valoraciones"
                onOk={this.handleOk}
                onCancel={this.handleOk}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        // loading={this.state.loading}
                        onClick={this.handleOk}
                    >
                        Cerrar
                    </Button>
                ]}
            >
                <div style={{ maxHeight: "300px", overflow: "scroll" }}>
                    {
                        this.state.reviews.map((item, i) => (
                            <SingleCardWrapper key={i} style={{ border: "0.5px solid lightgrey", boxShadow: "none" }} >
                                <div className="isoCardContent">
                                    {/* <h3 className="isoCardTitle">Sala {i + 1}</h3> */}
                                    <span>Reseña de {item.reviewerName}, creada el {moment(item.createdAt).format('D [de] MMMM [de] YYYY')}</span>
                                    <Rate value={item.score} disabled />
                                    <span className="isoCardDate">
                                        {item.reviewText}
                                    </span>
                                </div>
                            </SingleCardWrapper>
                        ))
                    }
                </div>
            </Modal>
            : <div></div>
    )

    showReservationModal = () => (
        this.props.reservations.currentReservation ?
            <Modal
                visible={this.state.modalVisible}
                title="Detalle de reserva"
                onOk={this.handleOk}
                onCancel={this.handleOk}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        onClick={this.handleOk}
                    >
                        OK
                </Button>
                ]}
            >
                <ModalDataWrapper className="isoContactCard">
                    <div className="isoContactInfoWrapper">
                        <div className="isoContactCardInfos">
                            <p className="isoInfoLabel" style={{ fontSize: "24px", paddingTop: "5px" }} >Reserva en {this.props.reservations.currentReservation.salaName}</p>
                        </div>
                        <div className="isoContactCardInfos">
                            <p className="isoInfoLabel">Día</p>
                            <span>{moment(this.props.reservations.currentReservation.timestamp).format('dddd D [de] MMMM [de] YYYY')}</span>
                        </div>
                        <div className="isoContactCardInfos">
                            <p className="isoInfoLabel">Hora</p>
                            <span>{this.props.reservations.currentReservation.from}</span>
                        </div>
                        <div className="isoContactCardInfos">
                            <p className="isoInfoLabel">Horas</p>
                            <span>{this.props.reservations.currentReservation.hours}</span>
                        </div>
                        <div className="isoContactCardInfos">
                            <p className="isoInfoLabel">Usuario</p>
                            <span>{this.props.reservations.currentReservation.username}</span>
                        </div>
                        <div className="isoContactCardInfos">
                            <p className="isoInfoLabel">Email</p>
                            <span>{this.props.reservations.currentReservation.useremail}</span>
                        </div>
                        <div className="isoContactCardInfos">
                            <p className="isoInfoLabel">Teléfono</p>
                            <span>{this.props.reservations.currentReservation.userphone}</span>
                        </div>
                        {
                            this.props.reservations.currentReservation.cancelled ?
                                <div>
                                    <div className="isoContactCardInfos">
                                        <p className="isoInfoLabel">Cancelada el</p>
                                        <span>{moment(this.props.reservations.currentReservation.updatedAt).format('dddd D [de] MMMM [de] YYYY')}</span>
                                    </div>
                                    <div className="isoContactCardInfos">
                                        <p className="isoInfoLabel">Cancelada por</p>
                                        <span>{this.props.reservations.currentReservation.cancelledBy}</span>
                                    </div>
                                </div>
                                : <div></div>
                        }
                        {
                            !this.props.reservations.currentReservation.cancelled && !this.props.reservations.currentReservation.closed ?
                                <div className="isoContactCardInfos" style={{ textAlign: "center" }}>
                                    <Button onClick={this.closeReservation} style={{ width: "100%" }} type="primary">Cerrar reserva</Button>
                                </div>
                                : <div></div>
                        }
                        {
                            !this.props.reservations.currentReservation.cancelled && !this.props.reservations.currentReservation.closed && this.props.user.users.id === this.props.reservations.currentReservation.userId ?
                                <div className="isoContactCardInfos" style={{ textAlign: "center" }}>
                                    <Button onClick={this.cancelReservation} type="" style={{ width: "100%" }} >Cancelar reserva</Button>
                                </div>
                                : <div></div>
                        }
                        {
                            this.props.reservations.currentReservation.closed ?
                                <div className="isoContactCardInfos">
                                    <p className="isoInfoLabel" style={{ alignContent: "center", justifyContent: "center", alignItems: "center", fontSize: "24px" }}>Reserva Cerrada</p>
                                </div>
                                : <div></div>
                        }

                    </div>

                </ModalDataWrapper>
                {/* <div>
                Reserva en Sala {this.props.salas.currentSala.name}
            </div>
            <div>
                Día: {moment(this.state.calendarDate).format('YYYYMMDD')}
                Hora: {this.state.resHour}
            </div> */}
            </Modal>
            : <div></div>
    )


    showResults = (data) => {
        return (
            data ?
                (data.length > 0) ?
                    data.map((sala, i) => (
                        // <Link to={`${WRAPPEDURL}/gestionreservas/sala/${sala._id}`} key={i}>
                        <div key={i} >
                            <ContentHolder style={{
                                marginTop: "8px"
                            }}>
                                <Card
                                    loading={false}
                                    title={<div><span onClick={() => this.reservePage(sala._id)} style={{ cursor: "pointer" }} >{sala.name}, {sala.location}</span>
                                        <Rate value={sala.score} disabled style={{ paddingLeft: "15px" }} />
                                        {
                                            sala.score !== 0 ?
                                                <span style={{ fontSize: "14px", fontWeight: "400", cursor: 'pointer' }} onClick={() => { this.showReviews(sala._id) }}>
                                                    Ver valoraciones
                                                </span>
                                                :
                                                <span style={{ fontSize: "14px", fontWeight: "400" }}  >
                                                    Aún no hay valoraciones
                                                </span>
                                        }
                                    </div>}
                                    style={{ width: '100%' }}
                                >
                                    <span onClick={() => this.reservePage(sala._id)} style={{ cursor: "pointer" }} >{sala.description}</span>
                                </Card>
                            </ContentHolder>
                        </div>
                        // </Link>
                    ))
                    : <div>No tiene salas registradas</div>
                : <div>No tiene salas registradas</div>
        )
    }

    render() {
        // console.log(this.props)
        return (
            <LayoutWrapper>
                <div style={titleStyle}>
                    Gestión de Reservas
                </div>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={{ marginBottom: "10px" }} >
                        <ContentHolder>
                            <InputSearch
                                size="large"
                                placeholder="Buscar por código de reserva"
                                value={this.state.searchValue}
                                onChange={this.handleSearchInput}
                                onPressEnter={this.submitSearch}
                                onSearch={this.submitSearch}
                            />
                        </ContentHolder>
                    </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={{
                        marginBottom: "10px"
                    }} >
                        {/* <Box title="Salas"> */}
                        {this.showResults(this.props.salas.listSalas)}
                        {/* </Box> */}
                    </Col>
                </Row>
                {this.showReservationModal()}
                {this.reviewModal()}
            </LayoutWrapper>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        salas: state.Salas,
        user: state.User,
        reservations: state.Reservations,
        reviews: state.Reviews,
    }
}


export default connect(mapStateToProps)(GestionReservas);