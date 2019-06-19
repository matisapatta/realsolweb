import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
// import { Button } from 'antd';
import Button from '../../components/uielements/button';
import Input, { Textarea } from '../uielements/input';
import { DatosCardWrapper, ButtonWrapper } from './formSala.style';
import { updateUser } from '../../redux/sousers/actions'
import { locations, days, hours, WRAPPEDURL } from '../../config';
import Select, { SelectOption } from '../../components/uielements/select';
import Modal from '../../components/feedback/modal';
import ListItem from '../roomslist/roomsList';
import GalleryUploader from '../../components/galleryUploader'
import { updateSala } from '../../redux/sosalas/actions';
import Spins from '../../components/uielements/spin';
import notification from '../../components/notification';


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
let daysOptions = [];
let hoursOptions = [];

class FormEditSala extends Component {

    state = {
        editedSala: {
            _id: this.props.salas.currentSala._id,
            name: this.props.salas.currentSala.name,
            location: this.props.salas.currentSala.location,
            mainimage: this.props.salas.currentSala.mainimage,
            images: this.props.salas.currentSala.images,
            description: this.props.salas.currentSala.description,
            rooms: this.props.salas.currentSala.rooms,
            days: this.props.salas.currentSala.days,
            open: this.props.salas.currentSala.open,
            ownerId: this.props.user.users.id,
            address: this.props.salas.currentSala.address,
            phoneNumber: this.props.salas.currentSala.phoneNumber,
            pricefrom: this.props.salas.currentSala.pricefrom,
            priceto: this.props.salas.currentSala.priceto,
            // viewMode: false,
        },
        modalVisible: false,
        editModalVisible: false,
        tempRoom: {
            capacity: '',
            guitar: '',
            bass: '',
            drums: '',
            price: '',
        },
        loading: this.props.loading,
        edited: false

    }

    constructor(props) {
        super(props)
        this.deleteRoom = this.deleteRoom.bind(this);
        this.editRoom = this.editRoom.bind(this);
        this.uploadPic = this.uploadPic.bind(this);
        this.uploadProfile = this.uploadProfile.bind(this);
        this.dummyRequest = this.dummyRequest.bind(this);
        locationOptions.length === 0 ?
            locations.forEach((element) => {
                locationOptions.push(<SelectOption key={element}>{element}</SelectOption>);
            })
            : this.dummy()
        daysOptions.length === 0 ?
            days.forEach((element, i) => {
                daysOptions.push(<SelectOption key={i}>{element}</SelectOption>);
            })
            : this.dummy()
        hoursOptions.length === 0 ?
            hours.forEach((element, i) => {
                hoursOptions.push(<SelectOption key={element}>{element}</SelectOption>);
            })
            : this.dummy()
        this.dummyRequest();
    }

    componentDidUpdate(prevProps) {
        if (this.props.salas.currentSala !== prevProps.salas.currentSala) {
            this.setState({
                editedSala: {
                    _id: this.props.salas.currentSala._id,
                    name: this.props.salas.currentSala.name,
                    location: this.props.salas.currentSala.location,
                    mainimage: this.props.salas.currentSala.mainimage,
                    images: this.props.salas.currentSala.images,
                    description: this.props.salas.currentSala.description,
                    rooms: this.props.salas.currentSala.rooms,
                    days: this.props.salas.currentSala.days,
                    open: this.props.salas.currentSala.open,
                    ownerId: this.props.user.users.id,
                    address: this.props.salas.currentSala.address,
                    phoneNumber: this.props.salas.currentSala.phoneNumber,
                    pricefrom: this.props.salas.currentSala.pricefrom,
                    priceto: this.props.salas.currentSala.priceto,
                    // viewMode: false,
                },
                loading: false,
                edited: true,
            })
            if (this.state.edited)
                notification("success", "La sala se modificó correctamente")
            // this.props.history.push(`${WRAPPEDURL}/gestionsalas`)
        }
        // if (this.props.salas.currentSala !== prevProps.salas.editedSala) {
        //     console.log(this.props.salas)
        //     // this.setState({ editedSala: this.props.salas.currentSala, loading: false })
        // }

        // if (prevProps !== this.props) {
        //     this.setState({
        //       loading: this.props.salas.loading,
        //     })
        //     if (this.props.salas.currentSala) {
        //       notification("success", "La sala se creó correctamente")
        //       // console.log(this.props.salas.currentSala)
        //       this.props.history.push(`${WRAPPEDURL}/gestionsalas`)
        //     }
        //     else
        //       notification("error", "Hubo un problema al crear la sala")
        //   }
    }

