import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutWrapper from '../../components/utility/layoutWrapper';
import { BigInputSearch } from '../../components/uielements/input';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import {
  Col,
  Row,
  // Button 
} from 'antd';
import Form from '../../components/uielements/form';
import Button from '../../components/uielements/button';
import Select, { SelectOption } from '../../components/uielements/select';
import { getSalas, testSalaSave } from '../../redux/sosalas/actions';
import Card from '../../components/uielements/styles/card.style';
import { Link } from 'react-router-dom'
import { WRAPPEDURL, locations } from '../../config';
import { rowStyle, colStyle, gutter } from '../../config/styleConst';

const testSala = {
  name: "Sola de Ensayo",
  location: "Chacarita",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in eros vitae neque suscipit ornare a nec nibh. Maecenas efficitur sed tortor nec feugiat. Vivamus eu nulla eget felis dictum aliquet vel vel nunc. Pellentesque condimentum, urna non placerat consectetur, mauris metus mollis velit, eu sagittis sapien libero sit amet enim. Phasellus in libero sed diam lobortis facilisis. Morbi quam sem, accumsan et rhoncus id, luctus non ante. In hac habitasse platea dictumst. Phasellus efficitur enim sed metus molestie, ac egestas nunc dignissim.",
  mainimage: "/images/1/main.png",
  images: [
    "/images/1/image1.jpg",
    "/images/1/image2.jpg",
    "/images/1/image3.png"
  ],
  rooms: [
    {
      capacity: 4,
      guitar: "Marshall",
      drums: "Sonor",
      bass: "Wenstone",
    },
    {
      capacity: 5,
      guitar: "Fender",
      drums: "Yamaha",
      bass: "Gallien Krueger",
    },
  ],
  ownerId: "pepito"
}

const Option = SelectOption;
const locationOptions = [];

class Busqueda extends Component {

  state = {
    formdata: {
      name: '',
      location: []
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

  submitForm = (e) => {
    e.preventDefault();
    this.props.dispatch(getSalas(this.state.formdata));
    this.setState({ search: true });
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
                    <BigInputSearch
                      placeholder="Nombre"
                      value={this.state.formdata.name}
                      onChange={(event) => this.handleInput(event, 'name')}
                      onSubmit={this.submitForm}
                    />
                    <Select
                      mode="multiple"
                      style={{ "width": '100%', "height": "45px", "margin": "5px 0px" }}
                      placeholder="Localidad"
                      // value={this.state.formdata.location}
                      onChange={(event) => this.handleChange(event, 'location')}
                    >
                      {locationOptions}
                    </Select>
                    <div>
                      <Button icon="search" onClick={this.submitForm}>
                        Buscar
                    </Button>
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
