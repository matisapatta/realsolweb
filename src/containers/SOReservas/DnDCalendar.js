import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; 

BigCalendar.momentLocalizer(moment);

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  );
}

const messages = { 
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
};

class FullCalender extends Component {

  render() {
    const calendarOptions = {
      messages : {messages},
      popup: true,
      selectable: false,
      step: 60,
      timeslots: 2,
      className: 'isomorphicCalendar',
      agenda: {
        event: EventAgenda
      }
    };
    return <BigCalendar {...calendarOptions} {...this.props} />;
  }
}
export default FullCalender;
