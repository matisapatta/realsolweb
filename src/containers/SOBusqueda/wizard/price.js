import React, { Component } from 'react'
import StyledInput from '../../../components/uielements/input';
import ContentHolder from '../../../components/utility/contentHolder';
import Button from '../../../components/uielements/button';
import { ButtonWrapper } from '../busqueda.style'
import { Icon } from 'antd'

class Price extends Component {

    submit = () => {
        alert('You did it! Yay!') // eslint-disable-line
    }

    update = (e) => {
        this.props.handleInput(e, e.target.name);
    }

    render() {
        return (
            <div>
                <h3 className='text-center'>Búsqueda de salas en Salas OnLine</h3>
                <ContentHolder>
                    <label>Podés elegir un rango de precios para limitar los resultados, o dejarlo en blanco. Hacé click en "Buscar" para ver los resultados</label>
                    <br/>
                    <StyledInput
                        placeholder="Precio desde"
                        name="pricefrom"
                        // value={this.state.formdata.pricefrom}
                        // onChange={(event) => this.handleInput(event, 'pricefrom')}
                        onChange={this.update}
                        onSubmit={this.submitForm}
                        type="number"
                        size="large"
                        style={{ "width": '45%', "height": "42px", "marginTop": "16px" }}
                        prefix={<span style={{ color: 'rgba(0,0,0,.25)' }}>$</span>}
                    />
                    <StyledInput
                        placeholder="Precio hasta"
                        name="priceto"
                        // value={this.state.formdata.priceto}
                        //   onChange={(event) => this.handleInput(event, 'priceto')}
                        onChange={this.update}
                        onSubmit={this.submitForm}
                        type="currency"
                        size="large"
                        style={{ "width": '45%', "height": "42px", "marginTop": "16px", "float": "right" }}
                        prefix={<span style={{ color: 'rgba(0,0,0,.25)' }}>$</span>}
                    />

                    <ButtonWrapper>
                        <div className="isoContainer">
                            <div className="isoControlBtnGroup">
                                <Button onClick={this.props.previousStep} style={{margin:"0 20px"}}>
                                    <Icon type="left" />
                                    Atrás
                                </Button>
                            </div>
                            <div className="isoControlBtnGroup">
                                <Button icon="search" type="primary" onClick={this.props.submitForm} style={{margin:"0 20px"}} >
                                    Buscar
                                </Button>
                            </div>
                        </div>
                    </ButtonWrapper>
                </ContentHolder>

            </div>
        );
    }
}

export default Price
