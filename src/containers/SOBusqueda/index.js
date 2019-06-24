import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutWrapper from '../../components/utility/layoutWrapper';
import StyledInput from '../../components/uielements/input';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import {
  Col,
  Row,
} from 'antd';
import Form from '../../components/uielements/form';
import Button from '../../components/uielements/button';
import { DateRangepicker } from '../../components/uielements/datePicker';
import Select, { SelectOption } from '../../components/uielements/select';
import { getSalas, testSalaSave } from '../../redux/sosalas/actions';
import Card from '../../components/uielements/styles/card.style';
import { Link } from 'react-router-dom'
import { WRAPPEDURL, locations, dateFormat } from '../../config';
import { rowStyle, colStyle, gutter } from '../../config/styleConst';
import { testSala } from '../../testData';
import { ButtonWrapper } from './busqueda.style'
import notification from '../../components/notification';
import CardContent from '../../components/cardcontent/cardContent';
import Modal from '../../components/feedback/modal';
import GoogleMapReact from 'google-map-react';
import markerImg from '../../image/marker.png'
import moment from 'moment';



const Option = SelectOption;
const locationOptions = [];

const Marker = () => (
  <img src={markerImg} alt="marker" />
);

class Busqueda extends Component {

  state = {
    formdata: {
      name: '',
      location: [],
      pricefrom: '',
      priceto: '',
      datefrom: '',
      dateto: '',
      isValid: false,
    },
    search: false,
    locations: [],
    modalVisible: false,
    modalLoading: false,
    currentLocation: '',
  }

  constructor(props) {
    super(props)
    if (props.salas == null)
      this.state = { search: false }
    locationOptions.length === 0 ?
      locations.forEach((element) => {
        locationOptions.push(<Option key={element}>{element}</Option>);
      })
      : this.dummy()
  }

  static defaultProps = {
    center: {
      lat: -34.5986252,
      lng: -58.3745519
    },
    zoom: 15
  };

  dummy = () => {

  }
  testSave = () => {
    this.props.dispatch(testSalaSave(testSala));

  }
  handleChange = (value, name) => {
    const newFormdata = { ...this.state.formdata }
    newFormdata[name] = value;
    this.setState({
      formdata: newFormdata
    })
  };

  handleInput = (event, name) => {
    const newFormdata = { ...this.state.formdata }
    newFormdata[name] = event.target.value;
    this.setState({
      formdata: newFormdata
    })
  }

  handleList = (event, name) => {
    const newFormdata = { ...this.state.formdata }
    console.log(event);
    newFormdata[name].push(event);
    this.setState({
      formdata: newFormdata
    })
  }

