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
import { getReservationsBySala, saveReservation } from '../../redux/soreservations/actions'
import { updateUser } from '../../redux/sousers/actions'
import Modal from '../../components/feedback/modal';
import Button from '../../components/uielements/button';
import Spins from '../../components/uielements/spin';
import { ModalDataWrapper } from './modal.style';
import Select, { SelectOption } from '../../components/uielements/select';
import notification from '../../components/notification';
import { dailyhours } from '../../config';
import axios from 'axios'

const Cell = CellWrapper(Col);
const CellHeader = CellHeaderWrapper(Col);
const CellColumn = CellColumnWrapper(Col)

const hours_a = [1, 2];
let hoursOptions = []

class CreateReserva extends Component {

    state = {
        calendarDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0),
        rDay: null,
        loading: false,
        modalVisible: false,
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

        const payData = {...this.state.payData, reservationId:''}

        if (prevProps.reservations.reservation) {
            if (prevProps.reservations.reservation._id !== this.props.reservations.reservation._id) {
                let userReservations = this.props.user.users.reservations;
                userReservations.push(this.props.reservations.reservation._id);
                this.props.dispatch(updateUser({
                    _id: this.props.user.users.id,
                    reservations: userReservations
                }))
                
                payData.reservationId = this.props.reservations.reservation._id
                axios.post('/api/pay', payData).then((res, err) => {
                    if (err) console.log(err)
                    console.log(res.data)
                })
                this.setState({ loading: false })
            }
        } else if (this.props.reservations.reservation) {
            let userReservations = this.props.user.users.reservations;
            userReservations.push(this.props.reservations.reservation._id);
            this.props.dispatch(updateUser({
                _id: this.props.user.users.id,
                reservations: userReservations
            }))

            payData.reservationId = this.props.reservations.reservation._id
            axios.post('/api/pay', payData).then((res, err) => {
                if (err) console.log(err)
                console.log(res.data)
            })

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
            // console.log(openHours)
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
        // console.log(open)
        // const past = moment().isAfter
        // console.log(past)
        if (list) {

            list.forEach((item) => {
                if (item.from === hour && item.roomId === room && item.day === day)
                    free = false;
                if (item.hours > 1) {
                    if (parseInt(item.from.substring(0, 2), 10) + 1 === moment.duration(hour).hours() && item.roomId === room && item.day === day) {
                        free = false;
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
                    <Cell xs={this.state.colSize} sm={this.state.colSize} md={this.state.colSize} lg={this.state.colSize} key={roomiteration} style={{ cursor: "not-allowed", backgroundColor: "rgba(197,239,247,0.3)" }} >Ocupado</Cell>
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

    handleClose = () => {
        this.setState({
            modalVisible: false,
        });
    };

    handleOk = () => {
        const room = this.state.resRoom;
        const hour = this.state.resHour;
        const hours = this.state.resHours;
        const price = this.state.resPrice;
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
                paid: false,
                salaName: this.props.salas.currentSala.name,
                cancelled: false,
            }

            const user = this.props.user.users
            const payData = {
                item: {
                    title: "Reserva sala ensayo",
                    quantity: hours,
                    currency_id: 'ARS',
                    unit_price: price * hours
                },
                payer: {
                    // email: user.email,
                    email: 'test_user_72945948@testuser.com',
                    name: user.name,
                    surname: user.lastname,
                    date_created: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                },
                sala: {
                    id: this.props.salas.currentSala._id
                }
            }

            this.setState({payData})
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
        console.log(this.props)
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
                    <div style={titleStyle} >Reserva de sala {`${this.props.salas.currentSala.name}`}</div>
                    <Row>
                        <Col xs={24} sm={24} md={8} lg={8} >
                            <CalendarStyleWrapper className="isomorphicCalendarWrapper">
                                <MiniCalendar
                                    setCalendarDate={this.setCalendarDate}
                                    validDays={days}
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


export default connect(mapStateToProps)(CreateReserva);