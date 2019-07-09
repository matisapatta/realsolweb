import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import Input from '../uielements/input';
import Upload from '../uielements/upload';
import { DatosCardWrapper } from './datosCard.style';
import { updateUser } from '../../redux/sousers/actions'
import axios from 'axios'
import { getBase64 } from '../../helpers/utility';
import './upload.css';
import Button from '../../components/uielements/button';
import notification from '../../components/notification';

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

class editDatosView extends Component {



  state = {
    fullName: '',
    firstName: '',
    lastName: '',
    phone: '',
    note: '',
    avatar: '',
    password:'',
    cpassword:'',
    viewMode: false,
    passMatch: true,
    passOk: true,
  }

  constructor(props) {
    super(props);
    this.uploadProfile = this.uploadProfile.bind(this)
  }
  componentWillMount() {
    const user = this.props.user.users
    this.setState({
      fullName: `${user.name} ${user.lastname}`,
      firstName: user.name,
      lastName: user.lastname,
      phone: user.phone,
      email: user.email,
      avatar: user.avatar,
      viewMode: this.props.viewMode
    })
  }

  dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  getImgString = (file) => {
    this.base64file(file);
    this.setState({
      fileSend: file.preview
    })
    return true;
  }

  base64file = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file);
    }
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
      case 'email':
        this.setState({ email: event.target.value });
        break;
      default: this.dummy();
        break;
    }

  }

  saveUser = (user) => {
    this.props.dispatch(updateUser(user));
    notification('success', "Perfil modificado")
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
        phone: this.state.phone,
        avatar: this.state.avatar,
      }
      this.saveUser(data);
    }
  }


  validateForm = () => {
    let isValid = false;
    let passOk = false;
    if (this.state.password === '') {
      this.setState({ passOk: false, passMessage: "Campo obligatorio" })
      notification('error', "Debe completar el campo contraseña")
    } else if (this.state.password.length < 6) {
      this.setState({ passOk: false, passMessage: "La contraseña debe tener un mínimo de 6 caracteres" })
      notification('error', "La contraseña debe tener un mínimo de 6 caracteres")
    } else {
      passOk = true;
    }
    if (passOk && this.state.passMatch) {
      isValid = true;
    }
    return isValid;
  }

  handleInputPassword = (event) => {
    if (event.target.value.length <= 30)
      this.setState({ password: event.target.value, passOk: true, passMatch: false })
  }

  validateInputPassword = (event) => {
    this.setState({ cpassword: event.target.value })
    if (event.target.value !== this.state.password)
      this.setState({ passMatch: false })
    else
      this.setState({ passMatch: true })
  }



  handleChangePassword = () => {
    if (this.validateForm()) {
      let sendData = {
        _id: this.props.user.users.id,
        password: this.state.password
      }
      axios.post('/api/changepassword', sendData).then(response => {
        if (response.data.success) {
          notification('success', "Contraseña actualizada con éxito")
        }
        else {
          if (response.data.msg)
            notification('error', response.data.msg)
          else
            notification('error', "Error al actualizar contraseña")
        }

      })
    } else {
      notification('error', "Hay errores en el formulario, por favor corregirlos.")
    }
    this.setState({ password: '', cpassword: '' });
  }

  uploadProfile = (file) => {
    const send = file.file.originFileObj.preview;
    const name = file.file.originFileObj.name;
    axios.post('/api/upload', {
      file: send,
      folder: `${this.props.user.users.id}`,
      name: `avatar-${this.props.user.users.id}-${name}`
    },
    ).then(response => {
      // const newUser = { ...this.state.user }
      // newCreatedSala.mainimage = response.data.pic
      this.setState({
        avatar: response.data.pic
      })
    })
  }
  dummy = () => {

  }


  render() {
    const user = this.state;
    const viewMode = this.props.viewMode
    this.toggleAndSave(viewMode)
    // console.log(this.props)
    // console.log(user)
    return (
      <DatosCardWrapper className="isoContactCard">
        <div className="isoContactCardHead">
          <div className="isoPersonImage">
            <Upload
              className="avatar-uploader"
              name="avatar"
              showUploadList={false}
              beforeUpload={this.getImgString}
              action=""
              disabled={viewMode}
              onChange={this.uploadProfile}
              customRequest={this.dummyRequest}
            >
              {user.avatar ? (
                <img src={this.state.avatar} alt="" className="avatar" />
              ) : (
                  ''
                )}
              <Icon type="plus" className="avatar-uploader-trigger" />
            </Upload>
            {/* <GalleryUploader
              maxFiles={1}
              action={this.uploadProfile}
              customRequest={this.dummyRequest}
              >
              {user.avatar ? (
                <img src={this.state.avatar} alt="" className="avatar" />
              ) : (
                  ''
                )}
              <Icon type="plus" className="avatar-uploader-trigger" />
              </GalleryUploader> */}
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
            <p className="isoInfoLabel">Email</p>
            <Input
              placeholder="Email"
              value={this.state.email}
              onChange={event => this.handleInput('email', event)}
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
          {
            !viewMode ?
              <div>
                <div className="isoContactCardInfos">
                  <p className="isoInfoLabel">Contraseña</p>
                  <Input
                    type="password"
                    placeholder="Contraseña"
                    value={this.state.password}
                    onChange={event => this.handleInputPassword(event)}
                    disabled={viewMode}
                  />
                </div>
                <div className="isoContactCardInfos">
                  <p className="isoInfoLabel">Confirmar</p>
                  <Input
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={this.state.cpassword}
                    onChange={event => this.validateInputPassword(event)}
                    disabled={viewMode}
                  />
                </div>
                <div style={{ color: "red" }}>{this.state.passMatch ? "" : "Las contraseñas no coinciden"}</div>
                <div className="isoContactCardInfos">
                  <Button onClick={this.handleChangePassword}>Cambiar Contraseña</Button>
                </div>
              </div>
              : <div></div>
          }


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
