import React, { Component } from 'react'
import { connect } from 'react-redux'
import MiniCalendar from '../../components/minicalendar'
import {
    CalendarStyleWrapper,
    // CalendarModalBody 
} from './minicalendar.style'
import { Col, Row } from 'antd'
import moment from 'moment'
import 'moment/locale/es';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import Box from '../../components/utility/box';
import { CellWrapper, CellHeaderWrapper, CellColumnWrapper } from './cell.style'
import { getReservationsBySala, saveReservation } from '../../redux/soreservations/actions'
import { updateUser } from '../../redux/sousers/actions'

import Spins from '../../components/uielements/spin';

const Cell = CellWrapper(Col);
const CellHeader = CellHeaderWrapper(Col);
const CellColumn = CellColumnWrapper(Col)


class CreateReserva extends Component {

    state = {
        calendarDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0),
        rDay: null,
        loading: false,
    }

    constructor(props) {
        super(props)
        this.setCalendarDate = this.setCalendarDate.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps.reservations.reservation) {
            if (prevProps.reservations.reservation._id !== this.props.reservations.reservation._id) {
                let userReservations = this.props.user.users.reservations;
                userReservations.push(this.props.reservations.reservation._id);
                this.props.dispatch(updateUser({
                    _id: this.props.user.users.id,
                    reservations: userReservations
                }))
            }
        } else if (this.props.reservations.reservation) {
            let userReservations = this.props.user.users.reservations;
            userReservations.push(this.props.reservations.reservation._id);
            this.props.dispatch(updateUser({
                _id: this.props.user.users.id,
                reservations: userReservations
            }))
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

    showValidHours = (sala, numberDay) => {
        let v = true;
        let nextHour = sala.open[numberDay].from;
        let openHours = []
        while (v) {
            if (moment(nextHour, 'HH:mm') < moment(sala.open[numberDay].to, 'HH:mm')) {
                openHours.push(nextHour)
                nextHour = moment(nextHour, 'HH:mm').add(1, 'hour').format('HH:mm')
            } else {
                v = false;
            }
        }
        return (
            openHours.map((hour, houriteration) => (
                <Row key={houriteration}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <CellColumn xs={3} sm={3} md={3} lg={3}>{hour}</CellColumn>
                        {sala.rooms.map((room, roomiteration) =>
                            // {return (<Cell xs={this.state.colSize} sm={this.state.colSize} md={this.state.colSize} lg={this.state.colSize} key={roomiteration} onClick={(event) => { this.showReserveModal(room._id, hour) }} >{this.checkAvailability(room._id, hour)}</Cell>)}
                            this.checkAvailability(room._id, hour, roomiteration)
                        )}
                    </Col>
                </Row>
            ))
        )
    }

    checkAvailability = (room, hour, roomiteration) => {
        const list = this.props.reservations.list;
        const day = moment(this.state.calendarDate.getTime()).format("YYYYMMDD");
        let free = true;

        if (list) {
            // if(this.state.loading)
            // this.setState({loading:false})
            list.forEach((item) => {
                if (item.from === hour && item.roomId === room && item.day === day)
                    free = false;
            })
        }
        return (
            free ?
                <Cell xs={this.state.colSize} sm={this.state.colSize} md={this.state.colSize} lg={this.state.colSize} key={roomiteration} onClick={() => { this.showReserveModal(room, hour) }}>Libre</Cell>
                :
                <Cell xs={this.state.colSize} sm={this.state.colSize} md={this.state.colSize} lg={this.state.colSize} key={roomiteration} style={{ cursor: "not-allowed", backgroundColor: "rgba(197,239,247,0.3)" }} >Ocupado</Cell>
        )
        // return (
        //     free ?
        //         "libre":
        //         "ocupado"
        //     )

    }

    showReserveModal = (room, hour) => {
        const validHour = parseInt(hour.substring(0, 2), 10);
        let reservationDate = moment(this.state.calendarDate.getTime()).add(validHour, 'hours')
        // console.log(reservationDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ"))
        const resData = {
            salaId: this.props.salas.currentSala._id,
            day: reservationDate.format("YYYYMMDD"),
            ownerId: this.props.salas.currentSala.ownerId,
            roomId: room,
            from: hour,
            hours: "1",
            timestamp: reservationDate.format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
            userId: this.props.user.users.id,
            paid: false,
            salaName: this.props.salas.currentSala.name,
        }
        this.props.dispatch(saveReservation(resData));
        this.props.dispatch(getReservationsBySala(this.props.salas.currentSala._id))


    }

    reserveChart = () => {
        const sala = this.props.salas.currentSala;
        const numberDay = moment(this.state.calendarDate).day()
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

                {this.showValidHours(sala, numberDay)}

            </div>
        )
    }


    render() {
        // console.log(this.state.calendarDate)
        // console.log(rDay)
        console.log(this.props)
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