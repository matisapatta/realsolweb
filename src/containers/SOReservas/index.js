import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import notification from '../../components/notification';
import ModalEvents from './modalEvents';
import { CalendarStyleWrapper } from './calendar.style';
import DnDCalendar from './DnDCalendar';
import { getReservationsByUser, cancelReservation } from '../../redux/soreservations/actions'
import moment from 'moment'


const getIndex = (events, selectedEvent) =>
  events.findIndex(event => event.id === selectedEvent.id);

class Reservas extends Component {

  state = {
    // view: this.props.view,
    view: 'month',
    modalVisible: false,
    selectedData: undefined,
    events: []
  };
  constructor(props) {
    super(props)
    props.dispatch(getReservationsByUser(props.user.users.id))
  }


  componentDidUpdate(prevProps, prevState) {


    let events = [];
    if (prevProps.reservations.userlist) {
      if (this.props.reservations.userlist !== prevProps.reservations.userlist) {
        this.props.reservations.userlist.map((item, i) => {
          const end = moment(new Date(item.timestamp).getTime()).add(item.hours, 'hours');
          events.push({
            allDay: false,
            // start: item.timestamp,
            // end: end,
            start: new Date(item.timestamp),
            end: new Date(end),
            title: `Reserva en Sala ${item.salaName}`,
            desc: `Código de Reserva: ${item._id}`,
            id: item._id,
          })
        })
        this.setState({
          events
        })
      }
    } else if (this.props.reservations.userlist) {
      this.props.reservations.userlist.map((item, i) => {
        const end = moment(new Date(item.timestamp).getTime()).add(item.hours, 'hours');
        events.push({
          allDay: false,
          start: new Date(item.timestamp), // Cosa e mandinga
          end: new Date(end),
          title: `Reserva en Sala ${item.salaName}`,
          desc: `Código de Reserva: ${item._id}`,
          id: item._id,
        })
      })
      this.setState({
        events
      })
    }
  }




  onSelectEvent = selectedData => {
    this.setState({ modalVisible: 'update', selectedData });
  };
  onSelectSlot = selectedData => {
    this.setState({ modalVisible: 'new', selectedData });
  };
  onView = view => {
    this.setState({ view: view })
  };
  onEventDrop = newOption => {
    const { event, start, end } = newOption;
    const events = clone(this.state.events);
    const allDay = new Date(end).getTime() !== new Date(start).getTime();
    const updatedEvent = { ...event, start, end, allDay };
    const index = getIndex(events, updatedEvent);
    events[index] = clone(updatedEvent);
    // this.props.changeEvents(events);
    this.setState({ events })
    notification(
      'success',
      'Move event successfully',
      `${event.title} was dropped onto ${event.start}`
    );
  };
  setModalData = (type, selectedData) => {

    const events = clone(this.state.events);
    const { modalVisible } = this.state;
    if (type === 'cancel') {
      this.setState({
        modalVisible: false,
        selectedData: undefined
      });
    } else if (type === 'delete') {
      const index = getIndex(events, selectedData);
      if (index > -1) {
        events.splice(index, 1);
      }

      // Cancelar la reserva
      // console.log(this.props.user.users.id)
      let sendData = { ...selectedData };
      sendData.userid = this.props.user.users.id;
      // console.log(sendData)
      this.props.dispatch(cancelReservation(sendData))

      this.setState({
        modalVisible: false,
        selectedData: undefined,
        events
      });

    } else if (type === 'updateValue') {
      this.setState({ selectedData });
    } else {
      if (modalVisible === 'new') {
        events.push(selectedData);
      } else {
        const index = getIndex(events, selectedData);
        if (index > -1) {
          events[index] = selectedData;
        }
      }

      this.setState({
        modalVisible: false,
        selectedData: undefined,
        events
      });
    }

  };

  render() {
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
    const { events, view, modalVisible, selectedData } = this.state;
    const calendarOptions = {
      messages,
      events,
      view,
      selectedData,
      onSelectEvent: this.onSelectEvent,
      onSelectSlot: this.onSelectSlot,
      onView: this.onView,
      onEventDrop: this.onEventDrop
    };
    return (
      <CalendarStyleWrapper className="isomorphicCalendarWrapper">
        <ModalEvents
          modalVisible={modalVisible}
          selectedData={selectedData}
          setModalData={this.setModalData}
        />
        <DnDCalendar
          {...calendarOptions}
        />
      </CalendarStyleWrapper>
    );
  }
}

function mapStateToProps(state) {
  const { events, view } = state.Calendar.toJS();

  return {
    events,
    view,
    user: state.User,
    salas: state.Sala,
    reservations: state.Reservations,
  };
}
export default connect(mapStateToProps)(
  Reservas
);
