import React, { Component } from 'react'
// import Calendar from 'react-calendar'
import DateTime from 'react-datetime'

const validDate = current => (current.day() !== 0 && current.day() !== 6)

class MiniCalendar extends Component  {


    render(){
        return (
            <DateTime
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                input={false}
                utc={false}
                onChange={event => this.props.setCalendarDate(event._d)}
                isValidDate={validDate}
            />
        )
    }

}
export default MiniCalendar