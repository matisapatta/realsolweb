import React, { Component } from 'react'
import { getSalaDetail } from '../../redux/sosalas/actions';
import { connect } from 'react-redux'
import Button from '../../components/uielements/button';
import SalaPageWrapper from './sala.style';
import ContentHolder from '../../components/utility/contentHolder';
import { SingleCardWrapper } from './room.style';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import { Link } from 'react-router-dom'
import { WRAPPEDURL } from '../../config';
// import Gallery from 'react-grid-gallery'






class SalaDetail extends Component {

    imagesCarousel = (images) => (
        images ?
            images.map((item, i) => (
                <img key={i} src={item} height="auto" alt="imagen no disponible" style={{ objectFit: "contain", display: "inline-block" }} />
            ))
            : null
    )

    loadRooms = (rooms) => {
        console.log(this.props)
        const listClass = `isoSingleCard card list`;
        return (
            rooms ?
                rooms.map((item, i) => (
                    <SingleCardWrapper key={i} id={this.props.id} className={listClass}>
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
                        <Link to={`${WRAPPEDURL}/sala/${this.props.sala.currentSala._id}/reservar`}>
                            <Button className="isoReserveBtn isoControlBtn" type="primary" icon="calendar">
                                RESERVAR
                        </Button>
                        </Link>
                    </SingleCardWrapper>
                ))
                : null

        )
    }

    componentDidMount() {
        this.props.dispatch(getSalaDetail(this.props.match.params.id))
    }

    showInfo = (sala) => {

        return (
            sala ?
                <SalaPageWrapper className="">
                    <div className="isoPageHeader">
                        <h1 className="isoPageTitle" style={{ textTransform: "uppercase" }}>{sala.name}</h1>
                    </div>
                    <div className="isoPageContent">
                        <h3 className="isoTitle" style={{ textTransform: "uppercase" }}>Ubicación: {sala.location}</h3>
                        <div className="isoHorizontalContent">
                            {sala.description}
                        </div>
                        <ContentHolder style={{
                            height: "auto",
                            width: "100%",
                        }}>
                            <ImageGallery
                                items={sala.images}
                                showFullscreenButton={false}
                                showPlayButton={false}
                            />
                        </ContentHolder>
                        <h3 className="isoTitle" style={{ textTransform: "uppercase" }}>SALAS DISPONIBLES: </h3>
                        {this.loadRooms(sala.rooms)}
                    </div>
                </SalaPageWrapper>
                : null
        )
    }

    render() {
        const sala = this.props.sala.currentSala;
        return (
            <div>
                {this.showInfo(sala)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        sala: state.Salas
    }
}


export default connect(mapStateToProps)(SalaDetail)
