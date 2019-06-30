import React, { Component } from 'react'
import ContentHolder from '../../../components/utility/contentHolder';
import Select, { SelectOption } from '../../../components/uielements/select';
import { locations } from '../../../config';
import Button from '../../../components/uielements/button';
import { ButtonWrapper } from '../busqueda.style'
import { Icon } from 'antd'

const Option = SelectOption;
const locationOptions = [];

class Location extends Component {

    constructor(props) {
        super(props)
        locationOptions.length === 0 ?
            locations.forEach((element) => {
                locationOptions.push(<Option key={element}>{element}</Option>);
            })
            : this.dummy()

    }

    dummy = () => {

    }

    update = (e) => {
        this.props.handleChange(e, 'location');
    }

    render() {
        return (
            <div>
                <h3 className='text-center'>Búsqueda de salas en Salas OnLine</h3>
                <ContentHolder>
                    <label>Seleccioná la o las localidades en las que quieras buscar una sala de ensayo.</label>
                    <Select
                        mode="multiple"
                        style={{ "width": '100%', "height": "42px", "marginTop": "15px" }}
                        placeholder="Localidad"
                        // value={this.state.formdata.location}
                        onChange={this.update}
                    >
                        {locationOptions}
                    </Select>

                    <ButtonWrapper>
                        <div className="isoContainer">
                            <div className="isoControlBtnGroup">
                                <Button onClick={this.props.previousStep} style={{margin:"0 20px"}} >
                                    <Icon type="left" />
                                    Atrás
                                </Button>
                            </div>
                            <div className="isoControlBtnGroup">
                                <Button onClick={this.props.nextStep} style={{margin:"0 20px"}} >
                                    Siguiente
                                    <Icon type="right" />
                                </Button>
                            </div>
                        </div>
                    </ButtonWrapper>
                </ContentHolder>

            </div>
        );
    }
}

export default Location