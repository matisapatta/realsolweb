import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutWrapper from '../../components/utility/layoutWrapper';
import { BigInputSearch } from '../../components/uielements/input';
import Box from '../../components/utility/box';
import ContentHolder from '../../components/utility/contentHolder';
import { Col, Row, Icon } from 'antd';
import Form from '../../components/uielements/form';
import { getSalas } from '../../redux/sosalas/actions';
import Card from '../../components/uielements/styles/card.style';
import { Link } from 'react-router-dom'
import { WRAPPEDURL } from '../../config';


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
    salas: state.Salas
  }
}


export default connect(mapStateToProps)(Busqueda);
