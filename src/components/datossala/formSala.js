import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import Input, { Textarea } from '../uielements/input';
import { DatosCardWrapper } from './formSala.style';
import { updateUser } from '../../redux/sousers/actions'
import { locations } from '../../config';
import Select, { SelectOption } from '../../components/uielements/select';
import Modal from '../../components/feedback/modal';
import ListItem from '../roomslist/roomsList';
import GalleryUploader from '../../components/galleryUploader'

import axios from 'axios'

// import './upload.css';

// function beforeUpload(file) {
//   const isJPG = file.type === 'image/jpeg';
//   if (!isJPG) {
//     notification('error', 'You can only upload JPG file!', '');
//     return false;
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     notification('error', 'Image must smaller than 2MB!', '');
//     return false;
//   }
//   notification('success', 'Image uploaded successfully!', '');
//   return true;
// }

let save = false;
let locationOptions = [];

class FormSala extends Component {

  state = {
    createdSala: {
      name: '',
      location: '',
      mainimage: '',
      images: [],
      description: '',
      rooms: [],
      ownerId: '',
      address: '',
      phoneNumber: '',
      viewMode: false,
    },
    modalVisible: false,
    tempRoom: {
      capacity: '',
      guitar: '',
      bass: '',
      drums: ''
    }

  }

  constructor(props) {
    super(props)
    this.deleteRoom = this.deleteRoom.bind(this);
    this.upload = this.upload.bind(this);
    this.dummyRequest = this.dummyRequest.bind(this);
    locationOptions.length === 0 ?
      locations.forEach((element) => {
        locationOptions.push(<SelectOption key={element}>{element}</SelectOption>);
      })
      : null
  }



  handleInput = (type, event) => {
    const newSala = { ...this.state.createdSala }
    if (type === 'location') {
      newSala[type] = event;
    } else {
      newSala[type] = event.target.value;
    }
    this.setState({
      createdSala: newSala
    })
  };

  handleModal = (type, event) => {
    const newRoom = { ...this.state.tempRoom }
    newRoom[type] = event.target.value;
    this.setState({
      tempRoom: newRoom
    })
  };

  clearTempRoom = () => {
    let clearedRoom = {
      capacity: '',
      guitar: '',
      bass: '',
      drums: ''
    }
    this.setState({ tempRoom: clearedRoom })
  }

  handleOk = () => {
    const newSala = { ...this.state.createdSala }
    newSala.rooms.push(this.state.tempRoom);
    this.setState({ modalVisible: false, createdSala: newSala });
    this.clearTempRoom();
  };

  handleClose = () => {
    this.setState({
      modalVisible: false,
    });
    this.clearTempRoom();
  };


  saveUser = (user) => {
    this.props.dispatch(updateUser(user));
  }

  toggleAndSave = (viewMode) => {
    if (!viewMode && !save) {
      save = true;
    }
    if (viewMode && save) {
      save = false;
      const data = {
        _id: this.props.user.users.id,
        name: this.state.firstName,
        lastname: this.state.lastName,
        phone: this.state.phone
      }
      this.saveUser(data);
    }
  }

  showModal = () => {
    return (
      <Modal
        visible={this.state.modalVisible}
        title="Agregar sala"
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
            Guardar
          </Button>
        ]}
      >
        <div style={{ height: '400px', width: '100%' }}>
          <DatosCardWrapper className="isoContactCard">
            <div className="isoContactInfoWrapper">
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Capacidad</p>
                <Input
                  placeholder="Capacidad de la sala"
                  type="number"
                  value={this.state.tempRoom.capacity}
                  onChange={event => this.handleModal('capacity', event)}
                />
              </div>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Equipo de guitarra</p>
                <Input
                  placeholder="Ej. Fender, Marshall"
                  value={this.state.tempRoom.guitar}
                  onChange={event => this.handleModal('guitar', event)}
                />
              </div>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Equipo de bajo</p>
                <Input
                  placeholder="Ej. Wenstone, GK"
                  value={this.state.tempRoom.bass}
                  onChange={event => this.handleModal('bass', event)}
                />
              </div>
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Batería</p>
                <Input
                  placeholder="Ej. Sonor, Tama"
                  value={this.state.tempRoom.drums}
                  onChange={event => this.handleModal('drums', event)}
                />
              </div>
            </div>
          </DatosCardWrapper>
        </div>
      </Modal>
    )
  }

  deleteRoom = (key) => {
    const newSala = { ...this.state.createdSala }
    newSala.rooms.splice(key, 1);
    this.setState({ createdSala: newSala });
  }

  showRooms = () => {
    const rooms = this.state.createdSala.rooms;
    return (
      rooms.length > 0 ?
        rooms.map((item, i) => (
          <div className="isoContactCardInfosList" key={i}>
            <ListItem
              title={`Sala ${i + 1}`}
              clickHandler={this.deleteRoom}
              index={i}
            />

          </div>
        ))
        : null
    )
  }

  upload = (file) => {
    const send = file;
    console.log(send)
    axios.post('/api/upload', send, 
    // {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }}
    )
  }

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };


  render() {
    const viewMode = this.props.viewMode
    this.toggleAndSave(viewMode)
    return (
      <DatosCardWrapper className="isoContactCard">
        {/* <div className="isoContactCardHead">
          <div className="isoPersonImage">
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              // beforeUpload={beforeUpload}
              action=""
              disabled={viewMode}
            >
              {user.avatar ? (
                <img src={this.state.avatar} alt="" className="avatar" />
              ) : (
                  ''
                )}
              <Icon type="plus" className="avatar-uploader-trigger" />
            </Upload>
          </div>
          <h1 className="isoPersonName">{`${this.props.user.users.name} ${this.props.user.users.lastname}`}</h1>
        </div> */}
        <div className="isoContactInfoWrapper">
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Nombre</p>
            <Input
              placeholder="Nombre de la sala"
              value={this.state.createdSala.name}
              onChange={event => this.handleInput('name', event)}
            />
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Ubicación</p>
            <Select
              style={{ "width": '100%', "height": "42px", "marginTop": "15px" }}
              placeholder="Localidad"
              // value={this.state.formdata.location}
              onChange={(event) => this.handleInput('location', event)}
            >
              {locationOptions}
            </Select>
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Descripción</p>
            <Textarea
              placeholder="Descripcion"
              value={this.state.createdSala.description}
              type="textarea"
              rows={5}
              onChange={event => this.handleInput('description', event)}
            />
          </div>

          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Teléfono</p>
            <Input
              type="number"
              placeholder="Teléfono"
              value={this.state.createdSala.phone}
              onChange={event => this.handleInput('phone', event)}
            />
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Dirección</p>
            <Input
              placeholder="Dirección"
              value={this.state.createdSala.address}
              onChange={event => this.handleInput('address', event)}
            />
          </div>
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Salas Disponibles</p>
            <Button onClick={() => { this.setState({ modalVisible: true }) }}>Agregar</Button>
          </div>

          {this.showRooms()}

          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Logo</p>
          </div>
          <GalleryUploader
            maxFiles={1}
            action={this.upload}
            customRequest={this.dummyRequest}
          />
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Imágenes</p>
          </div>
          {/* <div className="isoContactCardInfos"> */}
          <GalleryUploader
            maxFiles={5}
            action={this.upload}
            customRequest={this.dummyRequest}
          />
          {/* </div> */}

        </div>
        {this.showModal()}
      </DatosCardWrapper>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.User,
    sala: state.Sala
  }
}
export default connect(mapStateToProps)(FormSala);
