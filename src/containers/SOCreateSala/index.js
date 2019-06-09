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

  // constructor(props) {
  //     super(props)
  // }

  state = {
    loading: false,
    refresh: false,
  }

  dummy = () => {

  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log("derived")
  //   console.log(state)
  //   if (props.salas.loading === false) {
  //     return {
  //       ...state,
  //       loading: props.loading,
  //       refresh: true,
  //     };
  //   }
  //   return null;
  // }



  render() {

    return (
      <div>
        {/* <Spins spinning={this.state.loading}> */}
        <div style={titleStyle}>
          Creación de sala
        </div>
        <DatosSalaWrapper
          className=""
          style={{ background: 'none' }}
        >
          <Layout className="isoContactBoxWrapper">
            <Content className="isoContactBox">
              {/* <div className="isoContactControl">
                  <Button type="button"
                    onClick={this.editDatos}
                  >
                    {this.state.editView ? <Icon type="check" /> : <Icon type="edit" />}{' '}
                  </Button>
                </div> */}
              <FormSala
                loading={this.state.loading}
                refresh={this.state.refresh}
              />
            </Content>
          </Layout>
        </DatosSalaWrapper>
        {/* </Spins> */}
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