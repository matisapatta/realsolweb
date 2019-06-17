import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Layout,
  // Icon 
} from 'antd';
// import Button from '../../components/uielements/button';
import FormSala from '../../components/datossala/formSala';
import { DatosSalaWrapper } from './createsala.style';
// import Spins from '../../components/uielements/spin';



const { Content } = Layout;

const titleStyle = {
  "fontSize": "25px",
  "textAlign": "center",
  "paddingTop": "20px",
}

class CreateSala extends Component {

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
          Creación de sala
        </div>
        <DatosSalaWrapper
          className=""
          style={{ background: 'none' }}
        >
          <Layout className="isoContactBoxWrapper">
            <Content className="isoContactBox">
              <FormSala
                loading={this.state.loading}
                refresh={this.state.refresh}
                currentSala={null}
              />
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


export default connect(mapStateToProps)(CreateSala);