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

    render() {
        moment.locale('es', {
            week: {
                dow: 0,
                // doy : Int
            }
        })
        return (
            <div>
                <Row>
                    <Col xs={24} sm={24} md={8} lg={8} >
                        <CalendarStyleWrapper className="isomorphicCalendarWrapper">
                            <MiniCalendar setCalendarDate={this.setCalendarDate} />
                        </CalendarStyleWrapper>
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16}>
                        Tu vieja
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