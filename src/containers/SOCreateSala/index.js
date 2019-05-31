import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
import FormSala from '../../components/datossala/formSala';
import { DatosSalaWrapper } from './createsala.style';

const { Content } = Layout;

class CreateSala extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
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
                  // user={selectedUser}
                //   editDatos={updateUser}
                //   viewMode={!this.state.editView}
                />
              </Content>
            </Layout>
          </DatosSalaWrapper>
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