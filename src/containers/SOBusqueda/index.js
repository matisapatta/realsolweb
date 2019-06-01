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
import DatePicker, { DateRangepicker } from '../../components/uielements/datePicker';
import Select, { SelectOption } from '../../components/uielements/select';
import { getSalas, testSalaSave } from '../../redux/sosalas/actions';
import Card from '../../components/uielements/styles/card.style';
import { Link } from 'react-router-dom'
import { WRAPPEDURL, locations, dateFormat } from '../../config';
import { rowStyle, colStyle, gutter } from '../../config/styleConst';
import { testSala } from '../../testData';
import { ButtonWrapper } from './gestionsalas.style'
import notification from '../../components/notification';
import moment from 'moment';


const Option = SelectOption;
const locationOptions = [];


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
    locations: []
  }

  constructor(props) {
    super(props)
    if (props.salas == null)
      this.state = { search: false }
    locationOptions.length === 0 ?
      locations.forEach((element) => {
        locationOptions.push(<Option key={element}>{element}</Option>);
      })
      : null
  }
  // componentWillMount() {
  //   if (this.props.salas == null)
  //     this.setState({ search: false })
  //   // else
  //   //   this.setState({ search: true })
  //   // this.testSave();
  // }

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

  validateForm = () => {
    const formData = this.state.formdata;
    let priceValid = false;
    if (formData.pricefrom === '')
      formData.pricefrom = "0";
    if (formData.priceto === '')
      formData.priceto = "0";
    if (parseInt(formData.pricefrom, 10) > parseInt(formData.priceto, 10)) {
      notification('error', 'El campo "precio hasta" debe ser mayor al campo "precio desde"', '');
    } else {
      priceValid = true;
    }
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

  showResults = (data) => {
    return (
      data[0] ?
        (data[0].length > 0) ?
          data[0].map((sala, i) => (
            <Link to={`${WRAPPEDURL}/sala/${sala._id}`} key={i}>
              <ContentHolder>
                <Card
                  loading={false}
                  title={`${sala.name}, ${sala.location}`}
                  style={{ width: '100%' }}
                >
                  {sala.description}
                </Card>
              </ContentHolder>
            </Link>
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
    console.log(this.state)
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
                    {/* <DatePicker
                      placeholder="Fecha desde"
                      style={{ "width": '45%', "marginTop": "16px", "lineHeight": "1" }}
                      format={dateFormat}
                      onChange={(event) => this.handleDate(event, 'datefrom')}
                    />
                    <DatePicker
                      placeholder="Fecha hasta"
                      style={{ "width": '45%', "marginTop": "16px", "lineHeight": "1", "float": "right" }}
                      format={dateFormat}
                    /> */}
                    <DateRangepicker
                      placeholder={["Fecha desde", "Fecha hasta"]}
                      style={{ "width": '100%', "marginTop": "16px", "lineHeight": "1" }}
                      format={dateFormat}
                      onChange={(date, dateString) => this.handleDate(date, dateString)}
                    />
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
