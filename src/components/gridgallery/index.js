import React, { Component } from 'react'
import Tile from './tile'

const style = {
    "padding": "15px",
    "display": "flex",
    "flexWrap": "wrap",
    "flexDirection": "row",
    "justifyContent": "left",
    "position": "relative",
}

class GridGallery extends Component {
    render() {
        // Create tile for each item in data array
        // Pass data to each tile and assign a key
        return (
            <div style={style}>
                {this.props.data.map((data,i) => {
                    return <Tile data={data} key={i} />
                })}
            </div>
        );
    }
}

export default GridGallery;