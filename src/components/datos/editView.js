import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Input, { Textarea } from '../uielements/input';
import Upload from '../uielements/upload';
import notification from '../notification';
import { DatosCardWrapper } from './datosCard.style';
import { updateUser } from '../../redux/sousers/actions'
import './upload.css';

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    notification('error', 'You can only upload JPG file!', '');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification('error', 'Image must smaller than 2MB!', '');
    return false;
  }
  notification('success', 'Image uploaded successfully!', '');
  return true;
}

let save = false;

class editDatosView extends Component {



  state = {
    fullName: '',
    firstName: '',
    lastName: '',
    phone: '',
    note: '',
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/dvdwinden/128.jpg",
    viewMode: false
  }
  componentWillMount() {
    const user = this.props.user.users
    this.setState({
      fullName: `${user.name} ${user.lastname}`,
      firstName: user.name,
      lastName: user.lastname,
      phone: user.phone,
      note: 'Pepito nota',
      viewMode: this.props.viewMode
    })
  }


  handleInput = (type, event) => {
    switch (type) {
      case 'firstName':
        this.setState({ firstName: event.target.value });
        break;
      case 'lastName':
        this.setState({ lastName: event.target.value });
        break;
      case 'phone':
        this.setState({ phone: event.target.value });
        break;
      case 'note':
        this.setState({ note: event.target.value });
        break;
      default: null;
        break;
    }

  }

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


  render() {
    const user = this.state;
    const viewMode = this.props.viewMode
    this.toggleAndSave(viewMode) 

    return (
      <DatosCardWrapper className="isoContactCard">
        <div className="isoContactCardHead">
          <div className="isoPersonImage">
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
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
        </div>
        <div className="isoContactInfoWrapper">
          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Nombre</p>
            <Input
              placeholder="Nombre"
              value={this.state.firstName}
              onChange={event => this.handleInput('firstName', event)}
              disabled={viewMode}
            />
          </div>

          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Apellido</p>
            <Input
              placeholder="Apellido"
              value={this.state.lastName}
              onChange={event => this.handleInput('lastName', event)}
              disabled={viewMode}
            />
          </div>

          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Teléfono</p>
            <Input
              type="number"
              placeholder="Teléfono"
              value={this.state.phone}
              onChange={event => this.handleInput('phone', event)}
              disabled={viewMode}
            />
          </div>

          <div className="isoContactCardInfos">
            <p className="isoInfoLabel">Notas</p>
            <Textarea
              placeholder="Notas"
              value={this.state.note}
              type="textarea"
              rows={5}
              onChange={event => this.handleInput('note', event)}
              disabled={viewMode}
            />
          </div>
        </div>

      </DatosCardWrapper>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.User
  }
}
export default connect(mapStateToProps)(editDatosView);
