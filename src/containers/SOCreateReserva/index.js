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


class CreateReserva extends Component {

    state = {
        calendarDate: new Date(),
    }

    constructor(props) {
        super(props)
        this.setCalendarDate = this.setCalendarDate.bind(this);
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
                        <Col xs={6} sm={6} md={6} lg={6}>{hour}</Col>
                        {sala.rooms.map((room, roomiteration) => {
                            return (<Col xs={6} sm={6} md={6} lg={6} key={roomiteration} onClick={()=>{alert(room._id + " " + hour)}} >R</Col>)
                        })}
                    </Col>
                </Row>
            ))
        )
    }

    reserveChart = () => {
        const sala = this.props.salas.currentSala;
        const numberDay = moment(this.state.calendarDate).day()
        // console.log(sala)
        // console.log(moment(sala.open[numberDay].from, 'HH:mm') < moment(sala.open[numberDay].to, 'HH:mm'))
        // console.log(moment(sala.open[numberDay].from, 'HH:mm').add(1, 'hour').format('HH:mm'))
        return (
            <div>
                <Row style={{ height: "21px" }}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                        <Col xs={6} sm={6} md={6} lg={6}>
                            Sala
                        </Col>
                        {sala.rooms.map((item, i) => {
                            return (<Col xs={6} sm={6} md={6} lg={6} key={i}>Sala {i + 1}</Col>)
                        })}
                    </Col>
                </Row>

                {this.showValidHours(sala, numberDay)}

            </div>
        )
    }


    render() {
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

            </div>
        )

    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        salas: state.Salas,
        user: state.User
    }
}


export default connect(mapStateToProps)(CreateReserva);