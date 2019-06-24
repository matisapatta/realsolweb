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
import { rowStyle, colStyle, gutter } from '../../config/styleConst';
import { ButtonWrapper } from './gestionsalas.style'

class GestionSalas extends Component {

    // constructor(props) {
    //     super(props)
    // }

    componentDidMount() {
        this.props.dispatch(getSalasOwner(this.props.user.users.id))
    }

    createSala = () => {
        this.props.history.push(`${WRAPPEDURL}/createsala/`)
    }

    showResults = (data) => {
        return (
            data ?
                (data.length > 0) ?
                    data.map((sala, i) => (
                        <Link to={`${WRAPPEDURL}/editsala/${sala._id}`} key={i}>

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
        return (
            <LayoutWrapper>
                <Row style={rowStyle} gutter={gutter} justify="start">
                    <Col md={24} sm={24} xs={24} style={{
                        marginBottom: "10px"
                    }} >
                        {/* <Box title="Salas"> */}
                        {this.showResults(this.props.salas.listSalas)}
                        {/* </Box> */}
                    </Col>
                </Row>
                <Row style={rowStyle} gutter={gutter} justify="start">
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
                </Row>
            </LayoutWrapper>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        salas: state.Salas,
        user: state.User
    }
}


export default connect(mapStateToProps)(GestionSalas);