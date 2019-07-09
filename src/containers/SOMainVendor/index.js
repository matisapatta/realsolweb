import React, { Component } from 'react';
import { connect } from 'react-redux'
import IsoWidgetsWrapper from './widgets-wrapper';
// import IsoWidgetBox from './widget-box';
import { Row, Col } from 'antd';
import SingleProgressWidget from '../../components/widgets/progress/progress-single';
import ReportsWidget from '../../components/widgets/report/report-widget';
import StickerWidget from '../../components/widgets/sticker/sticker-widget';
import SaleWidget from '../../components/widgets/sale/sale-widget';
import { getMoneyByUser, getMoneyByUser7, getMoneyBySala, getMoneyBySala7, getAmountRes7, getAmountRes } from '../../redux/soreports/actions'
import { getSalasOwner } from '../../redux/sosalas/actions';
import Spins from '../../components/uielements/spin';
import basicStyle from '../../config/basicStyle';

const { rowStyle, colStyle } = basicStyle;

const wisgetPageStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'flex-start',
    padding: '15px',
    overflow: 'hidden'
};

const titleStyle = {
    "fontSize": "25px",
    "textAlign": "center",
    "paddingTop": "20px",
}

class MainVendor extends Component {

    state = {
        loading: true,
    }


    constructor(props) {
        super(props)
        setTimeout(() => {
            props.dispatch(getSalasOwner(this.props.user.users.id))
        }, 200)
        setTimeout(() => {
            props.dispatch(getMoneyByUser(this.props.user.users.id))
        }, 400)
        setTimeout(() => {
            props.dispatch(getMoneyByUser7(this.props.user.users.id))
        }, 600)
        setTimeout(() => {
            props.dispatch(getMoneyBySala(this.props.user.users.id))
        }, 800)
        setTimeout(() => {
            props.dispatch(getMoneyBySala7(this.props.user.users.id))
        }, 1000)
        setTimeout(() => {
            props.dispatch(getAmountRes(this.props.user.users.id))
        }, 1200)
        setTimeout(() => {
            props.dispatch(getAmountRes7(this.props.user.users.id))
        }, 1400)
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1500)
    }

    showGeneralData = () => {
        const money = this.props.reports.userMoney.sort(function (a, b) {
            if (a.sala > b.sala) {
                return 1;
            }
            if (a.sala < b.sala) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        const money7 = this.props.reports.userMoney7.sort(function (a, b) {
            if (a.sala > b.sala) {
                return 1;
            }
            if (a.sala < b.sala) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });

        // console.log(money)
        // console.log(money7)
        let totalRes = 0;
        this.props.reports.amountRes.map((item, i) => {
            totalRes += item.total;
        });
        <Row style={rowStyle} gutter={0} justify="start" >
            <Col md={6} sm={12} xs={24} style={colStyle}>
                <IsoWidgetsWrapper>
                    {/* Sticker Widget */}
                    <StickerWidget
                        number={totalRes}
                        text="Reservas totales"
                        icon="ion-email-unread"
                        fontColor="#ffffff"
                        bgColor="#7266BA"
                    />
                </IsoWidgetsWrapper>
            </Col>
        </Row >
    }

    showOcupacionByDay = (data,seven) => (

        <Col md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
                <ReportsWidget
                    label={!seven?"Índice de reservas por día":"Índice de reservas de la última semana"}
                >
                    <SingleProgressWidget
                        label="Domingo"
                        percent={Math.floor(data.reserv.dom*100/data.total)}
                        barHeight={7}
                        status="active"
                        info={true} // Boolean: true, false
                    />
                    <SingleProgressWidget
                        label="Lunes"
                        percent={Math.floor(data.reserv.lun*100/data.total)}
                        barHeight={7}
                        status="active"
                        info={true} // Boolean: true, false
                    />
                    <SingleProgressWidget
                        label="Martes"
                        percent={Math.floor(data.reserv.mar*100/data.total)}
                        barHeight={7}
                        status="active"
                        info={true} // Boolean: true, false
                    />
                    <SingleProgressWidget
                        label="Miércoles"
                        percent={Math.floor(data.reserv.mier*100/data.total)}
                        barHeight={7}
                        status="active"
                        info={true} // Boolean: true, false
                    />
                    <SingleProgressWidget
                        label="Jueves"
                        percent={Math.floor(data.reserv.jue*100/data.total)}
                        barHeight={7}
                        status="active"
                        info={true} // Boolean: true, false
                    />
                    <SingleProgressWidget
                        label="Viernes"
                        percent={Math.floor(data.reserv.vie*100/data.total)}
                        barHeight={7}
                        status="active"
                        info={true} // Boolean: true, false
                    />
                    <SingleProgressWidget
                        label="Sábado"
                        percent={Math.floor(data.reserv.sab*100/data.total)}
                        barHeight={7}
                        status="active"
                        info={true} // Boolean: true, false
                    />
                </ReportsWidget>
            </IsoWidgetsWrapper>
        </Col>
    )

    showSalaRes = () => {
        if (this.props.reports.amountRes && this.props.reports.amountRes7) {
            const data = this.props.reports.amountRes.sort(function (a, b) {
                if (a.sala > b.sala) {
                    return 1;
                }
                if (a.sala < b.sala) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            const data7 = this.props.reports.amountRes7.sort(function (a, b) {
                if (a.sala > b.sala) {
                    return 1;
                }
                if (a.sala < b.sala) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            // console.log(data)
            // console.log(data7)
            // console.log(i)
            return (
                data.map((item, i) => (
                    <div style={wisgetPageStyle} key={i}>
                        <Row style={rowStyle} gutter={0} justify="center" >
                            <Col md={24} sm={24} xs={24} style={{ marginBottom: '16px', display: "flex", paddingLeft: "10px", fontSize: "20px" }}>
                                <h3>
                                    {item.sala}
                                </h3>
                            </Col>
                        </Row>
                        <Row style={rowStyle} gutter={0} justify="center" >
                            <Col md={12} sm={24} xs={24} style={colStyle}>
                                <IsoWidgetsWrapper>
                                    <StickerWidget
                                        number={item.total}
                                        text="Reservas totales"
                                        icon="ion-ios-paper"
                                        fontColor="#ffffff"
                                        bgColor="#7266BA"
                                    />
                                </IsoWidgetsWrapper>
                            </Col>
                            <Col md={12} sm={24} xs={24} style={colStyle}>
                                <IsoWidgetsWrapper>
                                    <StickerWidget
                                        number={data7[i].total}
                                        text="Reservas en la última semana"
                                        icon="ion-ios-paper"
                                        fontColor="#ffffff"
                                        bgColor="#42A5F6"
                                    />
                                </IsoWidgetsWrapper>
                            </Col>
                        </Row>
                        {this.showSalaMoney(i)}
                        <Row style={rowStyle} gutter={0} justify="start">
                            {this.showOcupacionByDay(item,false)}
                            {this.showOcupacionByDay(data7[i],true)}
                        </Row>
                    </div>
                ))
            )
        }
    }

    showSalaMoney = (i) => {
        if (this.props.reports.salaMoney && this.props.reports.salaMoney7) {
            const data = this.props.reports.salaMoney.sort(function (a, b) {
                if (a.sala > b.sala) {
                    return 1;
                }
                if (a.sala < b.sala) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            const data7 = this.props.reports.salaMoney7.sort(function (a, b) {
                if (a.sala > b.sala) {
                    return 1;
                }
                if (a.sala < b.sala) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
            // console.log(data)
            // console.log(data7)
            // console.log(i)
            return (
                <Row style={rowStyle} gutter={0} justify="center" >
                    <Col md={12} sm={24} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            <SaleWidget
                                label="Ingresos totales"
                                price={"$ " + data[i].money}
                                details="Se calculan los ingresos desde la registración en la plataforma"
                                fontColor="#F75D81"
                            />
                        </IsoWidgetsWrapper>
                    </Col>
                    <Col md={12} sm={24} xs={24} style={colStyle}>
                        <IsoWidgetsWrapper>
                            <SaleWidget
                                label="Ingresos última semana"
                                price={"$ " + data7[i].money}
                                details="Se calculan los ingresos de la última semana"
                                fontColor="#F75D81"
                            />
                        </IsoWidgetsWrapper>
                    </Col>
                </Row>
            )
        }
    }


    render() {
        // console.log(this.props)
        return (
            <Spins spinning={this.state.loading}>
                <div>
                    <div style={titleStyle}>
                        Reportes Generales
                    </div>
                    {this.showSalaRes()}
                </div>
            </Spins>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.User,
        salas: state.Salas,
        reservations: state.Reservations,
        reports: state.Reports
    }
}

export default connect(mapStateToProps)(MainVendor);