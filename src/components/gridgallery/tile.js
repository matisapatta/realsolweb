import React, { Component } from 'react'
import { TileImg } from './gridgallery.style'


const tileStyle = {
    margin: "15px",
    cursor: "pointer",
    overflow: "hidden",
    width: "18vw",
    height: "18vw",
}

class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            mouseOver: false
        };
        // Bind properties to class instance
        this._clickHandler = this._clickHandler.bind(this);
        this._mouseEnter = this._mouseEnter.bind(this);
        this._mouseLeave = this._mouseLeave.bind(this);
    }
    // Event handlers to modify state values
    _mouseEnter(e) {
        e.preventDefault();
        if (this.state.mouseOver === false) {
            this.setState({
                mouseOver: true
            })
        }
    }
    _mouseLeave(e) {
        e.preventDefault();
        if (this.state.mouseOver === true) {
            this.setState({
                mouseOver: false
            })
        }
    }
    _clickHandler(e) {
        e.preventDefault();
        if (this.state.open === false) {
            this.setState({
                open: true
            });
        } else {
            this.setState({
                open: false
            });
        }
    }

    render() {

        // Modify styles based on state values
        let tileImgStyle = {}
        // let headerStyle = {};
        // let zoom = {};
        // When tile clicked
        if (this.state.open) {
            tileImgStyle = {
                width: '600px',
                height: '600px',
                position: 'absolute',
                top: '100%',
                left: '50%',
                right: '50%',
                bottom: '50%',
                margin: '0',
                marginTop: '-31vw',
                marginLeft: '-31vw',
                boxShadow: '0 0 40px 5px rgba(0, 0, 0, 0.3)',
                transform: 'none',
                maxHeight: '600px',
            };
        } else {
            tileImgStyle = {
                width: '18vw',
                height: '18vw'
            };
        }

        return (
            <div style={tileStyle}>
                <TileImg
                    className="TileImg"
                    onMouseEnter={this._mouseEnter}
                    onMouseLeave={this._mouseLeave}
                    onClick={this._clickHandler}
                    src={this.props.data.original}
                    alt="#"
                    style={tileImgStyle}
                />
            </div>
        );
    }
}

export default Tile;
