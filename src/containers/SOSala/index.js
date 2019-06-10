import React, { Component } from 'react'
import { getSalaDetail, cleanProps } from '../../redux/sosalas/actions';
import { connect } from 'react-redux'
import Button from '../../components/uielements/button';
import SalaPageWrapper from './sala.style';
import ContentHolder from '../../components/utility/contentHolder';
import { SingleCardWrapper } from './room.style';
import { Link } from 'react-router-dom'
import { WRAPPEDURL } from '../../config';
import GridGallery from '../../components/gridgallery/'
import BasicMarkerMap from '../../components/googlemaps/basicMarker'

class SalaDetail extends Component {

    // imagesCarousel = (images) => (
    //     images ?
    //         images.map((item, i) => (
    //             <img key={i} src={item} height="auto" alt="imagen no disponible" style={{ objectFit: "contain", display: "inline-block" }} />
    //         ))
    //         : null
    // )

    loadRooms = (rooms) => {
        const listClass = `isoSingleCard card list`;
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
                        {/* <Link to={`${WRAPPEDURL}/sala/${this.props.sala.currentSala._id}/reservar`}>
                            <Button className="isoReserveBtn isoControlBtn" type="primary" icon="calendar">
                                RESERVAR
                        </Button>
                        </Link> */}
                    </SingleCardWrapper>
                ))
                : null

        )
    }

    componentDidMount() {
        this.props.dispatch(cleanProps())
        this.props.dispatch(getSalaDetail(this.props.match.params.id))
    }

    showInfo = (sala) => {
        // console.log(sala);
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
                        <div style={{fontSize:"18px" }} >{`Dirección: ${sala.address.stringaddress}`}</div>
                        <BasicMarkerMap/>
                        <h3 className="isoTitle" style={{ textTransform: "uppercase" }}>SALAS DISPONIBLES: </h3>
                        {this.loadRooms(sala.rooms)}
                    </div>
                </SalaPageWrapper>
                : null
        )
    }

    render() {
        const sala = this.props.salas.currentSala;
        return (
            <div>
                {this.showInfo(sala)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        salas: state.Salas
    }
}


export default connect(mapStateToProps)(SalaDetail)
