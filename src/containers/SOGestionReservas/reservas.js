import React, { Component } from 'react'
import { connect } from 'react-redux'
import MiniCalendar from '../../components/minicalendar'
import { CalendarStyleWrapper } from './minicalendar.style'
import { Col, Row } from 'antd'
import moment from 'moment'
import 'moment/locale/es';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Box from '../../components/utility/box';
import { CellWrapper, CellHeaderWrapper, CellColumnWrapper } from './cell.style'
import { getReservationsBySala, saveReservation, cancelReservation, closeReservation, getReservationById } from '../../redux/soreservations/actions'
import Modal from '../../components/feedback/modal';
import Button from '../../components/uielements/button';
import Spins from '../../components/uielements/spin';
import { ModalDataWrapper } from './modal.style';
import Select, { SelectOption } from '../../components/uielements/select';
import notification from '../../components/notification';
import { dailyhours } from '../../config';

const Cell = CellWrapper(Col);
const CellHeader = CellHeaderWrapper(Col);
const CellColumn = CellColumnWrapper(Col)

const hours_a = [1, 2];
let hoursOptions = []

class ManageReserva extends Component {

    state = {
        calendarDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0),
        rDay: null,
        loading: false,
        modalVisible: false,
        payModalVisible: false,
        resHours: 1,
    }

    constructor(props) {
        super(props)
        this.setCalendarDate = this.setCalendarDate.bind(this);
        hoursOptions.length === 0 ?
            hours_a.forEach((element) => {
                hoursOptions.push(<SelectOption key={element}>{element}</SelectOption>);
            })
            : this.dummy()
    }

    dummy = () => { }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.reservations.reservation) {
            if (prevProps.reservations.reservation._id !== this.props.reservations.reservation._id) {
                // let userReservations = this.props.user.users.reservations;
                // userReservations.push(this.props.reservations.reservation._id);
                // this.props.dispatch(updateUser({
                //     _id: this.props.user.users.id,
                //     reservations: userReservations
                // }))

                this.setState({ loading: false })
            }
        } else if (this.props.reservations.reservation) {
            // let userReservations = this.props.user.users.reservations;
            // userReservations.push(this.props.reservations.reservation._id);
            // this.props.dispatch(updateUser({
            //     _id: this.props.user.users.id,
            //     reservations: userReservations
            // }))

            this.setState({ loading: false })
        }
    }

    componentDidMount() {
        this.props.dispatch(getReservationsBySala(this.props.salas.currentSala._id))
        const size = this.props.salas.currentSala.rooms.length;
        switch (size) {
            case 1: {
                this.setState({ colSize: 18 });
                break;
            }
            case 2: {
                this.setState({ colSize: 10 });
                break;
            }
            case 3: {
                this.setState({ colSize: 6 });
                break;
            }
            case 4: {
                this.setState({ colSize: 5 });
                break;
            }
            default: {
                this.setState({ colSize: 6 });
                break;
            }
        }
    }

    setCalendarDate = date => {
        this.setState({ calendarDate: date })
    }

    showValidHours = (sala, numberDay, open) => {
        let v = true;
        let nextHour = sala.open[numberDay].from;
        let openHours = [];
        while (v) {
            if (moment(nextHour, 'HH:mm') < moment(sala.open[numberDay].to, 'HH:mm')) {
                openHours.push(nextHour)
                nextHour = moment(nextHour, 'HH:mm').add(1, 'hour').format('HH:mm')
            } else {
                v = false;
            }
        }
        if (openHours.length === 0)
            openHours = dailyhours;
        return (
            openHours.map((hour, houriteration) => (
                <Row key={houriteration}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <CellColumn xs={3} sm={3} md={3} lg={3}>{hour}</CellColumn>
                        {sala.rooms.map((room, roomiteration) =>
                            // {return (<Cell xs={this.state.colSize} sm={this.state.colSize} md={this.state.colSize} lg={this.state.colSize} key={roomiteration} onClick={(event) => { this.showReserveModal(room._id, hour) }} >{this.checkAvailability(room._id, hour)}</Cell>)}
                            this.checkAvailability(room._id, hour, roomiteration, open, room.price)
                        )}
                    </Col>
                </Row>
            ))
        )
    }

    checkAvailability = (room, hour, roomiteration, open, price) => {
        const list = this.props.reservations.list;
        const day = moment(this.state.calendarDate.getTime()).format("YYYYMMDD");
        let free = true;
        let id = '';
        let closed = false;
        // console.log(open)
        // const past = moment().isAfter
        // console.log(past)
        if (list) {

            list.forEach((item) => {
                if (item.from === hour && item.roomId === room && item.day === day) {
                    free = false;
                    id = item._id;
                    closed = item.closed;
                }
                if (item.hours > 1) {
                    if (parseInt(item.from.substring(0, 2), 10) + 1 === moment.duration(hour).hours() && item.roomId === room && item.day === day) {
                        free = false;
                        id = item._id;
                        closed = item.closed;
                    }
                }
            })
        }
        return (
            open ?
                free ?
                    // <Cell xs={this.state.colSize} sm={this.state.colSize} md={this.state.colSize} lg={this.state.colSize} key={roomiteration} onClick={() => { this.showReserveModal(room, hour) }}>Libre</Cell>
                    <Cell xs={this.state.colSize} sm={this.state.colSize} md={this.state.colSize} lg={this.state.colSize} key={roomiteration} onClick={() => { this.toggleModal(room, hour, price) }}>Libre</Cell>
                    :
                    <Cell xs={this.state.colSize} sm={this.state.colSize} md={this.state.colSize} lg={this.state.colSize} key={roomiteration} onClick={() => { this.showReservationDetail(id) }} style={{ backgroundColor: "rgba(197,239,247,0.3)" }} >{closed ? "Reserva cerrada" : "Reservado"}</Cell>
                :
                <Cell xs={this.state.colSize} sm={this.state.colSize} md={this.state.colSize} lg={this.state.colSize} key={roomiteration} style={{ cursor: "not-allowed", backgroundColor: "rgba(242, 241, 239, 0.8)" }} >Cerrado</Cell>
        )

    }

    toggleModal = (room, hour, price) => {
        this.setState({
            modalVisible: true,
            resRoom: room,
            resHour: hour,
            resPrice: price
        })
    }

    showReservationDetail = (id) => {
        this.props.dispatch(getReservationById(id));
        this.setState({ detailVisible: true })
    }

    handleOkDetail = () => {
        this.setState({
            detailVisible: false
        })
    }

    closeReservation = () => {
        let reservation = {
            id: this.props.reservations.currentReservation._id
        }
        this.props.dispatch(closeReservation(reservation))
        this.setState({ detailVisible: false })
        notification('success', "La reserva ha sido cerrada")
        this.props.dispatch(getReservationsBySala(this.props.salas.currentSala._id))

    }

    cancelReservation = () => {
        let sendData = {}
        sendData = {
            id: this.props.reservations.currentReservation._id,
            userid: this.props.user.users.id,
            username: this.props.user.users.name + ' ' + this.props.user.users.lastname
        }
        this.props.dispatch(cancelReservation(sendData))
        this.props.dispatch(getReservationsBySala(this.props.salas.currentSala._id))
        this.setState({ detailVisible: false })
        notification("success", "La reserva fue cancelada")
    }

    showReservationDetailModal = () => (
        this.props.reservations.currentReservation ?
            <Modal
                visible={this.state.detailVisible}
                title="Detalle de reserva"
                onOk={this.handleOkDetail}
                onCancel={this.handleOkDetail}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        onClick={this.handleOkDetail}
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
                                    <Button onClick={this.closeReservation} type="primary" style={{ width: "100%" }} >Cerrar reserva</Button>
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

    showReserveModal = () => (
        <Modal
            visible={this.state.modalVisible}
            title="Confirmar reserva"
            onOk={this.handleOk}
            onCancel={this.handleClose}
            footer={[
                <Button key="back" size="large" onClick={this.handleClose}>
                    Cancelar
          </Button>,
                <Button
                    key="submit"
                    type="primary"
                    size="large"
                    // loading={this.state.loading}
                    onClick={this.handleOk}
                >
                    Confirmar
          </Button>
            ]}
        >
            <ModalDataWrapper className="isoContactCard">
                <div className="isoContactInfoWrapper">
                    <div className="isoContactCardInfos">
                        <p className="isoInfoLabel" style={{ fontSize: "24px", paddingTop: "5px" }} >Reserva en {this.props.salas.currentSala.name}</p>
                    </div>
                    <div className="isoContactCardInfos">
                        <p className="isoInfoLabel">Día</p>
                        <span>{moment(this.state.calendarDate).format('dddd D [de] MMMM [de] YYYY')}</span>
                    </div>
                    <div className="isoContactCardInfos">
                        <p className="isoInfoLabel">Hora</p>
                        <span>{this.state.resHour}</span>
                    </div>
                    <div className="isoContactCardInfos">
                        <p className="isoInfoLabel">Horas</p>
                        <Select
                            style={{ "width": '100%', "fontSize": "14px" }}
                            placeholder=""
                            onChange={(event) => { this.setState({ resHours: event }) }}
                            value={this.state.resHours}
                        >
                            {hoursOptions}
                        </Select>
                    </div>
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
    )



    handleClose = (str) => {
        // if (str === "pay") {
        //     this.props.dispatch(deleteReservation(this.props.reservations.reservation))
        //     this.props.dispatch(getReservationsBySala(this.props.salas.currentSala._id))
        //     this.setState({ payModalVisible: false })
        // }
        this.setState({
            modalVisible: false,
            // payModalVisible: false,
        });
    };

    handleOk = () => {
        const room = this.state.resRoom;
        const hour = this.state.resHour;
        const hours = this.state.resHours;
        // const price = this.state.resPrice;
        const validHour = parseInt(hour.substring(0, 2), 10);
        let reservationDate = moment(this.state.calendarDate.getTime()).add(validHour, 'hours')
        const list = this.props.reservations.list;
        // console.log(reservationDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
        let busy = false;
        if (hours > 1) {

            if (list) {
                list.forEach((item) => {
                    if (parseInt(item.from.substring(0, 2), 10) === validHour + 1 && item.roomId === room && item.day === reservationDate.format("YYYYMMDD"))
                        busy = true;
                })
            }
        }
        if (!busy) {
            const resData = {
                salaId: this.props.salas.currentSala._id,
                day: reservationDate.format("YYYYMMDD"),
                ownerId: this.props.salas.currentSala.ownerId,
                roomId: room,
                from: hour,
                hours: hours,
                timestamp: reservationDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
                userId: this.props.user.users.id,
                paid: parseInt(hours, 10) * this.state.resPrice,
                salaName: this.props.salas.currentSala.name,
                cancelled: false,
                reviewed: false,
                numberDay: moment(this.state.calendarDate).day(),
            }

            // const user = this.props.user.users
            // const payData = {
            //     item: {
            //         title: "Reserva sala ensayo",
            //         quantity: parseInt(hours, 10),
            //         currency_id: 'ARS',
            //         unit_price: price
            //     },
            //     payer: {
            //         // email: user.email,
            //         email: 'test_user_72945948@testuser.com',
            //         name: user.name,
            //         surname: user.lastname,
            //         date_created: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ")
            //     },
            //     sala: {
            //         id: this.props.salas.currentSala._id
            //     },
            //     showPrice: price * hours
            // }

            // this.setState({ payData })
            console.log(this.state)
            console.log(this.props)
            this.props.dispatch(saveReservation(resData));
            this.props.dispatch(getReservationsBySala(this.props.salas.currentSala._id))
            this.setState({ loading: true })




        } else {
            notification('error', 'Ya existe una reserva para el horario seleccionado')
        }
        this.setState({ modalVisible: false, resHours: 1 })


    }

    reserveChart = () => {
        const sala = this.props.salas.currentSala;
        const numberDay = moment(this.state.calendarDate).day();
        let open = sala.days.find((element) => {
            return parseInt(element, 10) === moment(this.state.calendarDate).day();
        })

        return (
            <div>
                <Row style={{ height: "21px" }}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <CellHeader xs={3} sm={3} md={3} lg={3}>
                            Sala
                        </CellHeader>
                        {sala.rooms.map((item, i) => {
                            return (<CellHeader xs={this.state.colSize} sm={this.state.colSize} md={this.state.colSize} lg={this.state.colSize} key={i}>Sala {i + 1}</CellHeader>)
                        })}
                    </Col>
                </Row>
                {this.showValidHours(sala, numberDay, open)}
            </div>
        )
    }


    render() {
        // console.log(this.state.calendarDate)
        // console.log(rDay)
        // console.log(this.props)
        // console.log(this.state)
        moment.locale('es', {
            week: {
                dow: 0,
                // doy : Int
            }
        })
        const showingDate = moment(this.state.calendarDate).format('dddd D [de] MMMM [de] YYYY')
        const days = this.props.salas.currentSala.days;
        const titleStyle = {
            "fontSize": "35px",
            "textAlign": "center",
            "paddingTop": "20px",
        }

        return (
            <div>
                <Spins spinning={this.state.loading}>
                    {
                        this.props.salas.currentSala ?
                            <div style={titleStyle} >Reservas de sala {`${this.props.salas.currentSala.name}`}</div>
                            : <div></div>
                    }
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8} >
                            <CalendarStyleWrapper className="isomorphicCalendarWrapper">
                                <MiniCalendar
                                    setCalendarDate={this.setCalendarDate}
                                    validDays={days}
                                    vendor={true}
                                />
                            </CalendarStyleWrapper>
                        </Col>
                        <Col xs={24} sm={24} md={16} lg={16}>
                            <LayoutWrapper>
                                <Box
                                    title={`Fecha: ${showingDate}`}>
                                    {this.reserveChart()}
                                </Box>
                            </LayoutWrapper>
                        </Col>
                    </Row>
                    {this.showReserveModal()}
                    {this.showReservationDetailModal()}
                </Spins>
            </div>
        )

    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        salas: state.Salas,
        user: state.User,
        reservations: state.Reservations
    }
}


export default connect(mapStateToProps)(ManageReserva);