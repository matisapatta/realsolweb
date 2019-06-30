import React, { Component } from 'react';
import Button from '../../components/uielements/button';
import { RadioButton, RadioGroup } from '../../components/uielements/radio';
import {
  ColorChoser,
  // notification,
} from '../../components';
import { ReviewListWrapper } from './reviews.style';
import moment from 'moment'
import Popconfirm from '../../components/feedback/popconfirm';
import { notification } from '../../components/';
import { ModalDataWrapper } from './modal.style';
import Modal from '../../components/feedback/modal';
import Rate from '../../components/uielements/rate';
import { Textarea } from '../../components/uielements/input';


function filterTodos(reservs, search) {
  const selectedReserv =
    search === 'All'
      ? reservs
      : reservs.filter(reserv => reserv.reviewed === (search === 'Completed'));
  let completed = 0;
  selectedReserv.forEach(reserv => {
    if (reserv.reviewed) {
      completed += 1;
    }
  });
  return { selectedReserv, completed };
}
export default class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.singleReserv = this.singleReserv.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      search: 'Uncompleted',
      modalVisible: false,
      text:'',
      rating:2.5
    };
  }
  singleReserv(reservation) {
    const { deleteTodo } = this.props;
    const onDelete = () => deleteTodo(reservation._id);
    const updateTodo = (key, value) => {
      reservation[key] = value;
      // this.props.edittodo(reservation);
    };
    return (
      <div className="isoTodoList" key={reservation._id}>
        <ColorChoser
          style={{ cursor: 'auto' }}
          selectedColor={reservation.reviewed ? "rgba(0, 181, 204, 1)" : "rgba(207, 0, 15, 1)"}
        />
        <div className="isoTodoContentWrapper">
          <span className="isoTodoDate">{moment(reservation.timestamp).format('dddd D [de] MMMM [de] YYYY')}</span>
          <div>
            {"Reserva en " + reservation.salaName}
          </div>
        </div>
        {
          !reservation.reviewed ?

            <Button
              className="isoTodoDelete"
              icon="form"
              type="button"
              onClick={() => { this.setState({ modalVisible: true, reservation: reservation }) }}
            />
            : <div></div>
        }{
          !reservation.reviewed ?

            <CancelButton handleDelete={onDelete} />

            :
            <Button
            className="isoTodoDelete"
            icon="eye"
            type="button"
            onClick={() => { alert("ver valoracion") }}
          />
        }

      </div>
    );
  }
  onChange(event) {
    this.setState({ search: event.target.value });
  }

  handleClose = () => {
    this.setState({
      modalVisible: false,
    });
  };

  handleOk = () => {
    const review = {
      salaId: this.state.reservation.salaId,
      reservationId: this.state.reservation._id,
      score: this.state.rating,
      reviewText: this.state.text,
      location:this.state.reservation.location,
    }
    this.props.saveReview(review)
    this.setState({
      modalVisible: false,
      score: 2.5,
      text: '',
    });
  };

  showReviewModal = () => (
    this.state.reservation ?
      <Modal
        visible={this.state.modalVisible}
        title="Escribir valoración"
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
              <p className="isoInfoLabel" style={{ fontSize: "24px", paddingTop: "5px" }} >Reserva en {this.state.reservation.salaName}</p>
            </div>
            <div className="isoContactCardInfos">
              <p className="isoInfoLabel">Fecha</p>
              <span>{moment(this.state.reservation.timestamp).format('dddd D [de] MMMM [de] YYYY')}</span>
            </div>
            <div className="isoContactCardInfos">
              <p className="isoInfoLabel">Puntaje</p>
              <span>
                <Rate allowHalf value={this.state.rating} defaultValue={2.5} onChange={(event)=>{this.setState({rating:event})}} />
              </span>
            </div>
            <div className="isoContactCardInfos">
              <p className="isoInfoLabel">Opinión</p>
              {/* <span> */}
                <Textarea rows={4} value={this.state.text} onChange={(event)=>{this.setState({text:event.target.value})}}/>
              {/* </span> */}
            </div>
          </div>

        </ModalDataWrapper>
      </Modal>
      : <div></div>
  )


  render() {
    console.log(this.state)
    const { search } = this.state;
    // console.log(this.props)
    const { selectedReserv, completed } = filterTodos(this.props.reservations, search);

    return (
      <ReviewListWrapper className="isoTodoContent">
        <div className="isoTodoStatusTab">
          <RadioGroup
            value={this.state.search}
            onChange={this.onChange}
            className="isoTodoStatus"
          >
            <RadioButton value="Uncompleted">Pendientes</RadioButton>
            <RadioButton value="Completed">Valorados</RadioButton>
            <RadioButton value="All">Todos</RadioButton>
          </RadioGroup>
        </div>

        <div className="isoTodoListWrapper">
          {selectedReserv.length > 0 ? (
            selectedReserv.map(note => this.singleReserv(note))
          ) : (
              <h3 className="isoNoTodoFound">No se encontraron datos</h3>
            )}
        </div>
        {this.showReviewModal()}
      </ReviewListWrapper>
    );
  }
}

class CancelButton extends Component {
  render() {
    const { handleDelete } = this.props;

    return (
      <Popconfirm
        title="¿Seguro que quiere marcar la reserva como valorada? Esta acción no puede deshacerse"
        okText="Cancelar"
        cancelText="No"
        onConfirm={() => {
          notification('success', 'Reserva marcada como valorada', '');
          handleDelete();
        }}
      >
        <Button type="button" className="isoTodoDelete" icon="close" />
      </Popconfirm>
    );
  }
}
