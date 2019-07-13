import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSalaDetail } from '../../redux/sosalas/actions'
import { DatosSalaWrapper } from '../SOCreateSala/createsala.style';
import { Layout } from 'antd';
import FormEditSala from '../../components/datossala/editSala';


// import LocationSearchInput from '../../components/autocomplete'
// import axios from 'axios'
// import ScriptTag from 'react-script-tag';

/* <form action={axios.post('/api/pay')} method="POST" style={{height:"100px"}} >
<ScriptTag
    src="https://www.mercadopago.com.ar/integrations/v1/web-tokenize-checkout.js"
    data-public-key="TEST-508e8d24-efc9-4ba1-a139-b74a8f22e2b3"
    data-transaction-amount="100.00">
</ScriptTag>
</form> */

const { Content } = Layout;

const titleStyle = {
    "fontSize": "25px",
    "textAlign": "center",
    "paddingTop": "20px",
}

class EditSala extends Component {

    // constructor(props) {
    //     super(props)
    // }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.dispatch(getSalaDetail(id))
    }

    state = {
        loading: false,
        refresh: false,
    }

    dummy = () => {

    }


    render() {
        return (
            <div>
                <div style={titleStyle}>
                    Edición de sala
            </div>
                <DatosSalaWrapper
                    className=""
                    style={{ background: 'none' }}
                >
                    <Layout className="isoContactBoxWrapper">
                        <Content className="isoContactBox">
                            { this.props.salas.currentSala ? 
                            <FormEditSala
                            loading={true}
                            refresh={this.state.refresh}
                            type="edit"
                        /> : <div></div>
                            }

                        </Content>
                    </Layout>
                </DatosSalaWrapper>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        salas: state.Salas,
        user: state.User
    }
}


export default connect(mapStateToProps)(EditSala);