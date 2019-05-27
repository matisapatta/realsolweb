import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutWrapper from '../../components/utility/layoutWrapper';
import { BigInputSearch } from '../../components/uielements/input';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import { Col, 
  Row, 
  // Button 
} from 'antd';
import Form from '../../components/uielements/form';
import { getSalas, testSalaSave } from '../../redux/sosalas/actions';
import Card from '../../components/uielements/styles/card.style';
import { Link } from 'react-router-dom'
import { WRAPPEDURL } from '../../config';

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
  ownerId:"pepito"
}

const rowStyle = {
  width: '100%',
  display: 'flex',
  flexFlow: 'row wrap',
};
const colStyle = {
  marginBottom: '28px',
};
const gutter = 36;

class Busqueda extends Component {

  state = {
    formdata: {
      searchValue: ''
    },
    search: false
  }

  componentWillMount() {
    if (this.props.salas == null)
      this.setState({ search: false })
    // else
    //   this.setState({ search: true })
    // this.testSave();
  }

  testSave = () => {
    this.props.dispatch(testSalaSave(testSala));
  }

  handleInput = (event, name) => {
    const newFormdata = { ...this.state.formdata }
    newFormdata[name] = event.target.value;
    this.setState({
      formdata: newFormdata
    })
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.dispatch(getSalas(this.state.formdata));
    this.setState({ search: true });
  }


  // Ejemplo de Results
  //   <ContentHolder>
  //   <Card
  //     loading={false}
  //     title="Card Title"
  //     style={{ width: '100%' }}
  //   >
  //     Mensaje
  //   </Card>
  // </ContentHolder>



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

  initMap = () => {
    function initMap() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
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
                  <Form onSubmit={this.submitForm}>
                    <BigInputSearch
                      placeholder="Buscar por nombre o localidad"
                      value={this.state.formdata.searchValue}
                      onChange={(event) => this.handleInput(event, 'searchValue')}
                      onSubmit={this.submitForm}
                    />
                  </Form>
                  <div style={{
                    "height": "200px"
                  }} >
                    {this.initMap()}
                  </div>
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
