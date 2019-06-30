import React, { Component } from 'react'
// import Stats from './stats'
import StyledInput from '../../../components/uielements/input';
import ContentHolder from '../../../components/utility/contentHolder';
import Button from '../../../components/uielements/button';
import { ButtonWrapper } from '../busqueda.style'
import { Icon } from 'antd'

class Name extends Component {

    update = (e) => {
        this.props.handleInput(e, 'name');
    }

    render() {
        return (
            <div>
                <h3 className='text-center'>Búsqueda de salas en Salas OnLine</h3>
                <ContentHolder>
                    <label>Si buscás una sala en particular, podés ingresar el nombre y hacer click en "Buscar". Sino, dejá el campo en blanco y hacé click en "Siguiente" para buscar por ubicación y precio</label>
                    <StyledInput
                        placeholder='Nombre de la sala'
                        onChange={this.update}
                        size="large"
                        style={{ "width": '100%', "marginTop": "15px" }}
                    />
                    <ButtonWrapper>
                        <div className="isoContainer">
                            <div className="isoControlBtnGroup">
                                <Button icon="search" type="primary" onClick={this.props.submitForm} style={{margin:"0 20px"}} >
                                    Buscar
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

export default Name