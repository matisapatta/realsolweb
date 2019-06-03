import React, { Component } from 'react';
import { SingleCardWrapper } from './roomslist.style';
import roomIcon from '../../image/roomicon.png'
import { Icon } from 'antd'


class ListItem extends Component {

    // constructor(props){
    //     super(props);
        
    // }

    render() {
        const listClass = `isoSingleCard card list`;
        return (
            <SingleCardWrapper id={this.props.id} className={listClass}>
                <div className="isoCardImage">
                    <img alt="#" src={roomIcon} />
                </div>
                <div className="isoCardContent">
                    <h3 className="isoCardTitle">{this.props.title}</h3>
                </div>
                <button className="isoDeleteBtn" 
                onClick={()=>{this.props.clickHandler(this.props.index)}}
                >
                    <Icon type="close" />
                </button>
            </SingleCardWrapper>
        );
    }
}

export default ListItem;