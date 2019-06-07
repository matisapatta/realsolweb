import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import FullCalendar from '@fullcalendar/react';

BigCalendar.momentLocalizer(moment);
const Calendar = withDragAndDrop(BigCalendar);

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  );
}

class FullCalender extends Component {
  render() {
    const calendarOptions = {
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4 ], // Monday - Thursday
      
        startTime: '10:00', // a start time (10am in this example)
        endTime: '18:00', // an end time (6pm in this example)
      },
      popup: true,
      selectable: true,
      step: 60,
      timeslots: 3,
      className: 'isomorphicCalendar',
      agenda: {
        event: EventAgenda
      }
    };
    return <Calendar {...calendarOptions} {...this.props} />;
  }
}
const CalendarExample = DragDropContext(HTML5Backend)(FullCalender);
export default CalendarExample;
