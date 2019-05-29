import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateUser } from '../../redux/sousers/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
// import ContactList from '../../components/contacts/contactList';
// import SingleDatosView from '../../components/datos/singleView';
import EditDatosView from '../../components/datos/editView';
// import DeleteButton from '../../components/contacts/deleteButton';
// import IntlMessages from '../../components/utility/intlMessages';
import { DatosWrapper } from './datos.style';

const { Content } = Layout;

const otherAttributes = [
  { title: 'Teléfono', value: 'phone', type: 'phoneNumber' },
  { title: 'Notas', value: 'note', type: 'paragraph' }
];

class Datos extends Component {

  editDatos = () => {
    this.setState({ editView: !this.state.editView })
  }

  state = {
    editView: false
  }

  render() {
    // const user = this.props.user.users;
    return (
      <DatosWrapper
        className=""
        style={{ background: 'none' }}
      >
        <Layout className="isoContactBoxWrapper">
          <Content className="isoContactBox">
            <div className="isoContactControl">
              <Button type="button"
                onClick={this.editDatos}
              >
                {this.state.editView ? <Icon type="check" /> : <Icon type="edit" />}{' '}
              </Button>
            </div>
            <EditDatosView
              // user={selectedUser}
              editDatos={updateUser}
              otherAttributes={otherAttributes}
              viewMode={!this.state.editView}
            />
          </Content>
        </Layout>
      </DatosWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.User
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Datos)
