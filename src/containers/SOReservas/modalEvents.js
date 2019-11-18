import React, { Component } from 'react';
import moment from 'moment';
import Input from '../../components/uielements/input';
import { DateRangepicker } from '../../components/uielements/datePicker';
import Modal from '../../components/feedback/modal';
import { CalendarModalBody } from './calendar.style';
import Button from '../../components/uielements/button';
import Popconfirm from '../../components/feedback/popconfirm';
import { notification } from '../../components/';
import QRCode from 'qrcode.react';

const RangePicker = DateRangepicker;

const localeDatePicker = {
  lang: {
    placeholder: 'Seleccionar fecha',
    rangePlaceholder: ['Inicio', 'Fin'],
    today: 'How',
    now: 'Ahora',
    backToToday: 'Volver a hoy',
    ok: 'Ok',
    clear: 'Limpiar',
    month: 'Mes',
    year: 'Año',
    timeSelect: 'Seleccionar hora',
    dateSelect: 'Seleccionar día',
    monthSelect: 'Seleccionar mes',
    yearSelect: 'Seleccionar año',
    decadeSelect: 'Seleccionar década',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Mes anterior',
    nextMonth: 'Mes próximo',
    previousYear: 'Año anterior',
    nextYear: 'Año próximo',
    previousDecade: 'Década anterior',
    nextDecade: 'Década próxima',
    previousCentury: 'Siglo pasado',
    nextCentury: 'Siglo próximo',
  },
  timePickerLocale: {
    placeholder: 'Seleccionar hora',
  },
};

class CancelButton extends Component {
  render() {
    const { handleDelete } = this.props;

    return (
      <Popconfirm
        title="¿Seguro que quiere cancelar la reserva"
        okText="Cancelar"
        cancelText="No"
        onConfirm={() => {
          notification('error', 'Cancelada', '');
          handleDelete();
        }}
      >
        <Button type="button" className="isoDeleteBtn" >Cancelar reserva</Button>
      </Popconfirm>
    );
  }
}

export default class ModalEvent extends Component {
  handleOk = () => {
    this.props.setModalData('ok', this.props.selectedData);
  };
  handleCancel = () => {
    this.props.setModalData('cancel');
  };

  handleDelete = () => {
    this.props.setModalData('delete', this.props.selectedData);
  };
  render() {
    
    const { modalVisible, selectedData, setModalData } = this.props;
    const visible = modalVisible ? true : false;
    if (!visible) {
      return <div />;
    }
    const URL = `http://localhost:3000/reservas/${selectedData.id}`
    const title = selectedData && selectedData.title ? selectedData.title : '';
    const desc = selectedData && selectedData.desc ? selectedData.desc : '';
    const start =
      selectedData && selectedData.start ? moment(selectedData.start) : '';
    const end =
      selectedData && selectedData.end ? moment(selectedData.end) : '';
    const onChangeTitle = event => {
      selectedData.title = event.target.value;
      setModalData('updateValue', selectedData);
    };
    const onChangeDesc = event => {
      selectedData.desc = event.target.value;
      setModalData('updateValue', selectedData);
    };
    const onChangeFromTimePicker = value => {
      try {
        selectedData.start = value[0].toDate();
        selectedData.end = value[1].toDate();
      } catch (e) { }
      setModalData('updateValue', selectedData);
    };
    return (
      <div>
        <Modal
          title="Detalles de Reserva"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Ok"
          cancelText="Cancelar"
        >
          <CalendarModalBody>
            <div className="isoCalendarInputWrapper">
              <Input
                value={title}
                readOnly={true}
                placeholder="Título"
                onChange={onChangeTitle}
              />
            </div>

            <div className="isoCalendarInputWrapper">
              <Input
                value={desc}
                readOnly={true}
                placeholder="Descripción"
                onChange={onChangeDesc}
              />
            </div>

            <div className="isoCalendarDatePicker">
              <RangePicker
                locale={localeDatePicker}
                ranges={{
                  Today: [moment(), moment()],
                  'Este mes': [moment(), moment().endOf('month')],
                }}
                value={[start, end]}
                showTime
                format="DD/MM/YYYY HH:mm:ss"
                onChange={onChangeFromTimePicker}
                disabled={true}
              />

            </div>
            <div className="isoCalendarInputWrapper" style={{ textAlign: "center" }}>
              {/* <img src={process.env.PUBLIC_URL + "/images/qr.png"} alt="img" /> */}
              <QRCode value={URL}  />
            </div>
            <div className="isoCalendarInputWrapper" style={{ textAlign: "center" }}>
              <CancelButton handleDelete={this.handleDelete}/>
            </div>

          </CalendarModalBody>
        </Modal>
      </div>
    );
  }
}