    dummy = () => {

    }

    dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 200);
    };


    handleInput = (type, event, i) => {
        const newSala = { ...this.state.editedSala }
        if (type === 'location') {
            newSala[type] = event;
        } else if (type === 'days') {
            let arr = event.sort();
            newSala[type] = arr;
            // newSala[type] = event;
        } else if (type === 'from') {
            newSala['open'][i].from = event;
        } else if (type === 'to') {
            newSala['open'][i].to = event;
        } else if (type === 'address') {
            newSala['address'].stringaddress = event.target.value;
        } else {
            newSala[type] = event.target.value;
        }
        this.setState({
            editedSala: newSala
        })
    };

    submitForm = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({
                loading: true
            })
            this.props.dispatch(updateSala(this.state.editedSala));

            // this.setState({ search: true });
        }
    }

    validateForm = () => {
        return true;
    }

    handleModal = (type, event) => {
        const newRoom = { ...this.state.tempRoom }
        newRoom[type] = event.target.value;
        this.setState({
            tempRoom: newRoom
        })
    };

    handleEditModal = (type, event) => {
        const newRoom = { ...this.state.editedSala }
        newRoom['rooms'][this.state.editIndex][type] = event.target.value;
        this.setState({
            editedSala: newRoom
        })
    }

    handleOkEditModal = () => {
        this.setState({ editModalVisible: false })
    }

    clearTempRoom = () => {
        let clearedRoom = {
            capacity: '',
            guitar: '',
            bass: '',
            drums: '',
            price: '',
        }
        this.setState({ tempRoom: clearedRoom })
    }

    handleOk = () => {
        const newSala = { ...this.state.editedSala }
        newSala.rooms.push(this.state.tempRoom);
        if (this.state.editedSala.pricefrom === '') {
            newSala.pricefrom = this.state.tempRoom.price
        } else if (parseInt(this.state.editedSala.pricefrom, 10) >= parseInt(this.state.tempRoom.price, 10)) {
            newSala.pricefrom = this.state.tempRoom.price
        }
        if (this.state.editedSala.priceto === '') {
            newSala.priceto = this.state.tempRoom.price
        } else if (parseInt(this.state.editedSala.priceto, 10) <= parseInt(this.state.tempRoom.price, 10)) {
            newSala.priceto = this.state.tempRoom.price
        }
        this.setState({ modalVisible: false, editedSala: newSala });
        this.clearTempRoom();

    };

    handleClose = () => {
        this.setState({
            modalVisible: false,
            editModalVisible: false,
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


    renderDays = (item) => {
        switch (+item) {
            case 0:
                return (
                    <p className="isoInfoLabel">Domingo</p>
                )
            case 1:
                return (
                    <p className="isoInfoLabel">Lunes</p>
                )
            case 2:
                return (
                    <p className="isoInfoLabel">Martes</p>
                )
            case 3:
                return (
                    <p className="isoInfoLabel">Miércoles</p>
                )
            case 4:
                return (
                    <p className="isoInfoLabel">Jueves</p>
                )
            case 5:
                return (
                    <p className="isoInfoLabel">Viernes</p>
                )
            case 6:
                return (
                    <p className="isoInfoLabel">Sábado</p>
                )
            default: return (<div></div>)
        }
    }

    showDays = (receiveddays) => {
        return (
            receiveddays.map((item, i) => (
                <div className="isoContactCardInfos" key={i}>
                    {this.renderDays(item)}
                    <div style={{ "width": "100%" }}>
                        <Select
                            style={{ "width": '130px', "height": "42px", "marginTop": "15px", "fontSize": "14px", "marginRight": "20px" }}
                            placeholder="Abierto desde"
                            value={this.state.editedSala.open[item].from}
                            onChange={(event) => this.handleInput('from', event, item)}
                        >
                            {hoursOptions}
                        </Select>
                        <Select
                            style={{ "width": '130px', "height": "42px", "marginTop": "15px", "fontSize": "14px", }}
                            placeholder="Abierto hasta"
                            value={this.state.editedSala.open[item].to}
                            onChange={(event) => this.handleInput('to', event, item)}
                        >
                            {hoursOptions}
                        </Select>
                    </div>

                </div>
            ))
        )
    }

    showEditModal = (i) => (

        this.state.editedSala.rooms[i] ?
            // return (
            <Modal
                visible={this.state.editModalVisible}
                title="Editar sala"
                onOk={this.handleOkEditModal}
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
                        onClick={this.handleOkEditModal}
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
                                    value={this.state.editedSala.rooms[i].capacity || ''}
                                    onChange={event => this.handleEditModal('capacity', event)}
                                    className="styledInput"
                                />
                            </div>
                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Equipo de guitarra</p>
                                <Input
                                    placeholder="Ej. Fender, Marshall"
                                    value={this.state.editedSala.rooms[i].guitar || ''}
                                    onChange={event => this.handleEditModal('guitar', event)}
                                />
                            </div>
                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Equipo de bajo</p>
                                <Input
                                    placeholder="Ej. Wenstone, GK"
                                    value={this.state.editedSala.rooms[i].bass || ''}
                                    onChange={event => this.handleEditModal('bass', event)}
                                />
                            </div>
                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Batería</p>
                                <Input
                                    placeholder="Ej. Sonor, Tama"
                                    value={this.state.editedSala.rooms[i].drums || ''}
                                    onChange={event => this.handleEditModal('drums', event)}
                                />
                            </div>
                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Precio por hora</p>
                                <Input
                                    type="number"
                                    placeholder="Precio"
                                    value={this.state.editedSala.rooms[i].price || ''}
                                    onChange={event => this.handleEditModal('price', event)}
                                    prefix={<span style={{ color: 'rgba(0,0,0,.25)' }}>$</span>}
                                // style={{height:"36px"}}
                                />
                            </div>
                        </div>
                    </DatosCardWrapper>
                </div>
            </Modal>
            : null
        // )
    )

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
                                    className="styledInput"
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
                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Precio por hora</p>
                                <Input
                                    type="number"
                                    placeholder="Precio"
                                    value={this.state.tempRoom.price}
                                    onChange={event => this.handleModal('price', event)}
                                    prefix={<span style={{ color: 'rgba(0,0,0,.25)' }}>$</span>}
                                // style={{height:"36px"}}
                                />
                            </div>
                        </div>
                    </DatosCardWrapper>
                </div>
            </Modal>
        )
    }

    editRoom = (index) => {
        this.setState({ editModalVisible: true, editIndex: index })
    }

    deleteRoom = (key) => {
        const newSala = { ...this.state.editedSala }
        newSala.rooms.splice(key, 1);
        this.setState({ editedSala: newSala });
    }

    showRooms = () => {
        const rooms = this.state.editedSala.rooms;
        return (
            rooms.length > 0 ?
                rooms.map((item, i) => (
                    <div className="isoContactCardInfosList" key={i}>
                        <ListItem
                            editRoom={this.editRoom}
                            title={`Sala ${i + 1}`}
                            clickHandler={this.deleteRoom}
                            index={i}
                        />

                    </div>
                ))
                : null
        )
    }

    uploadPic = (file, name) => {
        this.setState({ loading: true })
        const send = file;
        // console.log(this.props)
        axios.post('/api/upload', {
            file: send,
            folder: `${this.props.user.users.id}`,
            name: `${this.props.user.users.id}-${name}`
        },
        ).then(response => {
            const neweditedSala = { ...this.state.editedSala }
            const obj = {
                original: response.data.pic,
                thumbnail: response.data.pic
            }
            neweditedSala.images.push(obj)
            this.setState({
                editedSala: neweditedSala,
                loading: false
            })
        })
    }

    uploadProfile = (file, name) => {
        const send = file;
        // console.log(this.props)
        axios.post('/api/upload', {
            file: send,
            folder: `${this.props.user.users.id}`,
            name: `${this.props.user.users.id}-${name}`
        },
        ).then(response => {
            const neweditedSala = { ...this.state.editedSala }
            neweditedSala.mainimage = response.data.pic
            this.setState({
                editedSala: neweditedSala
            })
        })
    }

    dummyRequest = () => {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 200);
    };


    render() {
        // console.log(this.props)
        const viewMode = this.props.viewMode
        this.toggleAndSave(viewMode)
        return (
            <div>
                <Spins spinning={this.state.loading}>
                    <DatosCardWrapper className="isoContactCard">
                        <div className="isoContactInfoWrapper">
                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Nombre</p>
                                <Input
                                    placeholder="Nombre de la sala"
                                    value={this.state.editedSala.name || ''}
                                    onChange={event => this.handleInput('name', event)}
                                />
                            </div>
                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Ubicación</p>
                                <Select
                                    style={{ "width": '100%', "height": "42px", "marginTop": "15px", "fontSize": "14px" }}
                                    placeholder="Localidad"
                                    value={this.state.editedSala.location || ''}
                                    onChange={(event) => this.handleInput('location', event)}
                                >
                                    {locationOptions}
                                </Select>
                            </div>
                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Descripción</p>
                                <Textarea
                                    placeholder="Descripcion"
                                    value={this.state.editedSala.description || ''}
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
                                    value={this.state.editedSala.phoneNumber || ''}
                                    onChange={event => this.handleInput('phoneNumber', event)}
                                />
                            </div>
                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Dirección</p>
                                <Input
                                    placeholder="Dirección"
                                    value={this.state.editedSala.address.stringaddress || ''}
                                    onChange={event => this.handleInput('address', event)}
                                />
                            </div>

                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Abierto</p>
                                <Select
                                    mode='multiple'
                                    style={{ "width": '100%', "height": "40px", "fontSize": "14px" }}
                                    placeholder="Días abiertos"
                                    value={this.state.editedSala.days}
                                    onChange={(event) => this.handleInput('days', event)}
                                >
                                    {daysOptions}
                                </Select>
                            </div>
                            {this.showDays(this.state.editedSala.days)}
                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Salas Disponibles</p>
                                <Button onClick={() => { this.setState({ modalVisible: true }) }}>Agregar</Button>
                            </div>

                            {this.showRooms()}

                            <div className="isoContactCardInfos">
                                <p className="isoInfoLabel">Logo</p>
                            </div>
                            {/* <GalleryUploader
                maxFiles={1}
                action={this.uploadProfile}
                customRequest={this.dummyRequest}
              />
              <div className="isoContactCardInfos">
                <p className="isoInfoLabel">Imágenes</p>
              </div>
              <GalleryUploader
                maxFiles={6}
                action={this.uploadPic}
                customRequest={this.dummyRequest}
              /> */}
                            <ButtonWrapper>
                                <div className="isoContainer">
                                    <div className="isoControlBtnGroup">
                                        <Button
                                            type="primary"
                                            onClick={this.submitForm}
                                        >
                                            Guardar
                </Button>
                                    </div>
                                </div>
                            </ButtonWrapper>
                        </div>

                        {/* {this.showModal()} */}
                        {this.showEditModal(this.state.editIndex)}
                    </DatosCardWrapper>
                </Spins>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.User,
        salas: state.Salas
    }
}
export default withRouter(connect(mapStateToProps)(FormEditSala));
