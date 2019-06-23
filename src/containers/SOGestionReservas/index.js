import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSalasOwner } from '../../redux/sosalas/actions';
import LayoutWrapper from '../../components/utility/layoutWrapper';
import { Link } from 'react-router-dom'
import { WRAPPEDURL } from '../../config';
import ContentHolder from '../../components/utility/contentHolder';
import {
    Col,
    Row,
    Icon
} from 'antd';
import Card from '../../components/uielements/styles/card.style';
import { rowStyle, gutter } from '../../config/styleConst';
import { InputSearch } from '../../components/uielements/input';
import { getReservationById } from '../../redux/soreservations/actions'
import notification from '../../components/notification'

const titleStyle = {
    "fontSize": "25px",
    "textAlign": "center",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "width": "100%"
}

class GestionReservas extends Component {

    // constructor(props) {
    //     super(props)
    // }

    state = {
        searchValue: ''
    }

    componentDidMount() {
        this.props.dispatch(getSalasOwner(this.props.user.users.id))
    }

    handleSearchInput = (event) => {
        this.setState({
            searchValue: event.target.value
        })
    }

    submitSearch = () => {
        const id = this.state.searchValue;
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            this.props.dispatch(getReservationById(id));
        } else {
            notification('error',"No es un formato de ID de reserva válido")
        }
        
    }


    showResults = (data) => {
        return (
            data ?
                (data.length > 0) ?
                    data.map((sala, i) => (
                        <Link to={`${WRAPPEDURL}/gestionreservas/sala/${sala._id}`} key={i}>
                            <ContentHolder style={{
                                marginTop: "8px"
                            }}>
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
                    : <div>No tiene salas registradas</div>
                : <div>No tiene salas registradas</div>
        )
    }

    render() {
        console.log(this.props)
        return (
            <LayoutWrapper>
                <div style={titleStyle}>
                    Gestión de Reservas
                </div>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={{ marginBottom: "10px" }} >
                        <ContentHolder>
                            <InputSearch
                                size="large"
                                placeholder="Buscar por código de reserva"
                                value={this.state.searchValue}
                                onChange={this.handleSearchInput}
                                onPressEnter={this.submitSearch}
                                onSearch={this.submitSearch}
                            />
                        </ContentHolder>
                    </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={{
                        marginBottom: "10px"
                    }} >
                        {/* <Box title="Salas"> */}
                        {this.showResults(this.props.salas.listSalas)}
                        {/* </Box> */}
                    </Col>
                </Row>
                {/* <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={colStyle}>
                        <ButtonWrapper>
                            <div className="isoContainer">
                                <div className="isoControlBtnGroup">
                                    <button className="isoControlBtn" onClick={this.createSala}>
                                        <Icon type="plus" />
                                        Agregar Sala de Ensayo
                                    </button>
                                </div>
                            </div>
                        </ButtonWrapper>
                    </Col>
                </Row> */}
            </LayoutWrapper>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        salas: state.Salas,
        user: state.User,
        reservations: state.Reservations,
    }
}


export default connect(mapStateToProps)(GestionReservas);