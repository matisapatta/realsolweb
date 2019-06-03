import React, { Component } from 'react';
import { CardContentWrapper } from './cardContent.style'
import {
    Col,
    Row,
} from 'antd';


class CardContent extends Component {
    
    render() {
        return (
            <CardContentWrapper className="cardContentContainer">
                <Row>
                    <Col md={3} sm={3} xs={24} >
                        <img alt="#" src={this.props.image} />
                    </Col>
                    <Col md={21} sm={21} xs={24}>
                        <div className="cardContentText">
                            {this.props.text}
                        </div>
                    </Col>
                </Row>

            </CardContentWrapper>
        )
    }

}

export default CardContent;