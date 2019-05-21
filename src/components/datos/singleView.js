import React, { Component } from 'react';
import { DatosCardWrapper } from './datosCard.style';

export default class SingleDatosView extends Component {
  render() {
    const { user, otherAttributes } = this.props;
    const name = user.name ? user.name : 'No Name';
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
      const value = user[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="isoContactCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <p className="isoInfoDetails">
              {value}
            </p>
          </div>
        );
      }
    });
    return (
      <DatosCardWrapper className="isoContactCard">
        <div className="isoContactCardHead">
          <div className="isoPersonImage">
            {user.avatar ? <img alt="#" src={user.avatar} /> : ''}
          </div>
          <h1 className="isoPersonName">
            {name}
          </h1>
        </div>
        <div className="isoContactInfoWrapper">
          {extraInfos}
        </div>
      </DatosCardWrapper>
    );
  }
}
