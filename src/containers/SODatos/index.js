import React, { Component } from 'react'
import { connect } from 'react-redux'

// import contactAction from '../../redux/contacts/actions';
import { Layout, Icon } from 'antd';
import Button from '../../components/uielements/button';
// import ContactList from '../../components/contacts/contactList';
import SingleContactView from '../../components/datos/singleView';
import EditDatosView from '../../components/datos/editView';
// import DeleteButton from '../../components/contacts/deleteButton';
// import IntlMessages from '../../components/utility/intlMessages';
import { DatosWrapper } from './datos.style';

const { Content } = Layout;
// const selectedContact = {
//   id: 22143,
//   avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/dvdwinden/128.jpg",
//   firstName: "Benjamin",
//   lastName: "Jacobi",
//   name: "Benjamin Jacobi",
//   mobile: "(023) 302-3161 x60451",
//   home: "(136) 403-0476 x8388",
//   company: "Casper Inc",
//   work: "(399) 506-9438",
//   note: "Quisquam et nisi. Dicta in ut eos consequatur ipsum omnis. Quisquam doloremque error praesentium sapiente et vitae. Omnis facere sint nulla similique vel voluptatem officia deleniti."

// }

const otherAttributes = [
  { title: 'Mobile', value: 'mobile', type: 'phoneNumber' },
  { title: 'Home', value: 'home', type: 'phoneNumber' },
  { title: 'Company', value: 'company', type: 'company' },
  { title: 'Work', value: 'work', type: 'phoneNumber' },
  { title: 'Notes', value: 'note', type: 'paragraph' }
];



class Datos extends Component {

  editDatos = () => {
    this.setState({editView:!this.state.editView})
  }

  state = {
    editView: false
  }

  render() {

    const user = this.props.user.users;

    const selectedContact = {
      id: 22143,
      avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/dvdwinden/128.jpg",
      firstName: user.name,
      lastName: user.lastname,
      name: `${user.name} ${user.lastname}`,
      mobile: "(023) 302-3161 x60451",
      home: "(136) 403-0476 x8388",
      company: "Casper Inc",
      work: "(399) 506-9438",
      note: "Quisquam et nisi. Dicta in ut eos consequatur ipsum omnis. Quisquam doloremque error praesentium sapiente et vitae. Omnis facere sint nulla similique vel voluptatem officia deleniti."
    
    }
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
            {this.state.editView ? (
              <EditDatosView
                contact={selectedContact}
                editContact={true}
                otherAttributes={otherAttributes}
              />
            ) : (
                <SingleContactView
                  contact={selectedContact}
                  otherAttributes={otherAttributes}
                />
              )}
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
