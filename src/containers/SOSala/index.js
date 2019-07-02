import React, { Component } from 'react'
import { getSalaDetail, cleanProps } from '../../redux/sosalas/actions';
import { getReviewsBySala } from '../../redux/soreviews/actions'
import { connect } from 'react-redux'
import Button from '../../components/uielements/button';
import SalaPageWrapper from './sala.style';
import ContentHolder from '../../components/utility/contentHolder';
import { SingleCardWrapper } from './room.style';
import { Link } from 'react-router-dom'
import { WRAPPEDURL } from '../../config';
import GridGallery from '../../components/gridgallery/'
import BasicMarkerMap from '../../components/googlemaps/basicMarker'
import Rate from '../../components/uielements/rate';
// import { ModalDataWrapper } from './modal.style';
import Modal from '../../components/feedback/modal';
import moment from 'moment'

const listClass = `isoSingleCard card list`;

class SalaDetail extends Component {

    // imagesCarousel = (images) => (
    //     images ?
    //         images.map((item, i) => (
    //             <img key={i} src={item} height="auto" alt="imagen no disponible" style={{ objectFit: "contain", display: "inline-block" }} />
    //         ))
    //         : null
    // )

    componentDidMount() {
        this.props.dispatch(cleanProps())
        this.props.dispatch(getSalaDetail(this.props.match.params.id))
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.reviews.list && this.props.reviews.list !== prevProps.reviews.list) {
            this.setState({
                reviews: this.props.reviews.list,
                modalVisible: true,
            })
        }
    }
    state = {
        modalVisible: false
    }

    loadRooms = (rooms) => {
        // const listClass = `isoSingleCard card list`;
        return (
            rooms ?
                rooms.map((item, i) => (
                    <SingleCardWrapper key={i} id={this.props.id} className={listClass} style={{ border: "1.5px solid lightgrey" }} >
                        <div className="isoCardContent">
                            <h3 className="isoCardTitle">Sala {i + 1}</h3>
                            <span className="isoCardDate">
                                Equipo de Guitarra: {item.guitar}
                            </span>
                            <span className="isoCardDate">
                                Equipo de bajo: {item.bass}
                            </span>
                            <span className="isoCardDate">
                                Capacidad de la sala: {item.capacity}
                            </span>
                        </div>
                        <div className="isoControlBtn" style={{ fontSize: "30px", width: "100px" }}>
                            {`$ ${item.price}`}
                        </div>
                    </SingleCardWrapper>
                ))
                : null

        )
    }


    showReviews = (salaId) => {
        this.props.dispatch(getReviewsBySala(salaId))
    }

    handleClose = () => {
        this.setState({
            modalVisible: false,
        });
    };

    reviewModal = () => (
        this.state.reviews ?
            <Modal
                style={{ height: "300px" }}
                visible={this.state.modalVisible}
                title="Valoraciones"
                onOk={this.handleClose}
                onCancel={this.handleClose}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        // loading={this.state.loading}
                        onClick={this.handleClose}
                    >
                        Cerrar
                    </Button>
                ]}
            >
                <div style={{maxHeight:"300px", overflow:"scroll"}}>
                    {
                        this.state.reviews.map((item, i) => (
                            <SingleCardWrapper key={i} style={{ border: "0.5px solid lightgrey", boxShadow:"none" }} >
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

    showInfo = (sala) => {
        return (
            sala ?
                <SalaPageWrapper className="">
                    <div className="isoPageHeader">
                        <h1 className="isoPageTitle" style={{ textTransform: "uppercase" }}>{sala.name}</h1>
                        <Link to={`${WRAPPEDURL}/sala/${this.props.salas.currentSala._id}/reservar`}>
                            <Button className="isoReserveBtn isoControlBtn" type="primary" icon="calendar">
                                RESERVAR
                            </Button>
                        </Link>
                    </div>
                    <div className="isoPageContent">
                        <div style={{ paddingBottom: "20px" }}><Rate value={sala.score} disabled />
                            {
                                sala.score !== 0 ?
                                    <span style={{ cursor: 'pointer' }} onClick={() => { this.showReviews(sala._id) }}>
                                        Ver todas las valoraciones
                                </span>
                                    :
                                    <span>
                                        Aún no hay valoraciones
                                </span>
                            }
                        </div>
                        <h3 className="isoTitle" style={{ textTransform: "uppercase" }}>Ubicación: {sala.location}</h3>
                        <div className="isoHorizontalContent">
                            {sala.description}
                        </div>
                        <ContentHolder style={{
                            // height: "auto",
                            // width: "100%",
                        }}>
                            <GridGallery
                                data={sala.images}
                            />
                        </ContentHolder>
                        <h3 className="isoTitle" style={{ textTransform: "uppercase" }}>Ubicación en el mapa </h3>
                        <div style={{ fontSize: "18px" }} >{`Dirección: ${sala.address.stringaddress}`}</div>
                        <BasicMarkerMap />
                        <h3 className="isoTitle" style={{ textTransform: "uppercase" }}>SALAS DISPONIBLES: </h3>
                        {this.loadRooms(sala.rooms)}
                    </div>
                </SalaPageWrapper>
                : null
        )
    }

    render() {
        const sala = this.props.salas.currentSala;
        // console.log(this.props)
        return (
            <div>
                {this.showInfo(sala)}
                {this.reviewModal()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        salas: state.Salas,
        reviews: state.Reviews,
    }
}


export default connect(mapStateToProps)(SalaDetail)
