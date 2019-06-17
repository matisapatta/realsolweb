import React, { Component } from 'react'
// import Calendar from 'react-calendar'
import DateTime from 'react-datetime'
import moment from 'moment'


class MiniCalendar extends Component {

    // validDate = current => (current.day() === 0 )
    validDate = current => {
        const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0)

        const days = this.props.validDays;
        if (days.length === 1) {
            return ((current.day() === parseInt(days[0], 10)) && current.isSameOrAfter(moment(today)) )
        } else if (days.length === 2) {
            return ((current.day() === parseInt(days[0], 10) || current.day() === parseInt(days[1], 10)) && current.isSameOrAfter(moment(today)) )
        } else if (days.length === 3) {
            return ((current.day() === parseInt(days[0], 10) || current.day() === parseInt(days[1], 10) || current.day() === parseInt(days[2], 10)) && current.isSameOrAfter(moment(today)) )
        } else if (days.length === 4) {
            return ((current.day() === parseInt(days[0], 10) || current.day() === parseInt(days[1], 10) || current.day() === parseInt(days[2], 10) || current.day() === parseInt(days[3], 10)) && current.isSameOrAfter(moment(today)) )
        } else if (days.length === 5) {
            return ((current.day() === parseInt(days[0], 10) || current.day() === parseInt(days[1], 10) || current.day() === parseInt(days[2], 10) || current.day() === parseInt(days[3], 10) || current.day() === parseInt(days[4], 10)) && current.isSameOrAfter(moment(today)) )
        } else if (days.length === 6) {
            return ((current.day() === parseInt(days[0], 10) || current.day() === parseInt(days[1], 10) || current.day() === parseInt(days[2], 10) || current.day() === parseInt(days[3], 10) || current.day() === parseInt(days[4], 10) || current.day() === parseInt(days[5], 10)) && current.isSameOrAfter(moment(today)) )
        } else if (days.length === 7) {
            return ((current.day() === parseInt(days[0], 10) || current.day() === parseInt(days[1], 10) || current.day() === parseInt(days[2], 10) || current.day() === parseInt(days[3], 10) || current.day() === parseInt(days[4], 10) || current.day() === parseInt(days[5], 10) || current.day() === parseInt(days[6], 10)) && current.isSameOrAfter(moment(today))  )
        }
    }


    render() {
        return (
            <DateTime
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                input={false}
                utc={false}
                onChange={event => this.props.setCalendarDate(event._d)}
                isValidDate={this.validDate}
            />
        )
    }

}
export default MiniCalendar