  handleDate = (date, dateString) => {
    const newFormdata = { ...this.state.formdata }
    newFormdata["datefrom"] = dateString[0];
    newFormdata["dateto"] = dateString[1];
    this.setState({
      formdata: newFormdata
    })
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = () => {
    this.setState({ modalLoading: true });
    setTimeout(() => {
      this.setState({ modalLoading: false, modalVisible: false });
    }, 2000);
  };

  handleClose = () => {
    this.setState({
      modalVisible: false,
      currentLocation: '',
    });
  };

  validateForm = () => {
    const formData = this.state.formdata;
    let priceValid = false;
    if (formData.pricefrom === '')
      formData.pricefrom = "0";
    if (formData.priceto === '')
      formData.priceto = "0";
    if (formData.pricefrom !== "0" && formData.priceto !== "0") {
      if (parseInt(formData.pricefrom, 10) > parseInt(formData.priceto, 10)) {
        notification('error', 'El campo "precio hasta" debe ser mayor al campo "precio desde"', '');
      } else {
        priceValid = true;
      }
    } else { priceValid = true }
    if (priceValid)
      return true;
    return false

  }

  submitForm = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.dispatch(getSalas(this.state.formdata));
      this.setState({ search: true });
    }

  }

  showExtra = (sala) => {
    return (<a onClick={() => { this.showSalaLocation(sala.name) }}>Mapa</a>)
  }

  showSalaLocation = (name) => {
    this.setState({
      currentLocation: name
    })
    this.showModal();

  }

  showResults = (data) => {
    return (
      data[0] ?
        (data[0].length > 0) ?
          data[0].map((sala, i) => (
            // <Link to={`${WRAPPEDURL}/sala/${sala._id}`} key={i}>
            <ContentHolder key={i}>
              <Card
                loading={false}
                title={<Link to={`${WRAPPEDURL}/sala/${sala._id}`}>{`${sala.name}, ${sala.location}`}</Link>}
                style={{ width: '100%' }}
                extra={this.showExtra(sala)}
              >
                <CardContent
                  text={sala.description}
                  image={sala.mainimage}
                />
              </Card>
            </ContentHolder>
            // </Link>
          ))
          : <div>No se encontraron coincidencias</div>
        : <div>No se encontraron coincidencias</div>
    )
  }

  searchPerformed = (search) => {
    return (
      search ?
        <Row style={rowStyle} gutter={gutter} justify="start">
          <Col md={24} sm={24} xs={24} style={colStyle}>
            <Box title="Resultados de la búsqueda">
              {this.showResults(this.props.salas)}
            </Box>
          </Col>
        </Row>
        : null
    )
  }


  render() {
    moment.locale('es', {
      week: {
        dow: 0,
        // doy : Int
      }
    })
    return (
      <div>
        <LayoutWrapper>
          <Row style={rowStyle} gutter={gutter} justify="start">
            <Col md={24} sm={24} xs={24} style={colStyle}>
              <Box
                title="Buscar"
              >
                <ContentHolder>
                  <Form
                    onSubmit={this.submitForm}
                  >
                    <StyledInput
                      placeholder="Nombre"
                      value={this.state.formdata.name}
                      onChange={(event) => this.handleInput(event, 'name')}
                      onSubmit={this.submitForm}
                      size="large"
                    />
                    <Select
                      mode="multiple"
                      style={{ "width": '100%', "height": "42px", "marginTop": "15px" }}
                      placeholder="Localidad"
                      // value={this.state.formdata.location}
                      onChange={(event) => this.handleChange(event, 'location')}
                    >
                      {locationOptions}
                    </Select>
                    <StyledInput
                      placeholder="Precio desde"
                      value={this.state.formdata.pricefrom}
                      onChange={(event) => this.handleInput(event, 'pricefrom')}
                      onSubmit={this.submitForm}
                      type="number"
                      size="large"
                      style={{ "width": '45%', "height": "42px", "marginTop": "16px" }}
                      prefix={<span style={{ color: 'rgba(0,0,0,.25)' }}>$</span>}
                    />
                    <StyledInput
                      placeholder="Precio hasta"
                      value={this.state.formdata.priceto}
                      onChange={(event) => this.handleInput(event, 'priceto')}
                      onSubmit={this.submitForm}
                      type="currency"
                      size="large"
                      style={{ "width": '45%', "height": "42px", "marginTop": "16px", "float": "right" }}
                      prefix={<span style={{ color: 'rgba(0,0,0,.25)' }}>$</span>}
                    />
                    {/* <DateRangepicker
                      placeholder={["Fecha desde", "Fecha hasta"]}
                      style={{ "width": '100%', "marginTop": "16px", "lineHeight": "1" }}
                      format={dateFormat}
                      onChange={(date, dateString) => this.handleDate(date, dateString)}
                    /> */}
                    <div style={{
                      marginTop: "15px",
                      alignContent: "center"
                    }}>
                      <ButtonWrapper>
                        <div className="isoContainer">
                          <div className="isoControlBtnGroup">
                            <Button icon="search" onClick={this.submitForm}>
                              Buscar
                            </Button>
                          </div>
                        </div>
                      </ButtonWrapper>
                    </div>
                  </Form>
                </ContentHolder>
              </Box>
            </Col>
          </Row>
          {/* Resultados */}
          {this.searchPerformed(this.state.search)}
          {/* Modal con Mapa */}
          <Modal
            visible={this.state.modalVisible}
            title={this.state.currentLocation}
            onOk={this.handleOk}
            onCancel={this.handleClose}
            footer={[
              <Button key="back" size="large" type="primary" onClick={this.handleClose}>
                OK
              </Button>
            ]}
          >
            <div style={{ height: '400px', width: '100%' }}>
              <GoogleMapReact
                // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
              >
                <Marker
                  lat={-34.5986252}
                  lng={-58.3745519}
                />
              </GoogleMapReact>
            </div>

          </Modal>

        </LayoutWrapper>
      </div>


    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    salas: state.Salas,
    user: state.User
  }
}


export default connect(mapStateToProps)(Busqueda);
