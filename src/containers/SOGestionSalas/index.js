import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSalasOwner, getSalasAdmin } from '../../redux/sosalas/actions';
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
import Rate from '../../components/uielements/rate';
import { SingleCardWrapper } from '../SOSala/room.style';
import { getReviewsBySala } from '../../redux/soreviews/actions'
import Modal from '../../components/feedback/modal';
import moment from 'moment';
import Button from '../../components/uielements/button';


class GestionSalas extends Component {

    // constructor(props) {
    //     super(props)
    // }

    state = {
        reviewModalVisible: false,
    }

    componentDidMount() {
        if (this.props.user.users.role === 1) {
            this.props.dispatch(getSalasOwner(this.props.user.users.id))
        } else if (this.props.user.users.role === 2) {
            this.props.dispatch(getSalasAdmin())
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.reviews.list && this.props.reviews.list !== prevProps.reviews.list) {
            this.setState({
                reviews: this.props.reviews.list,
                reviewModalVisible: true,
            })
        }
    }

    createSala = () => {
        this.props.history.push(`${WRAPPEDURL}/createsala/`)
    }

    showResults = (data) => {
        return (
            data ?
                (data.length > 0) ?
                    data.map((sala, i) => (
                        <ContentHolder style={{
                            marginTop: "8px"
                        }}
                            key={i}>
                            <Card
                                loading={false}
                                title={<div><Link to={`${WRAPPEDURL}/editsala/${sala._id}`} style={{}}>{sala.name}, {sala.location}</Link>
                                    <Rate value={sala.score} disabled style={{ paddingLeft: "15px" }} />
                                    {
                                        sala.score !== 0 ?
                                            <span style={{ fontSize: "14px", fontWeight: "400", cursor: 'pointer' }} onClick={() => { this.showReviews(sala._id) }}>
                                                Ver valoraciones
                                                </span>
                                            :
                                            <span style={{ fontSize: "14px", fontWeight: "400" }}  >
                                                Aún no hay valoraciones
                                                </span>
                                    }
                                </div>
                                }
                                style={{ width: '100%' }}
                            >
                                {sala.description}
                            </Card>
                        </ContentHolder>

                    ))
                    : <div>No tiene salas registradas</div>
                : <div>No tiene salas registradas</div>
        )
    }

    showReviews = (salaId) => {
        this.props.dispatch(getReviewsBySala(salaId))
    }


    handleOk = () => {
        this.setState({
            reviewModalVisible: false,
        })
    }

    reviewModal = () => (
        this.state.reviews ?
            <Modal
                style={{ height: "300px" }}
                visible={this.state.reviewModalVisible}
                title="Valoraciones"
                onOk={this.handleOk}
                onCancel={this.handleOk}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        // loading={this.state.loading}
                        onClick={this.handleOk}
                    >
                        Cerrar
                    </Button>
                ]}
            >
                <div style={{ maxHeight: "300px", overflow: "scroll" }}>
                    {
                        this.state.reviews.map((item, i) => (
                            <SingleCardWrapper key={i} style={{ border: "0.5px solid lightgrey", boxShadow: "none" }} >
                                <div className="isoCardContent">
                                    {/* <h3 className="isoCardTitle">Sala {i + 1}</h3> */}
                                    <span>Reseña de {item.reviewerName}, creada el {moment(item.createdAt).format('D [de] MMMM [de] YYYY')}</span>
                                    <Rate value={item.score} disabled />
                                    <span className="isoCardDate">
                                        {item.reviewText}
                                    </span>
                                </div>
                            </SingleCardWrapper>
                        ))
                    }
                </div>
            </Modal>
            : <div></div>
    )


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
                {this.reviewModal()}
            </LayoutWrapper>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        salas: state.Salas,
        user: state.User,
        reviews: state.Reviews,
    }
}


export default connect(mapStateToProps)(GestionSalas);